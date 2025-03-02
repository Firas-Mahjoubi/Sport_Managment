import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TacticModule } from './tactics/tactics.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchesHomeComponent } from './matches/matches-home/matches-home.component';
import { GameweekSliderComponent } from './matches/gameweek-slider/gameweek-slider.component';
import { NavbarComponent } from './matches/navbar/navbar.component';
import { MatchDetailsComponent } from './matches/match-details/match-details.component';
import { TrainingSessionComponent } from './components/training-session/training-session.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { TrainingSessionExerciceComponent } from './components/training-session-exercice/training-session-exercice.component';
import { TrainingSessionFormComponent } from './components/training-session-form/training-session-form.component';
import { TrainingGroundNavbarComponent } from './components/training-ground-navbar/training-ground-navbar.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { InjuryAddComponent } from './Health/injury-add/injury-add.component';
import { InjuryEditComponent } from './Health/injury-edit/injury-edit.component';
import { InjuryListComponent } from './Health/injury-list/injury-list.component';
import { InjuryShowComponent } from './Health/injury-show/injury-show.component';
import { ListInjuryArchiveComponent } from './Health/list-injury-archive/list-injury-archive.component';
import { ListHealthrecordsComponent } from './Health/healthrecord/list-healthrecords/list-healthrecords.component';
import { AddHealthrecordComponent } from './Health/healthrecord/add-healthrecord/add-healthrecord.component';
import { EditHealthrecordComponent } from './Health/healthrecord/edit-healthrecord/edit-healthrecord.component';
import { ShowHealthrecordComponent } from './Health/healthrecord/show-healthrecord/show-healthrecord.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminMatchComponent } from './matches/admin-match/admin-match.component';
import { AdminGoalComponent } from './matches/admin-goal/admin-goal.component';
import { AdminCardComponent } from './matches/admin-card/admin-card.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    AuthComponent,
    MatchesHomeComponent,
    GameweekSliderComponent,
    NavbarComponent,
    MatchDetailsComponent,
    AdminSidebarComponent,
    TrainingSessionComponent,
    ExerciseComponent,
    TrainingSessionExerciceComponent,
    TrainingSessionFormComponent,
    TrainingGroundNavbarComponent,
    ExerciseFormComponent,
    ExerciseListComponent,
    InjuryAddComponent,
    InjuryEditComponent,
    InjuryListComponent,
    InjuryShowComponent,
    ListInjuryArchiveComponent,
    ListHealthrecordsComponent,
    AddHealthrecordComponent,
    EditHealthrecordComponent,
    ShowHealthrecordComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminMatchComponent,
    AdminGoalComponent,
    AdminCardComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TacticModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
