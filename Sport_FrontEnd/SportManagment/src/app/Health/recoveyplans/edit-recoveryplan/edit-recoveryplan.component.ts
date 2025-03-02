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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recoveryPlanService: RecoveryPlanService
  ) {}

  ngOnInit(): void {
    this.injuryId = Number(this.route.snapshot.paramMap.get('injuryId'));
    this.planId = Number(this.route.snapshot.paramMap.get('planId'));

    this.initForm();
    this.loadRecoveryPlan();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      progress: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  loadRecoveryPlan(): void {
    this.recoveryPlanService.getRecoveryPlanById(this.planId).subscribe({
      next: (plan) => this.editForm.patchValue(plan),
      error: (err) => console.error('Erreur lors de la récupération du plan', err)
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      alert('Veuillez remplir correctement tous les champs');
      return;
    }

    const updatedPlan: RecoveryPlan = {
      ...this.editForm.value,
      id: this.planId,
      injury: { id: this.injuryId } // On garde le lien avec la blessure
    };

    this.recoveryPlanService.updateRecoveryPlan(this.planId, updatedPlan).subscribe({
      next: () => {
        alert('Plan mis à jour avec succès');
        this.router.navigate(['/list-recoveryplans']);
      },
      error: (err) => console.error('Erreur lors de la mise à jour', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/list-recoveryplans']);
  }
}
