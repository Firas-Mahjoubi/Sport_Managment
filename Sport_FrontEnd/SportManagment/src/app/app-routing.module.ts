import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'reset-password', component: AuthComponent }, // Ensure reset password is mapped
  {path: 'dashboard', component:DashboardComponent},
  {path: 'main', component:LandingPageComponent},
  { path: 'tactics', loadChildren: () => import('./tactics/tactics.module').then(m => m.TacticModule) },  // Lazy loading tactics module
  { path: '**', redirectTo: 'auth' } // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
