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

import { ExerciseDetailComponent } from './components/exercise-detail/exercise-detail.component';

import { HomeComponent } from './components/home/home.component';
import { TacticBoardComponent } from './tactics/tactic-board/tactic-board.component';


import {CalendarComponent} from "./AdvancedPlanning/calendar/calendar.component";
import {EventFormComponent} from "./AdvancedPlanning/calendar/event-form/event-form.component";
import {SessionFormComponent} from "./AdvancedPlanning/session-form/session-form.component";
import {EventDetailsComponent} from "./AdvancedPlanning/event-details/event-details.component";

import { HealthDashboardComponent } from './Health/health-dashboard/health-dashboard.component';
import {AskQuestionComponent} from "./matches/ask-question/ask-question.component";
import {MatchesStatsComponent} from "./matches/matches-stats/matches-stats.component";
import {StatsChartsComponent} from "./matches/stats-charts/stats-charts.component";


import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

//maram
import { ClubFormComponent } from './components/Clubhouse/club-form/club-form.component';
import { ClubListComponent } from './components/Clubhouse/club-list/club-list.component';
import { PlayerFormComponent }from  './components/Clubhouse/player-form/player-form.component';
import { TeamFormComponent }from  './components/Clubhouse/team-form/team-form.component';
import { TeamListComponent }from  './components/Clubhouse/team-list/team-list.component';
import { LeagueFormComponent }from  './components/Clubhouse/league-form/league-form.component';
import { LeagueListComponent }from  './components/Clubhouse/league-list/league-list.component';
import { PlayerListComponent }from  './components/Clubhouse/player-list/player-list.component';
import { PlayerDetailComponent }from  './components/Clubhouse/player-detail/player-detail.component';
import { ClubDetailComponent } from './components/Clubhouse/club-detail/club-detail.component';
import { PlayersByClubComponent } from './components/Clubhouse/players-by-club/players-by-club.component';
import { PublicClubsComponent } from './components/Clubhouse/public-clubs/public-clubs.component';
import { PublicClubPlayersComponent } from './components/Clubhouse/public-club-players/public-club-players.component';
import { PublicPlayerQrComponent } from './components/Clubhouse/public-player-qr/public-player-qr.component';
////////////



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




  /////media///
  { path: 'exercise-details/:id', component: ExerciseDetailComponent },

  { path: 'add-exercise', component: ExerciseFormComponent , canActivate: [roleGuard(['COACH'])]},
  { path: 'edit-exercise/:id', component: ExerciseFormComponent, canActivate: [roleGuard(['COACH'])] },
  { path: 'exercise-list', component: ExerciseListComponent , canActivate: [roleGuard(['COACH'])]},

    //---------------------Backoffice-training-Ground ------------------------//

    { path: 'add-exercise-back', component: BackofficeListExerciceComponent },
  //---------------------------------------------//

  { path: 'matches', component: MatchesHomeComponent, canActivate: [roleGuard(['PLAYER'])] },

  { path: 'gameweeks', component: GameweekSliderComponent },
  { path: 'admindash', component: AdminMatchComponent , canActivate: [roleGuard(['ADMIN'])]},
  {path:'ask-question',component:AskQuestionComponent},
  {path:'matchstat',component:MatchesStatsComponent},
  { path: 'league/:id/stats', component: StatsChartsComponent }, // <-- Add this route

  { path: 'match/:matchId', component: MatchDetailsComponent },



  {path :'DashboardSidebar',component:AdminSidebarComponent},


//maram
{ path: 'add-club', component: ClubFormComponent },
{ path: 'clubs', component: ClubListComponent },  // ✅ Route for clubs
{ path: 'edit-club/:id', component: ClubFormComponent }, // ✅ Route pour modifier
{ path: 'add-player', component: PlayerFormComponent },
{ path: 'edit-player/:id', component: PlayerFormComponent },
{ path: 'teams', component: TeamListComponent },
{ path: 'players', component: PlayerListComponent },
{ path: 'add-team', component: TeamFormComponent },
{ path: 'edit-team/:id', component: TeamFormComponent },
{ path: 'leagues', component: LeagueListComponent },
{ path: 'add-league', component: LeagueFormComponent },
{ path: 'players/:id', component: PlayerDetailComponent },
{ path: 'club-details/:id', component: ClubDetailComponent },
{ path: 'players-by-club/:id', component: PlayersByClubComponent },
{ path: 'clubs-public', component: PublicClubsComponent },
{ path: 'public-club-players/:id', component: PublicClubPlayersComponent },
{ path: 'public-player-qr/:id', component: PublicPlayerQrComponent },













  {path :'DashboardSidebar',component:AdminSidebarComponent},
  {path :'DashboardHeader',component:AdminHeaderComponent},
  { path: 'admin-goals/:matchId', component: AdminGoalComponent },
  { path: 'admin-cards/:matchId', component: AdminCardComponent },
  {path: 'matchesmain', component:MatchesmainComponent , canActivate: [roleGuard(['PLAYER'])]},
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

 // {path: 'home', component: HomeComponent},

{ path: 'add-recoveryplan', component: AddRecoveryplanComponent },
{ path: 'edit-recoveryplan/:injuryId/:planId', component: EditRecoveryplanComponent },
{
  path: 'show-recoveryplan/:injuryId/:planId',component: ShowRecoveryplanComponent},

{ path: 'list-recoveryplan/:playerId', component: ListRecoveryPlanComponent },

{ path: 'list-player', component: ListPlayerComponent },

{ path: 'health-dashboard', component: HealthDashboardComponent },
{path: '**', redirectTo: 'auth'},




];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
