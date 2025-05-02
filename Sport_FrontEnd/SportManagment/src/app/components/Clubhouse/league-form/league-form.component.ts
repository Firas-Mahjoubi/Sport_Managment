import { Component, OnInit } from '@angular/core';
import { LeagueService, League } from 'src/app/services/league.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.css']
})
export class LeagueFormComponent implements OnInit {
  league: League = { name: '', nation: '', logourl: '' }; // ✅ Ajout de logourl
  isEditMode = false;

  constructor(
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.leagueService.getById(+id).subscribe({
        next: (data) => {
          this.league = data;
        },
        error: (err) => {
          console.error("❌ Error retrieving league:", err);
        }
      });
    }
  }

  saveLeague(): void {
    if (!this.league.name || !this.league.nation) {
      alert("❌ Please fill in all required fields!");
      return;
    }

    if (this.isEditMode) {
      this.leagueService.update(this.league.id!, this.league).subscribe(() => {
        alert("✅ League successfully modified!");
        this.router.navigate(['/leagues']);
      });
    } else {
      this.leagueService.create(this.league).subscribe(() => {
        alert("✅ League added successfully!");
        this.router.navigate(['/leagues']);
      });
    }
  }
}
