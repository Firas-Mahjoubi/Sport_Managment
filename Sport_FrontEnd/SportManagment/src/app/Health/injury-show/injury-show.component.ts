import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InjuryService } from '../services/injury.service';
import { Injury } from '../models/injury';

@Component({
  selector: 'app-injury-show',
  templateUrl: './injury-show.component.html',
  styleUrls: ['./injury-show.component.css']
})
export class InjuryShowComponent implements OnInit {
  injury!: Injury; // Blessure sélectionnée
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private injuryService: InjuryService) {}

  ngOnInit(): void {
    this.loadInjury();
  }

  /**
   * Charge les détails de la blessure
   */
  loadInjury(): void {
    const injuryId = this.route.snapshot.paramMap.get('id');
    if (injuryId) {
      this.injuryService.getInjuryById(+injuryId).subscribe({
        next: (data) => {
          this.injury = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = "❌ Erreur lors du chargement de la blessure.";
          this.loading = false;
          console.error(error);
        }
      });
    }
  }
}
