import { Component } from '@angular/core';
import { LandingPageComponent } from "./landing-page/landing-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LandingPageComponent]
})
export class AppComponent {
  title = 'SportManagment';
}
