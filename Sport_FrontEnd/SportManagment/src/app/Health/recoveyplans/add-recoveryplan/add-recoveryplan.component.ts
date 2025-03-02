import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryPlanService } from '../../services/recovery-plan.service';
import { RecoveryPlan, PlanType, PlanStatus } from '../../models/recoveryplan';
import { Injury } from '../../models/injury';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recoveryplan',
  templateUrl: './add-recoveryplan.component.html',
  styleUrls: ['./add-recoveryplan.component.css']
})
export class AddRecoveryplanComponent implements OnInit {

  playerId!: number;
  injuries: Injury[] = [];
  recoveryPlanForm!: FormGroup;

  planTypes = Object.values(PlanType);
  planStatuses = Object.values(PlanStatus);

  constructor(
    private fb: FormBuilder,
    private recoveryPlanService: RecoveryPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayerIdFromLocalStorage();

    this.recoveryPlanForm = this.fb.group({
      injuryId: [null, Validators.required],
      planDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      estimatedEndDate: ['', Validators.required],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      sessionFrequency: [1, [Validators.required, Validators.min(1)]],
      sessionDuration: [30, [Validators.required, Validators.min(1)]],
      planType: ['', Validators.required],
      nextReviewDate: ['', Validators.required],
      adjustments: [''],
      planStatus: ['', Validators.required]
    });

    this.loadInjuries();
  }

  getPlayerIdFromLocalStorage(): void {
    const storedPlayerId = localStorage.getItem('selectedPlayerId');
    if (storedPlayerId) {
      this.playerId = Number(storedPlayerId);
    } else {
      console.error('Aucun joueur sélectionné. Redirection...');
      this.router.navigate(['/list-player']); // Rediriger si aucun joueur n'est sélectionné
    }
  }

  loadInjuries(): void {
    this.recoveryPlanService.getInjuriesByPlayerId(this.playerId).subscribe({
      next: (data) => this.injuries = data,
      error: (err) => console.error('Erreur lors de la récupération des blessures', err)
    });
  }

  submit(): void {
    if (this.recoveryPlanForm.invalid) {
      return;
    }

    const injuryId = this.recoveryPlanForm.value.injuryId;

    const newPlan: RecoveryPlan = {
      ...this.recoveryPlanForm.value,
      id: 0,
      actualEndDate: null
    };

    this.recoveryPlanService.createRecoveryPlan(injuryId, newPlan).subscribe({
      next: () => {
        alert('Plan de récupération ajouté avec succès!');
        this.router.navigate(['/list-player']); // Retour à la liste des joueurs
      },
      error: (err) => console.error('Erreur lors de la création', err)
    });
  }
}
