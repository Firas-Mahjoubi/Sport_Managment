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
    this.event = data.event;  // Récupérer l'événement à partir des données passées
    console.log('Event data received:', this.event);  // Vérification dans la console
  }

  // Supprimer l'événement
  deleteEvent(): void {
    if (!this.event || !this.event.id) {  // Remplacer 'idEvent' par 'id' ici
      console.error('Event or Event ID is missing!', this.event);  // Vérification si event et id existent
      return;
    }

    console.log(`Deleting event with ID: ${this.event.id}`);  // Remplacer 'idEvent' par 'id'

    this.eventService.removeEvent(this.event.id).subscribe({  // Remplacer 'idEvent' par 'id' ici aussi
      next: () => {
        console.log('Event deleted successfully');
        this.dialogRef.close(true);  // Ferme la boîte de dialogue après la suppression
      },
      error: (error) => {
        console.error('Error deleting event:', error);  // Gestion des erreurs
      }
    });
  }

  // Modifier l'événement
  editEvent(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '400px',
      data: { event: this.event }
    });

    dialogRef.afterClosed().subscribe(updatedEvent => {
      if (updatedEvent) {
        const updatedEventData = { ...this.event, ...updatedEvent };  // Fusionner les anciennes et nouvelles données

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

  // Fermer la boîte de dialogue
  close(): void {
    this.dialogRef.close();
  }
}
