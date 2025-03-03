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
import { SidebarComponent } from './matches/sidebar/sidebar.component';
import { TrainingSessionComponent } from './components/training-session/training-session.component';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { TrainingSessionExerciceComponent } from './components/training-session-exercice/training-session-exercice.component';
import { TrainingSessionFormComponent } from './components/training-session-form/training-session-form.component';
import { TrainingGroundNavbarComponent } from './components/training-ground-navbar/training-ground-navbar.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';

import { ExerciseLibraryComponent } from './components/exercise-library/exercise-library.component';
import { TrainingSessionViewComponent } from './components/training-session-view/training-session-view.component';

import { InjuryAddComponent } from './Health/injury-add/injury-add.component';
import { InjuryEditComponent } from './Health/injury-edit/injury-edit.component';
import { InjuryListComponent } from './Health/injury-list/injury-list.component';
import { InjuryShowComponent } from './Health/injury-show/injury-show.component';
import { ListInjuryArchiveComponent } from './Health/list-injury-archive/list-injury-archive.component';
import { ListHealthrecordsComponent } from './Health/healthrecord/list-healthrecords/list-healthrecords.component';
import { AddHealthrecordComponent } from './Health/healthrecord/add-healthrecord/add-healthrecord.component';
import { EditHealthrecordComponent } from './Health/healthrecord/edit-healthrecord/edit-healthrecord.component';
import { ShowHealthrecordComponent } from './Health/healthrecord/show-healthrecord/show-healthrecord.component';
import { AddRecoveryplanComponent } from './Health/recoveyplans/add-recoveryplan/add-recoveryplan.component';
import { EditRecoveryplanComponent } from './Health/recoveyplans/edit-recoveryplan/edit-recoveryplan.component';

import { ShowRecoveryplanComponent } from './Health/recoveyplans/show-recoveryplan/show-recoveryplan.component';
import { ListPlayerComponent } from './Health/recoveyplans/list-player/list-player.component';
import { ListRecoveryPlanComponent } from './Health/recoveyplans/list-recoveryplan/list-recoveryplan.component';


import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CalendarComponent } from './AdvancedPlanning/calendar/calendar.component';
import { EventFormComponent } from './AdvancedPlanning/calendar/event-form/event-form.component';
import { SessionFormComponent } from './AdvancedPlanning/session-form/session-form.component';
import { EventDetailsComponent } from './AdvancedPlanning/event-details/event-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




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
    SidebarComponent,
    TrainingSessionComponent,
    ExerciseComponent,
    TrainingSessionExerciceComponent,
    TrainingSessionFormComponent,
    TrainingGroundNavbarComponent,
    ExerciseFormComponent,
    ExerciseListComponent,
    ExerciseLibraryComponent,
    TrainingSessionViewComponent,

    InjuryAddComponent,
    InjuryEditComponent,
    InjuryListComponent,
    InjuryShowComponent,
    ListInjuryArchiveComponent,
    ListHealthrecordsComponent,
    AddHealthrecordComponent,
    EditHealthrecordComponent,
    ShowHealthrecordComponent,
    AddRecoveryplanComponent,
    EditRecoveryplanComponent,

    ShowRecoveryplanComponent,
    AddRecoveryplanComponent,
    ListPlayerComponent,
    ListRecoveryPlanComponent,
    CalendarComponent,
    EventFormComponent,
    SessionFormComponent,
    EventDetailsComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TacticModule,
    BrowserAnimationsModule,



    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
