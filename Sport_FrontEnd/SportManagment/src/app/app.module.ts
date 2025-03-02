import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ClubListComponent } from './components/club-list/club-list.component';
import { ClubFormComponent } from './components/club-form/club-form.component';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { LeagueListComponent } from './components/league-list/league-list.component';
import { LeagueFormComponent } from './components/league-form/league-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    ClubListComponent,
    ClubFormComponent,
    TeamListComponent,
    TeamFormComponent,
    PlayerListComponent,
    PlayerFormComponent,
    LeagueListComponent,
    LeagueFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
