import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListComponent } from './components/club-list/club-list.component';
import { ClubFormComponent } from './components/club-form/club-form.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { LeagueListComponent } from './components/league-list/league-list.component';
import { LeagueFormComponent } from './components/league-form/league-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dash', component: DashboardComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'add-team', component: TeamFormComponent },
  { path: 'edit-team/:id', component: TeamFormComponent },
  { path: 'leagues', component: LeagueListComponent },
  { path: 'add-league', component: LeagueFormComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'add-player', component: PlayerFormComponent },
  { path: 'clubs', component: ClubListComponent },  // ✅ Route for clubs
  { path: 'add-club', component: ClubFormComponent },  // ✅ Route for adding a club
  { path: 'edit-club/:id', component: ClubFormComponent }, // ✅ Route pour modifier
  { path: '', redirectTo: '/clubs', pathMatch: 'full' }  // ✅ Redirect default path to /clubs
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
