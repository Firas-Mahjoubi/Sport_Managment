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
    TrainingSessionViewComponent

    InjuryAddComponent,
    InjuryEditComponent,
    InjuryListComponent,
    InjuryShowComponent,
    ListInjuryArchiveComponent,
    ListHealthrecordsComponent,
    AddHealthrecordComponent,
    EditHealthrecordComponent,
    ShowHealthrecordComponent,




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
