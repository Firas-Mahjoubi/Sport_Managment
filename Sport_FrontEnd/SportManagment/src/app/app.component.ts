import { Component } from '@angular/core';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { TrainingGroundNavbarComponent } from "./components/training-ground-navbar/training-ground-navbar.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'SportManagment';
}
