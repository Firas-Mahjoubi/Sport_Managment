import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../calendar/event-form/event-form.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {

  event: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { event: any },
    private dialogRef: MatDialogRef<EventDetailsComponent>,
    private eventService: EventService,
    private dialog: MatDialog
  ) {
    this.event = data.event;  
    console.log('Event data received:', this.event);
  }


  deleteEvent(): void {
    if (!this.event || !this.event.id) {
      console.error('Event or Event ID is missing!', this.event);
      return;
    }

    console.log(`Deleting event with ID: ${this.event.id}`);

    this.eventService.removeEvent(this.event.id).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error deleting event:', error);
      }
    });
  }


  editEvent(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(updatedEvent => {
      if (updatedEvent) {
        const updatedEventData = { ...this.event, ...updatedEvent };

        this.eventService.updateEvent(updatedEventData).subscribe({
          next: () => {
            this.event = updatedEventData;
            console.log('Event updated successfully');
          },
          error: (error) => {
            console.error('Error updating event:', error);
          }
        });
      }
    });
  }

    close(): void {
    this.dialogRef.close();
  }
}
