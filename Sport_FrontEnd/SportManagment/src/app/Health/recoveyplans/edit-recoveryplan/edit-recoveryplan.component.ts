import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryPlanService } from '../../services/recovery-plan.service';
import { RecoveryPlan } from '../../models/recoveryplan';

@Component({
  selector: 'app-edit-recoveryplan',
  templateUrl: './edit-recoveryplan.component.html',
  styleUrls: ['./edit-recoveryplan.component.css']
})
export class EditRecoveryplanComponent implements OnInit {

  editForm!: FormGroup;
  planId!: number;
  injuryId!: number;
  progressValue: number = 0;
  dateError: boolean = false;
  planStatuses: string[] = ['En cours', 'Terminé', 'Annulé']; // Exemples de statuts
  planTypes: string[] = ['Rééducation', 'Renforcement', 'Reprise']; // Exemples de types

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recoveryPlanService: RecoveryPlanService
  ) {}

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('planId'));

    this.initForm();
    this.loadRecoveryPlan();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      injuryId: [{ value: '', disabled: true }, Validators.required], // Désactivé car non modifiable
      planDescription: ['', Validators.required],
      startDate: ['', Validators.required],
      estimatedEndDate: ['', Validators.required],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      sessionFrequency: [1, Validators.required],
      sessionDuration: [1, Validators.required],

      nextReviewDate: ['', Validators.required],
      adjustments: [''],

    });
  }

  loadRecoveryPlan(): void {
    this.recoveryPlanService.getRecoveryPlanById(this.planId).subscribe({
      next: (plan) => {
        this.editForm.patchValue({
          injuryId: plan.injury.id,
          planDescription: plan.planDescription,
          startDate: plan.startDate,
          estimatedEndDate: plan.estimatedEndDate,
          progress: plan.progress,
          sessionFrequency: plan.sessionFrequency,
          sessionDuration: plan.sessionDuration,
          planType: plan.planType,
          nextReviewDate: plan.nextReviewDate,
          adjustments: plan.adjustments,
          planStatus: plan.planStatus
        });
        this.progressValue = plan.progress; // Mettre à jour la barre de progression
      },
      error: (err) => console.error('Erreur lors de la récupération du plan', err)
    });
  }

  validateDates(): void {
    const startDate = this.editForm.get('startDate')?.value;
    const endDate = this.editForm.get('estimatedEndDate')?.value;
    this.dateError = endDate < startDate;
  }

  updateProgress(event: any): void {
    this.progressValue = event.target.value;
  }

  onSubmit(): void {
    if (this.editForm.invalid || this.dateError) {
      alert('Veuillez remplir correctement tous les champs');
      return;
    }

    const updatedPlan: RecoveryPlan = {
      ...this.editForm.value,
      id: this.planId,
      injury: { id: this.editForm.get('injuryId')?.value } // Garder le lien avec la blessure
    };

    this.recoveryPlanService.updateRecoveryPlan(this.planId, updatedPlan).subscribe({
      next: () => {
        alert('Plan mis à jour avec succès');
        this.router.navigate(['/list-recoveryplan/:playerId']);
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/list-recoveryplans']);
  }
}
