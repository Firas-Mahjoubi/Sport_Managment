from flask import Flask, request, jsonify
import pandas as pd
import random
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

df = pd.read_csv('Premier_League.csv')


df['date'] = pd.to_datetime(df['date'], format='%dth %B %Y', errors='coerce')
df = df.dropna(subset=['date'])

df['home_team_attack'] = df['Goals Home'] / (df['home_possessions'] + 1e-6)
df['away_team_attack'] = df['Away Goals'] / (df['away_possessions'] + 1e-6)
df['home_team_defense'] = df['Away Goals'] / (df['home_possessions'] + 1e-6)
df['away_team_defense'] = df['Goals Home'] / (df['away_possessions'] + 1e-6)

def calculate_points(row, team_type):
    if team_type == 'home':
        if row['Goals Home'] > row['Away Goals']:
            return 3
        elif row['Goals Home'] == row['Away Goals']:
            return 1
        else:
            return 0
    else:
        if row['Away Goals'] > row['Goals Home']:
            return 3
        elif row['Away Goals'] == row['Goals Home']:
            return 1
        else:
            return 0

df['home_points'] = df.apply(lambda row: calculate_points(row, 'home'), axis=1)
df['away_points'] = df.apply(lambda row: calculate_points(row, 'away'), axis=1)

def calculate_weight(row):
    if row['date'].year >= 2023:
        return 1.0
    elif row['date'].year == 2022:
        return 0.8
    else:
        return 0.5

df['sample_weight'] = df.apply(calculate_weight, axis=1)

features = [
    'home_team_attack', 'away_team_attack', 
    'home_team_defense', 'away_team_defense',
    'home_possessions', 'away_possessions', 
    'home_points', 'away_points'
]
X = df[features]
y_home = df['Goals Home']
y_away = df['Away Goals']
weights = df['sample_weight']

X_train, X_test, y_home_train, y_home_test, weights_train, weights_test = train_test_split(
    X, y_home, weights, test_size=0.2, random_state=42
)
_, _, y_away_train, y_away_test = train_test_split(
    X, y_away, test_size=0.2, random_state=42
)

model_home = XGBRegressor(n_estimators=300, learning_rate=0.03, max_depth=5, random_state=42)
model_away = XGBRegressor(n_estimators=300, learning_rate=0.03, max_depth=5, random_state=42)

model_home.fit(X_train, y_home_train, sample_weight=weights_train)
model_away.fit(X_train, y_away_train, sample_weight=weights_train)

def predict_goals(home_team_name, away_team_name):
    home_recent = df[df['Home Team'] == home_team_name].sort_values('date', ascending=False).head(5)
    away_recent = df[df['Away Team'] == away_team_name].sort_values('date', ascending=False).head(5)
    
    h2h_matches = df[(
        (df['Home Team'] == home_team_name) & (df['Away Team'] == away_team_name)) |
        ((df['Home Team'] == away_team_name) & (df['Away Team'] == home_team_name))
    ].sort_values('date', ascending=False).head(5)

    if home_recent.empty or away_recent.empty:
        return None, None

    home_form_points = home_recent['home_points'].sum() / (len(home_recent) * 3)
    away_form_points = away_recent['away_points'].sum() / (len(away_recent) * 3)

    home_avg_goals = home_recent['Goals Home'].mean()
    home_avg_possession = home_recent['home_possessions'].mean()
    home_conceded = home_recent['Away Goals'].mean()

    away_avg_goals = away_recent['Away Goals'].mean()
    away_avg_possession = away_recent['away_possessions'].mean()
    away_conceded = away_recent['Goals Home'].mean()

    h2h_home_goals = h2h_matches[h2h_matches['Home Team'] == home_team_name]['Goals Home'].mean()
    h2h_away_goals = h2h_matches[h2h_matches['Away Team'] == away_team_name]['Away Goals'].mean()

    h2h_home_goals = h2h_home_goals if not pd.isna(h2h_home_goals) else home_avg_goals
    h2h_away_goals = h2h_away_goals if not pd.isna(h2h_away_goals) else away_avg_goals

    home_team_attack = (home_avg_goals * 0.7 + h2h_home_goals * 0.3) / (home_avg_possession + 1e-6)
    away_team_attack = (away_avg_goals * 0.7 + h2h_away_goals * 0.3) / (away_avg_possession + 1e-6)
    home_team_defense = (home_conceded) / (home_avg_possession + 1e-6)
    away_team_defense = (away_conceded) / (away_avg_possession + 1e-6)

    input_data = pd.DataFrame([{
        'home_team_attack': home_team_attack,
        'away_team_attack': away_team_attack,
        'home_team_defense': home_team_defense,
        'away_team_defense': away_team_defense,
        'home_possessions': home_avg_possession,
        'away_possessions': away_avg_possession,
        'home_points': home_form_points,
        'away_points': away_form_points
    }])

    home_pred = model_home.predict(input_data)[0]
    away_pred = model_away.predict(input_data)[0]

    noise_home = random.uniform(-0.1, 0.1)
    noise_away = random.uniform(-0.1, 0.1)

    home_pred = max(home_pred + noise_home, 0.1)
    away_pred = max(away_pred + noise_away, 0.1)

    return home_pred, away_pred

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    home_team = data.get("home_team")
    away_team = data.get("away_team")

    if not home_team or not away_team:
        return jsonify({"error": "Please provide both home_team and away_team"}), 400

    home_goals, away_goals = predict_goals(home_team, away_team)

    if home_goals is None or away_goals is None:
        return jsonify({"error": "Could not find data for the specified teams."}), 404

    return jsonify({
        "home_team": home_team,
        "away_team": away_team,
        "predicted_home_goals": round(home_goals, 2),
        "predicted_away_goals": round(away_goals, 2)
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
