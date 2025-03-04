import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  eventForm: FormGroup;
  eventTypes: string[] = ['MEETING', 'STAFFMEETING', 'MEETINGTEAM'];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.event;

    let existingDate = data?.event?.date ? new Date(data.event.date) : null;

    this.eventForm = this.fb.group({
      nameEvent: [data?.event?.nameEvent || '', Validators.required],
      description: [data?.event?.description || ''],
      date: [existingDate || '', Validators.required], // Conserver le format `Date` pour le calendrier
      time: [existingDate ? this.formatTime(existingDate) : '12:00', Validators.required], // Format HH:mm
      address: [data?.event?.address || '', Validators.required],
      typeEvent: [data?.event?.typeEvent || '', Validators.required]
    });
  }

  private formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5); // HH:mm
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      let eventData = this.eventForm.value;

      let selectedDate: Date = new Date(eventData.date);
      let [hours, minutes] = eventData.time.split(':').map(Number);

      selectedDate.setHours(hours, minutes, 0, 0);
      eventData.date = selectedDate;

      this.dialogRef.close(eventData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
