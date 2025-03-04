import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tactic-dialog',
  templateUrl: './create-tactic-dialog.component.html',
  styleUrls: ['./create-tactic-dialog.component.css']
})
export class CreateTacticDialogComponent {
  tacticForm: FormGroup;
  
  // Available formations
  formations: string[] = ['4-4-2', '4-3-3', '3-5-2', '5-3-2'];
  
  // Available training focuses
  trainingFocuses: string[] = ['ATTACK', 'DEFENSE', 'POSSESSION', 'PRESSING'];

  constructor(
    public dialogRef: MatDialogRef<CreateTacticDialogComponent>,
    private fb: FormBuilder
  ) {
    this.tacticForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      formation: ['', Validators.required],
      trainingFocus: ['', Validators.required]
    });
  }

  createTactic(): void {
    if (this.tacticForm.valid) {
      this.dialogRef.close(this.tacticForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
