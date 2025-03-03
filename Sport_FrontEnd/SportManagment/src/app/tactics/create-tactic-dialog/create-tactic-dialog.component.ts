import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-tactic-dialog',
  templateUrl: './create-tactic-dialog.component.html',
  styleUrls: ['./create-tactic-dialog.component.css']
})
export class CreateTacticDialogComponent {
  tacticForm: FormGroup;
  formations = ['4-4-2', '4-3-3', '3-5-2', '5-3-2']; // Example formations
  trainingFocusOptions = ['DEFENSE', 'ATTACK', 'POSSESSION', 'PRESSING']; // Example options

  constructor(
    public dialogRef: MatDialogRef<CreateTacticDialogComponent>,
    private fb: FormBuilder
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
      this.dialogRef.close(this.tacticForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
