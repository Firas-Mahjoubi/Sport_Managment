import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecoveryPlanService } from '../../services/recovery-plan.service';
import { RecoveryPlan } from '../../models/recoveryplan';

@Component({
  selector: 'app-show-recoveryplan',
  templateUrl: './show-recoveryplan.component.html',
  styleUrls: ['./show-recoveryplan.component.css']
})
export class ShowRecoveryplanComponent implements OnInit {

  recoveryPlan: RecoveryPlan | undefined;

  constructor(
    private route: ActivatedRoute,
    private recoveryPlanService: RecoveryPlanService
  ) {}

  ngOnInit(): void {
    const planId = Number(this.route.snapshot.paramMap.get('planId'));
    if (planId) {
      this.recoveryPlanService.getRecoveryPlanById(planId).subscribe({
        next: (plan) => this.recoveryPlan = plan,
        error: (err) => console.error('Erreur récupération plan', err)
      });
    }
  }
}
