# Football Club Management

## 📌 Project Overview
This project is a football club management application designed to organize training sessions, track players, and improve exercise management. The goal is to provide an efficient tool for coaches and clubs to optimize planning and performance tracking.

## 🚀 Key Features
- **Exercise Management**: Create, edit, and classify exercises (public or private).
- **Training Session Management**: Plan training sessions with exercises from the library.
- **Exercise Editing Tool**: Graphically create movement sequences and tactical drills.
- **Performance Tracking**: Manage injuries, recovery, and health alerts.
- **Tagging System**: Assign tags to exercises for better classification.

## 🏗 Technologies Used
- **Backend**: Spring Boot (Java), REST API
- **Frontend**: Angular (TypeScript)
- **Database**: MySQL
- **Tools & Libraries**:
  - Hibernate (ORM)
  - JWT for authentication
  - OpenAPI for API documentation

## 🔧 Installation & Setup
### Prerequisites
- Java 17+
- Node.js 16+
- Angular CLI
- MySQL

### Backend Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Firas-Mahjoubi/Sport_Managment.git
   cd Sport_Managment/backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/football_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Installation
1. Navigate to the Angular project folder:
   ```bash
   cd Sport_Managment/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   ng serve
   ```

## 📚 API Usage
The API provides multiple endpoints for managing training sessions and exercises. To access the Swagger documentation:
```
http://localhost:8088/swagger-ui/
```

📌 **Feel free to suggest improvements or contribute to the project!** ⚽

