import { Component, OnInit } from '@angular/core';
import { RecoveryPlanService } from '../../services/recovery-plan.service';
import { RecoveryPlan } from '../../models/recoveryplan';
import { Router } from '@angular/router';  // ✅ Il manquait cette ligne

@Component({
  selector: 'app-list-recoveryplan',
  templateUrl: './list-recoveryplan.component.html',
  styleUrls: ['./list-recoveryplan.component.css']
})
export class ListRecoveryPlanComponent implements OnInit {

  recoveryPlans: RecoveryPlan[] = [];
  loading = false;

  constructor(private recoveryPlanService: RecoveryPlanService,
    private router: Router  // ✅ Il manquait l'injection ici
  ) {}

  ngOnInit(): void {
    this.loadRecoveryPlans();
  }

  loadRecoveryPlans(): void {
    this.loading = true;
    this.recoveryPlanService.getAllRecoveryPlans().subscribe({
      next: (plans) => {
        this.recoveryPlans = plans;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plans:', err);
        this.loading = false;
      }
    });
  }


  editRecoveryPlan(plan: RecoveryPlan): void {
    const injuryId = plan.injury?.id;
    const planId = plan.id;
    this.router.navigate(['/edit-recoveryplan', injuryId, planId]);
  }


  showRecoveryPlan(plan: RecoveryPlan): void {
    const injuryId = plan.injury?.id;  // ou `plan.injuryId` si c'est stocké comme ça
    this.router.navigate(['/show-recoveryplan', injuryId, plan.id]);
  }



  deletePlan(plan: RecoveryPlan): void {
    const player = plan.injury?.player;
    if (player) {
      const confirmation = confirm(
        `⚠️ Confirmer suppression du plan pour ${player.firstName} ${player.lastName} ?`
      );
      if (confirmation && plan.id && plan.injury.id) {
        this.recoveryPlanService.deleteRecoveryPlan(plan.injury.id, plan.id).subscribe({
          next: () => {
            this.loadRecoveryPlans();
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
          }
        });
      }
    }
  }
}
