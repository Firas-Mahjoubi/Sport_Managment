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
      date: [
        data.session?.date ? new Date(data.session.date).toISOString().split('T')[0] : '', // Utilisation de la date au format ISO
        Validators.required
      ], // Pré-remplir la date
      startTime: [data.session?.startTime || '', Validators.required], // Pré-remplir l'heure de début
      endTime: [data.session?.endTime || '', Validators.required] // Pré-remplir l'heure de fin
    });

    // Si la session existe (mode édition), ajuster la date en UTC
    if (data.session?.date) {
      const localDate = new Date(data.session.date);
      const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
      this.sessionForm.patchValue({ date: utcDate.toISOString().split('T')[0] });
    }
  }

  /**
   * Méthode appelée lors de la soumission du formulaire.
   * Ferme la boîte de dialogue et retourne les données du formulaire si valide.
   */
  onSubmit(): void {
    if (this.sessionForm.valid) {
      let formData = this.sessionForm.value;

      // Convertir la date locale en UTC
      const localDate = new Date(formData.date);
      const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));

      // Remplacer la date par la version UTC
      formData.date = utcDate;

      // Fermer le formulaire et envoyer les données
      this.dialogRef.close(formData);
    }
  }

  /**
   * Méthode appelée pour annuler et fermer la boîte de dialogue sans rien faire.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
