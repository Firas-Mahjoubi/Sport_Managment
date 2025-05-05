import { Component, OnInit } from '@angular/core';
import { ClubService, Club } from 'src/app/services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  clubs: Club[] = [];
  userRole: string = '';
  userId: number = 0;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || '';
    this.userId = Number(localStorage.getItem('userId'));

    console.log("✅ Chargement Clubs - Role:", this.userRole, "ID:", this.userId);

    if (this.userRole === 'COACH') {
      this.getClubForCoach(this.userId);
    } else {
      this.getAllClubs();
    }
  }

  getAllClubs(): void {
    this.clubService.getAll().subscribe(data => {
      this.clubs = data.map(club => ({
        ...club,
        imageUrl: `http://localhost:8088/clubs/image/${club.id}`,
        foundationYear: club.foundationYear || 'Not specified'
      }));
    });
  }

  getClubForCoach(userId: number): void {
    this.clubService.getClubsByCoach(userId).subscribe(data => {
      this.clubs = data.map(club => ({
        ...club,
        imageUrl: `http://localhost:8088/clubs/image/${club.id}`,
        foundationYear: club.foundationYear || 'Not specified'
      }));
    });
  }

  editClub(club: Club): void {
    this.router.navigate(['/edit-club', club.id]);
  }

  deleteClub(id?: number): void {
    if (id !== undefined && confirm("Are you sure you want to delete this club?")) {
      this.clubService.delete(id).subscribe(() => {
        this.clubs = this.clubs.filter(c => c.id !== id);
      });
    }
  }

  viewClubDetails(id: number): void {
    this.router.navigate(['/club-details', id]);
  }
}
