import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css']
})
export class SessionFormComponent {
  sessionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SessionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialisation du formulaire
    this.sessionForm = this.fb.group({
      name: ['', Validators.required], // Nom de la session (obligatoire)
      date: ['', Validators.required], // Date de la session (obligatoire)
      startTime: ['', Validators.required], // Heure de début (obligatoire)
      endTime: ['', Validators.required] // Heure de fin (obligatoire)
    });
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Ferme la boîte de dialogue et retourne les données du formulaire si valide.
   */
  onSubmit(): void {
    if (this.sessionForm.valid) {
      this.dialogRef.close(this.sessionForm.value);
    }
  }

  /**
   * Méthode appelée pour annuler et fermer la boîte de dialogue sans rien faire.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
