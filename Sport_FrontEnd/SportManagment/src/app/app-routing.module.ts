import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {MatchesHomeComponent} from "./matches/matches-home/matches-home.component";
import {GameweekSliderComponent} from "./matches/gameweek-slider/gameweek-slider.component";
import { authGuard, roleGuard } from './auth.guard';
import { TrainingSessionComponent } from './components/training-session/training-session.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import{TrainingSessionExerciceComponent} from './components/training-session-exercice/training-session-exercice.component';
import {TrainingSessionFormComponent} from './components/training-session-form/training-session-form.component';
import {ExerciseFormComponent} from './components/exercise-form/exercise-form.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'reset-password', component: AuthComponent }, // Ensure reset password is mapped
  {path: 'dashboard', component:DashboardComponent, canActivate: [roleGuard(['ADMIN'])]}, // Protect dashboard route
  {path: 'main', component:LandingPageComponent},
  { path: 'training-sessions', component: TrainingSessionComponent },//Training routes
  { path: 'training-sessions-exercice', component: TrainingSessionExerciceComponent },
  { path: 'training-sessions/new', component: TrainingSessionFormComponent }, // ✅ Add New
  { path: 'training-sessions/edit/:id', component: TrainingSessionFormComponent }, // ✅ Edit
  { path: 'exercises', component: ExerciseComponent },//exervise routes
  { path: 'add-exercise', component: ExerciseFormComponent },
  { path: 'edit-exercise/:id', component: ExerciseFormComponent },
  { path: 'matches', component: MatchesHomeComponent },
  { path: 'gameweeks', component: GameweekSliderComponent },
  { path: 'tactics', loadChildren: () => import('./tactics/tactics.module').then(m => m.TacticModule) },  // Lazy loading tactics module
  { path: '**', redirectTo: 'auth' } // Redirect unknown routes to login
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
