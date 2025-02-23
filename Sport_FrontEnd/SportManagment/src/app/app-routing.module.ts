import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {MatchesHomeComponent} from "./matches/matches-home/matches-home.component";
import {GameweekSliderComponent} from "./matches/gameweek-slider/gameweek-slider.component";
import { TrainingSessionComponent } from './components/training-session/training-session.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import{TrainingSessionExerciceComponent} from './components/training-session-exercice/training-session-exercice.component';
import {TrainingSessionFormComponent} from './components/training-session-form/training-session-form.component';
import {ExerciseFormComponent} from './components/exercise-form/exercise-form.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'reset-password', component: AuthComponent }, // Ensure reset password is mapped
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route

  { path: 'training-sessions', component: TrainingSessionComponent },//Training routes
  { path: 'training-sessions-exercice', component: TrainingSessionExerciceComponent },
  { path: 'training-sessions/new', component: TrainingSessionFormComponent }, // ✅ Add New
  { path: 'training-sessions/edit/:id', component: TrainingSessionFormComponent }, // ✅ Edit

  { path: 'exercises', component: ExerciseComponent },//exervise routes
  { path: 'add-exercise', component: ExerciseFormComponent },
  { path: 'edit-exercise/:id', component: ExerciseFormComponent },

  { path: 'matches', component: MatchesHomeComponent },
  { path: 'gameweeks', component: GameweekSliderComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule {}
