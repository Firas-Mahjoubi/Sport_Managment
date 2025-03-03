import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TacticService } from 'src/app/services/tactic.service';

@Component({
  selector: 'app-create-tactic-dialog',
  templateUrl: './create-tactic-dialog.component.html',
  styleUrls: ['./create-tactic-dialog.component.css']
})
export class CreateTacticDialogComponent {
  tacticForm: FormGroup;
  formations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2']; // Example formations
  trainingFocusOptions = ['ATTACK', 'DEFENSE', 'GOALKEEPER', 'TRANSITION','FORMATION']; // Example options

  constructor(
    private fb: FormBuilder,
    private tacticService: TacticService,
    private dialogRef: MatDialogRef<CreateTacticDialogComponent>
  ) {
    this.tacticForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      formation: new FormControl(null, Validators.required),  // ✅ Ensure this is FormControl
      trainingFocus: new FormControl(null, Validators.required) // ✅ Ensure this is FormControl
    });
  }

  createFolder(): void {
    if (this.tacticForm.valid) {
      const newTactic = {
        name: this.tacticForm.value.name,
        description: this.tacticForm.value.description,
        formation: this.tacticForm.value.formation,
        trainingFocus: this.tacticForm.value.trainingFocus
      };
  
      const teamId = 1; // Replace with dynamic team ID if needed
  
      this.tacticService.createTactic(newTactic, teamId).subscribe({
        next: (createdTactic) => {
          console.log('Tactic created successfully:', createdTactic);
          this.dialogRef.close(createdTactic);
        },
        error: (error) => {
          console.error('Error creating tactic:', error);
        }
      });
    }
  }
  

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
