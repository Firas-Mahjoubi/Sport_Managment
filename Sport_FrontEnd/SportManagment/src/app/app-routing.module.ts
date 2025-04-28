import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {MatchesHomeComponent} from "./matches/matches-home/matches-home.component";
import {GameweekSliderComponent} from "./matches/gameweek-slider/gameweek-slider.component";
import { authGuard, roleGuard } from './auth.guard';
import {MatchDetailsComponent} from "./matches/match-details/match-details.component";

//--------------------Training-groud -------------------------//

import { TrainingSessionComponent } from './components/training-session-Assign-exercice/training-session.component';
import{TrainingSessionExerciceComponent} from './components/training-session/training-session-exercice.component';
import { TrainingSessionViewComponent } from './components/training-session-view/training-session-view.component';


import {ExerciseFormComponent} from './components/exercise-form/exercise-form.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
//---------------------------------------------//
import { InjuryListComponent } from './Health/injury-list/injury-list.component';
import { InjuryAddComponent } from './Health/injury-add/injury-add.component';
import { InjuryEditComponent } from './Health/injury-edit/injury-edit.component';
import { InjuryShowComponent } from './Health/injury-show/injury-show.component';
import { ListHealthrecordsComponent } from './Health/healthrecord/list-healthrecords/list-healthrecords.component';
import { AddHealthrecordComponent } from './Health/healthrecord/add-healthrecord/add-healthrecord.component';
import { EditHealthrecordComponent } from './Health/healthrecord/edit-healthrecord/edit-healthrecord.component';

import { ListInjuryArchiveComponent } from './Health/list-injury-archive/list-injury-archive.component';
import { ShowHealthrecordComponent } from './Health/healthrecord/show-healthrecord/show-healthrecord.component';


import {AdminSidebarComponent} from "./admin/admin-sidebar/admin-sidebar.component";
import {AdminHeaderComponent} from "./admin/admin-header/admin-header.component";
import {AdminMatchComponent} from "./matches/admin-match/admin-match.component";
import {AdminGoalComponent} from "./matches/admin-goal/admin-goal.component";
import {AdminCardComponent} from "./matches/admin-card/admin-card.component";

import { AddRecoveryplanComponent } from './Health/recoveyplans/add-recoveryplan/add-recoveryplan.component';

import { ListPlayerComponent } from './Health/recoveyplans/list-player/list-player.component';
import { ListRecoveryPlanComponent } from './Health/recoveyplans/list-recoveryplan/list-recoveryplan.component';
import { EditRecoveryplanComponent } from './Health/recoveyplans/edit-recoveryplan/edit-recoveryplan.component';
import { ShowRecoveryplanComponent } from './Health/recoveyplans/show-recoveryplan/show-recoveryplan.component';

import{BackofficeListExerciceComponent} from './components/backoffice-list-exercice/backoffice-list-exercice.component';
import { TrainingSessionFormComponent } from './components/training-session-form/training-session-form.component';

import {MatchesmainComponent} from "./matches/matchesmain/matchesmain.component";
import {MatchesNavbarComponent} from "./matches/matches-navbar/matches-navbar.component";
import {MatchesFooterComponent} from "./matches/matches-footer/matches-footer.component";
import {AdminSubstitutionComponent} from "./matches/admin-substitution/admin-substitution.component";
import { TacticListComponent } from './tactics/tactic-list/tactic-list.component';
import { TacticFormComponent } from './tactics/tactic-form/tactic-form.component';
import { TacticFolderComponent } from './tactics/tactic-folder/tactic-folder.component';
import { HomeComponent } from './components/home/home.component';
import { TacticBoardComponent } from './tactics/tactic-board/tactic-board.component';


import {CalendarComponent} from "./AdvancedPlanning/calendar/calendar.component";
import {EventFormComponent} from "./AdvancedPlanning/calendar/event-form/event-form.component";
import {SessionFormComponent} from "./AdvancedPlanning/session-form/session-form.component";
import {EventDetailsComponent} from "./AdvancedPlanning/event-details/event-details.component";

import { HealthDashboardComponent } from './Health/health-dashboard/health-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


  


