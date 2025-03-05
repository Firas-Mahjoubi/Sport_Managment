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
    private dialog: MatDialog 
  ) {
    this.session = data.session;
  }


  deleteSession(): void {
    if (this.session.id) {
      this.sessionService.deleteSession(this.session.id).subscribe({
        next: () => {
          console.log('Session deleted successfully');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error deleting session:', error);
        }
      });
    }
  }


  editSession(): void {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      width: '500px',
      data: { session: this.session }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.sessionService.updateSession(result).subscribe({
          next: () => {
            console.log('Session updated successfully');
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error updating session:', error);
          }
        });
      }
    });
  }


  close(): void {
    this.dialogRef.close();
  }
}
