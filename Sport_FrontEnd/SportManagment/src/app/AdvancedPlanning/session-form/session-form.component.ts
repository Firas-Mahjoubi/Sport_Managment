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
    @Inject(MAT_DIALOG_DATA) public data: { session: any } // Recevoir les données de la session
  ) {
    // Initialisation du formulaire avec les anciennes valeurs
    this.sessionForm = this.fb.group({
      id: [data.session?.id || null], // ID de la session (pour la mise à jour)
      name: [data.session?.name || '', Validators.required], // Pré-remplir le nom
      date: [data.session?.date || '', Validators.required], // Pré-remplir la date
      startTime: [data.session?.startTime || '', Validators.required], // Pré-remplir l'heure de début
      endTime: [data.session?.endTime || '', Validators.required] // Pré-remplir l'heure de fin
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