const routes: Routes = [
  { path: 'user', component: AdminDashboardComponent }, // Protect dashboard route


  { path: 'auth', component: AuthComponent },
  {path:'calendar',component:CalendarComponent},
  { path: 'reset-password', component: AuthComponent }, // Ensure reset password is mapped
  {path: 'dashboard', component:DashboardComponent, canActivate: [roleGuard(['ADMIN'])]}, // Protect dashboard route
  {path: 'main', component:LandingPageComponent},
  //--------------------Training-groud -------------------------//
  { path: 'training-sessions-exercice/:id', component: TrainingSessionComponent , canActivate: [roleGuard(['COACH'])]},
  { path: 'training-sessions', component: TrainingSessionExerciceComponent , canActivate: [roleGuard(['COACH'])]},

  { path: 'training-session-add', component: TrainingSessionFormComponent , canActivate: [roleGuard(['COACH'])]}, 

  { path: 'training-sessions/new', component: TrainingSessionFormComponent , canActivate: [roleGuard(['COACH'])]},
  { path: 'training-sessions/edit/:id', component: TrainingSessionFormComponent, canActivate: [roleGuard(['COACH'])] },

  { path: 'training-session/:id', component: TrainingSessionViewComponent, canActivate: [roleGuard(['COACH'])] },


  { path: 'add-exercise', component: ExerciseFormComponent , canActivate: [roleGuard(['COACH'])]},
  { path: 'edit-exercise/:id', component: ExerciseFormComponent, canActivate: [roleGuard(['COACH'])] },
  { path: 'exercise-list', component: ExerciseListComponent , canActivate: [roleGuard(['COACH'])]},
    //---------------------Backoffice-training-Ground ------------------------//

    { path: 'add-exercise-back', component: BackofficeListExerciceComponent },
  //---------------------------------------------//

  { path: 'matches', component: MatchesHomeComponent },

  { path: 'gameweeks', component: GameweekSliderComponent },
  { path: 'adminMatch', component: AdminMatchComponent },


  { path: 'match/:matchId', component: MatchDetailsComponent },


  {path :'DashboardSidebar',component:AdminSidebarComponent},










  {path :'DashboardSidebar',component:AdminSidebarComponent},
  {path :'DashboardHeader',component:AdminHeaderComponent},
  { path: 'admin-goals/:matchId', component: AdminGoalComponent },
  { path: 'admin-cards/:matchId', component: AdminCardComponent },
  {path: 'matchesmain', component:MatchesmainComponent},
  {path: 'matchesNavbar', component:MatchesNavbarComponent},
  {path: 'matchesFooter', component:MatchesFooterComponent},
  { path: 'admin-substitutions/:matchId', component: AdminSubstitutionComponent }, // 🆕 Route with matchId









  {path :'DashboardSidebar',component:AdminSidebarComponent},







  { path: 'tactic-board', component: TacticBoardComponent },
  { path: 'tactics', component: TacticListComponent, canActivate: [roleGuard(['COACH'])] }, 
  { path: 'tactics/create', component: TacticFormComponent, canActivate: [roleGuard(['COACH'])]  },
  { path: 'tactics/:id', component: TacticFolderComponent, canActivate: [roleGuard(['COACH'])]  },
  { path: 'tactics/edit/:id', component: TacticFormComponent , canActivate: [roleGuard(['COACH'])] }, 


//skander turkiiiiii injury
{ path: 'health/injury', component: InjuryListComponent },
{ path: 'health/injury/add', component: InjuryAddComponent },
{ path: 'health/injury/edit/:id', component: InjuryEditComponent },
{ path: 'health/injury/show/:id', component: InjuryShowComponent },

{ path: 'health/injury/archived', component: ListInjuryArchiveComponent },

//skander turkiiiiii health record

{ path: 'health/health-records', component: ListHealthrecordsComponent }, //
{ path: 'health/health-records/add', component: AddHealthrecordComponent }, //
{ path: 'health/health-records/edit/:id', component: EditHealthrecordComponent },
{ path: 'health/health-records/show/:id', component: ShowHealthrecordComponent },



//skander turkiiiiii recoveryplan
{path: 'home', component: HomeComponent},

{ path: 'add-recoveryplan', component: AddRecoveryplanComponent },
{ path: 'edit-recoveryplan/:injuryId/:planId', component: EditRecoveryplanComponent },
{
  path: 'show-recoveryplan/:injuryId/:planId',component: ShowRecoveryplanComponent},

{ path: 'list-recoveryplan/:playerId', component: ListRecoveryPlanComponent },

{ path: 'list-player', component: ListPlayerComponent },
{path: '**', redirectTo: 'home'}, 

{ path: 'health-dashboard', component: HealthDashboardComponent },



{ path: '**', redirectTo: 'auth' }, // Redirect unknown routes to login

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
