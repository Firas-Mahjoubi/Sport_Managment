import { Component, OnInit } from '@angular/core';
import { RecoveryPlanService } from '../../services/recovery-plan.service';
import { RecoveryPlan } from '../../models/recoveryplan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-recoveryplan',
  templateUrl: './list-recoveryplan.component.html',
  styleUrls: ['./list-recoveryplan.component.css']
})
export class ListRecoveryPlanComponent implements OnInit {

  recoveryPlans: RecoveryPlan[] = [];
  paginatedRecoveryPlans: RecoveryPlan[] = [];

  loading = false;

  // ✅ Pagination
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;

  constructor(
    private recoveryPlanService: RecoveryPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRecoveryPlans();
  }

  loadRecoveryPlans(): void {
    this.loading = true;
    this.recoveryPlanService.getAllRecoveryPlans().subscribe({
      next: (plans) => {
        this.recoveryPlans = plans;
        this.totalPages = Math.ceil(this.recoveryPlans.length / this.pageSize);
        this.changePage(1); // ✅ Charger la page 1 au départ
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des plans:', err);
        this.loading = false;
      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRecoveryPlans = this.recoveryPlans.slice(start, end);
  }

  visiblePagesNumbers(): number[] {
    const pages: number[] = [];

    const minPage = Math.max(2, this.currentPage - 2);
    const maxPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = minPage; i <= maxPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  editRecoveryPlan(plan: RecoveryPlan): void {
    const injuryId = plan.injury?.id;
    const planId = plan.id;
    this.router.navigate(['/edit-recoveryplan', injuryId, planId]);
  }

  showRecoveryPlan(plan: RecoveryPlan): void {
    const injuryId = plan.injury?.id;
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
            this.recoveryPlans = this.recoveryPlans.filter(p => p.id !== plan.id);
            this.totalPages = Math.ceil(this.recoveryPlans.length / this.pageSize);
            if (this.currentPage > this.totalPages) {
              this.currentPage = this.totalPages;
            }
            this.changePage(this.currentPage);
          },
          error: (err) => {
            console.error('Erreur lors de la suppression:', err);
          }
        });
      }
    }
  }

}
