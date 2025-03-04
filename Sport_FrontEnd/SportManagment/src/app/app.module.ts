import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchesHomeComponent } from './matches/matches-home/matches-home.component';
import { GameweekSliderComponent } from './matches/gameweek-slider/gameweek-slider.component';
import { MatchDetailsComponent } from './matches/match-details/match-details.component';

//--------------------Training-groud -------------------------//
import { TrainingSessionComponent } from './components/training-session-Assign-exercice/training-session.component';
import { TrainingSessionExerciceComponent } from './components/training-session/training-session-exercice.component';
import { TrainingSessionFormComponent } from './components/training-session-form/training-session-form.component';
import { ExerciseFormComponent } from './components/exercise-form/exercise-form.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { TrainingSessionViewComponent } from './components/training-session-view/training-session-view.component';
//---------------------------------------------//
import { InjuryAddComponent } from './Health/injury-add/injury-add.component';
import { InjuryEditComponent } from './Health/injury-edit/injury-edit.component';
import { InjuryListComponent } from './Health/injury-list/injury-list.component';
import { InjuryShowComponent } from './Health/injury-show/injury-show.component';
import { ListInjuryArchiveComponent } from './Health/list-injury-archive/list-injury-archive.component';
import { ListHealthrecordsComponent } from './Health/healthrecord/list-healthrecords/list-healthrecords.component';
import { AddHealthrecordComponent } from './Health/healthrecord/add-healthrecord/add-healthrecord.component';
import { EditHealthrecordComponent } from './Health/healthrecord/edit-healthrecord/edit-healthrecord.component';
import { ShowHealthrecordComponent } from './Health/healthrecord/show-healthrecord/show-healthrecord.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminMatchComponent } from './matches/admin-match/admin-match.component';
import { AdminGoalComponent } from './matches/admin-goal/admin-goal.component';
import { AdminCardComponent } from './matches/admin-card/admin-card.component';
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
import { MatchesmainComponent } from './matches/matchesmain/matchesmain.component';

import { MatchesNavbarComponent } from './matches/matches-navbar/matches-navbar.component';
import { MatchesFooterComponent } from './matches/matches-footer/matches-footer.component';
import { AdminSubstitutionComponent } from './matches/admin-substitution/admin-substitution.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TacticListComponent } from './tactics/tactic-list/tactic-list.component';
import { TacticFormComponent } from './tactics/tactic-form/tactic-form.component';
import { TacticFolderComponent } from './tactics/tactic-folder/tactic-folder.component';
import { CreateTacticDialogComponent } from './tactics/create-tactic-dialog/create-tactic-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    DashboardComponent,
    AuthComponent,
    MatchesHomeComponent,
    GameweekSliderComponent,
    MatchDetailsComponent,
    AdminSidebarComponent,
    TrainingSessionComponent,
    TrainingSessionExerciceComponent,
    TrainingSessionFormComponent,
    ExerciseFormComponent,
    ExerciseListComponent,
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

    HeaderComponent,
    FooterComponent,
    HomeComponent,

    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminMatchComponent,
    AdminGoalComponent,
    AdminCardComponent,
    AddRecoveryplanComponent,
    EditRecoveryplanComponent,
 TacticListComponent,
    TacticFormComponent,
    TacticFolderComponent,
    CreateTacticDialogComponent,
    ShowRecoveryplanComponent,
    ListPlayerComponent,
    ListRecoveryPlanComponent,
    CalendarComponent,
    MatchesFooterComponent,
    AdminSubstitutionComponent,
    EventFormComponent,
    SessionFormComponent,
    EventDetailsComponent,

    MatchesmainComponent,
    MatchesNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    FontAwesomeModule,

    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
     CommonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule, // ✅ Required for mat-form-field
        MatSelectModule, // ✅ Required for mat-select
        MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
