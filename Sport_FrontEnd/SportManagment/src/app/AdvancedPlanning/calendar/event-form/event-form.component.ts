import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm: FormGroup;
  eventTypes: string[] = ['MEETING', 'STAFFMEETING', 'MEETINGTEAM']; // Types d'événements
  isEditMode: boolean = false; // Pour différencier ajout / modification

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.event; // Si `data.event` existe, c'est une édition

    this.eventForm = this.fb.group({
      nameEvent: [data?.event?.nameEvent || '', Validators.required],
      description: [data?.event?.description || ''],
      date: [data?.event?.date || '', Validators.required],
      address: [data?.event?.address || '', Validators.required],
      typeEvent: [data?.event?.typeEvent || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      this.dialogRef.close(this.eventForm.value); // Retourne les nouvelles données de l'événement
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
