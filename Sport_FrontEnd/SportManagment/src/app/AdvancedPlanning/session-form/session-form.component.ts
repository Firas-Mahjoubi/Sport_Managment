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
    
    this.sessionForm = this.fb.group({
      id: [data.session?.id || null],
      name: [data.session?.name || '', [Validators.required, Validators.minLength(3)]],
      date: [
        data.session?.date ? new Date(data.session.date).toISOString().split('T')[0] : '',
        [Validators.required, this.dateValidator]
      ],
      startTime: [data.session?.startTime || '', Validators.required],
      endTime: [data.session?.endTime || '', [Validators.required, this.timeValidator]]
    });


    if (data.session?.date) {
      const localDate = new Date(data.session.date);
      const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
      this.sessionForm.patchValue({ date: utcDate.toISOString().split('T')[0] });
    }
  }


  dateValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : { dateInvalid: true };
  }


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

        return start < end ? null : { timeInvalid: true };
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      let formData = this.sessionForm.value;


      const localDate = new Date(formData.date);
      const utcDate = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));


      formData.date = utcDate;


      this.dialogRef.close(formData);
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
