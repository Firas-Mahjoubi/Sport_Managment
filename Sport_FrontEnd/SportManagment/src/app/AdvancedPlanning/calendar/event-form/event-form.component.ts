import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
      nameEvent: [data?.event?.nameEvent || '', [Validators.required, Validators.minLength(3)]],
      description: [data?.event?.description || '', Validators.maxLength(250)],
      date: [existingDate || '', [Validators.required, this.dateValidator]],
      time: [existingDate ? this.formatTime(existingDate) : '12:00', Validators.required],
      address: [data?.event?.address || '', [Validators.required, Validators.minLength(5)]],
      typeEvent: [data?.event?.typeEvent || '', Validators.required]
    });
  }


  dateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    return selectedDate >= today ? null : { dateInvalid: true };
  }

  private formatTime(date: Date): string {
    return date.toTimeString().substring(0, 5); 
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
