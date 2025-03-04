import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SessionService } from '../../services/session.service';
import { SessionFormComponent } from '../session-form/session-form.component';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent {
  session: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { session: any },
    private dialogRef: MatDialogRef<SessionDetailsComponent>,
    private sessionService: SessionService,
    private dialog: MatDialog // Injecter MatDialog
  ) {
    this.session = data.session; // Récupérer la session passée en paramètre
  }

  // Supprimer la session
  deleteSession(): void {
    if (this.session.id) {
      this.sessionService.deleteSession(this.session.id).subscribe({
        next: () => {
          console.log('Session deleted successfully');
          this.dialogRef.close(true); // Fermer la boîte de dialogue et indiquer que la session a été supprimée
        },
        error: (error) => {
          console.error('Error deleting session:', error);
        }
      });
    }
  }

  // Ouvrir le formulaire pour éditer la session
  editSession(): void {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      width: '500px',
      data: { session: this.session } // Passer la session à éditer
    });

    dialogRef.afterClosed().subscribe((result: any) => { // Ajouter le type 'any' ou un type spécifique
      if (result) {
        this.sessionService.updateSession(result).subscribe({
          next: () => {
            console.log('Session updated successfully');
            this.dialogRef.close(true); // Fermer la boîte de dialogue et indiquer que la session a été modifiée
          },
          error: (error) => {
            console.error('Error updating session:', error);
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
