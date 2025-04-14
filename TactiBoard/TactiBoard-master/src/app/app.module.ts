import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { LocalComponent } from './local/local.component';
import { ChessComponent } from './chess/chess.component';
import { OnlineComponent } from './online/online.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ChessWhiteComponent } from './chess-white/chess-white.component';
import { ChessBlackComponent } from './chess-black/chess-black.component';

const appRoutes: Routes = [
  { path: 'local', component: LocalComponent },
  { path: 'online', component: OnlineComponent },
  { path: 'chess', component: ChessComponent },
  { path: 'chessWhite', component: ChessWhiteComponent },
  { path: 'chessBlack', component: ChessBlackComponent },
  { path: '', component: ChessComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    LocalComponent,
    ChessComponent,
    OnlineComponent,
    ChessWhiteComponent,
    ChessBlackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
