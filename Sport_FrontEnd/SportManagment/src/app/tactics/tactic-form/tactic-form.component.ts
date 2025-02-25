import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TacticService, Tactic } from '../../services/tactic.service';

@Component({
  selector: 'app-tactic-form',
  templateUrl: './tactic-form.component.html',
  styleUrls: ['./tactic-form.component.css']
})
export class TacticFormComponent implements OnInit {
  tacticForm: FormGroup;
  tacticId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tacticService: TacticService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tacticForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      teamId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.tacticId = +id;
        this.tacticService.getAllTactics().subscribe((tactics) => {
          const tactic = tactics.find(t => t.id === this.tacticId);
          if (tactic) this.tacticForm.patchValue(tactic);
        });
      }
    });
  }

  submitForm(): void {
    if (this.tacticForm.valid) {
      const tactic: Tactic = this.tacticForm.value;

      if (this.tacticId) {
        this.tacticService.updateTactic(this.tacticId, tactic).subscribe(() => {
          this.router.navigate(['/tactics']);
        });
      } else {
        this.tacticService.createTactic(tactic, this.tacticForm.get('teamId')?.value).subscribe(() => {
          this.router.navigate(['/tactics']);
        });
      }
    }
  }
}
