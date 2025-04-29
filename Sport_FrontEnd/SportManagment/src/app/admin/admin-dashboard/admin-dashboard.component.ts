import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/dashboard.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  userData: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getUserDashboardData().subscribe(
      (data) => {
        this.userData = data;  // Set the fetched user data
        this.loading = false;  // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching user data', error);
        this.errorMessage = 'There was an error fetching the user data.';
        this.loading = false;
      }
    );
  }
}