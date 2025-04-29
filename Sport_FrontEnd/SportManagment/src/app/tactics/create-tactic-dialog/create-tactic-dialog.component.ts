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
      // Retrieve the userId from localStorage
      const userId = localStorage.getItem('userId');
      
      if (userId) {
        // Include the userId in the form data before closing the dialog
        const tacticData = {
          ...this.tacticForm.value,  // Get form data
          userId: userId  // Add userId to the form data
        };

        // Close the dialog and pass the data including userId
        this.dialogRef.close(tacticData);
      } else {
        // Handle the case where userId is not found in localStorage
        console.error('User ID is not found in localStorage');
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
