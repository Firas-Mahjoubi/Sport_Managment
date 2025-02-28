import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {MatchesHomeComponent} from "./matches/matches-home/matches-home.component";
import {GameweekSliderComponent} from "./matches/gameweek-slider/gameweek-slider.component";
import {MatchDetailsComponent} from "./matches/match-details/match-details.component";
import {DashboardComponent} from "./admin/dashboard/dashboard.component";
import {SidebarComponent} from "./matches/sidebar/sidebar.component";

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'reset-password', component: AuthComponent }, // Ensure reset password is mapped
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Default route
  { path: 'matches', component: MatchesHomeComponent },
  { path: 'gameweeks', component: GameweekSliderComponent },
  { path: 'match/:matchId', component: MatchDetailsComponent },
  { path: 'Dashboard', component: DashboardComponent },
  {path :'DashboardSidebar',component:SidebarComponent}



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
