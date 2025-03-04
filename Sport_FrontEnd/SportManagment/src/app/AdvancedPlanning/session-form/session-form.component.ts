import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: { session: any }
  ) {
    // Initialisation du formulaire avec les anciennes valeurs
    this.sessionForm = this.fb.group({
      id: [data.session?.id || null], // ID de la session (pour la mise à jour)
      name: [data.session?.name || '', [Validators.required, Validators.minLength(3)]], // Validation du nom de la session
      date: [
        data.session?.date ? new Date(data.session.date).toISOString().split('T')[0] : '',
        [Validators.required, this.dateValidator] // Validation de la date
      ],
      startTime: [data.session?.startTime || '', Validators.required], // Validation de l'heure de début
      endTime: [data.session?.endTime || '', [Validators.required, this.timeValidator]] // Validation de l'heure de fin
    });

    // Si la session existe (mode édition), ajuster la date en UTC
    if (data.session?.date) {
      const localDate = new Date(data.session.date);
      const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
      this.sessionForm.patchValue({ date: utcDate.toISOString().split('T')[0] });
    }
  }

  // Validation de la date (doit être aujourd'hui ou après)
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Mettre la date d'aujourd'hui à 00:00:00 pour ignorer l'heure

    return selectedDate >= today ? null : { dateInvalid: true };
  }

  // Validation pour vérifier que l'heure de début est avant l'heure de fin
  timeValidator(control: AbstractControl): ValidationErrors | null {
    const form = control?.parent;
    if (form) {
      const startTime = form.get('startTime')?.value;
      const endTime = control.value;

      if (startTime && endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const start = new Date();
        start.setHours(startHours, startMinutes);

        const end = new Date();
        end.setHours(endHours, endMinutes);

        return start < end ? null : { timeInvalid: true }; // Vérifie que startTime est avant endTime
      }
    }

    return null;
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
