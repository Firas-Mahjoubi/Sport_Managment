import { Component, OnInit } from '@angular/core';

declare var $: any; // Enables jQuery usage

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    $('.carousel').carousel(); // Example for initializing carousels
  }
}
