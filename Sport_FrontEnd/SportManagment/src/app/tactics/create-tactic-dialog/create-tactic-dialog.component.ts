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

  constructor(
    public dialogRef: MatDialogRef<CreateTacticDialogComponent>,
    private fb: FormBuilder
  ) {
    this.tacticForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  createFolder(): void {
    if (this.tacticForm.valid) {
      this.dialogRef.close(this.tacticForm.value.name);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
