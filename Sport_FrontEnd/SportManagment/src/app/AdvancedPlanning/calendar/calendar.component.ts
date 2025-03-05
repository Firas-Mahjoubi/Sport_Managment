import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component';
import { SessionFormComponent } from '../session-form/session-form.component';
import { EventService } from '../../services/event.service';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { SessionService } from '../../services/session.service';
import { SessionDetailsComponent } from '../session-details/session-details.component';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  weeks: (number | null)[][] = [];
  selectedDate: Date | null = null;
  viewMode:  'month'| 'day' | 'year' = 'month';


  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  isDarkMode: boolean = false;


  events: any[] = [];

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private sessionService: SessionService,
  ) {
    this.generateCalendar();
    this.loadEvents();
  }


  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    this.daysInMonth = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.daysInMonth.push(i);
    }

    // Ajouter des jours vides pour aligner le premier jour du mois
    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.unshift(null);
    }

    // Diviser les jours en semaines
    this.weeks = this.chunkArray(this.daysInMonth, 7);
  }


  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events = response;
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }


  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }


  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }


  prevYear(): void {
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.generateCalendar();
  }


  nextYear(): void {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    this.generateCalendar();
  }

  selectDay(day: number | null): void {
    if (day !== null) {
      this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
      this.viewMode = 'day';


      const eventsForDay = this.getEventsForDay(day);
      if (eventsForDay.length > 0) {
        const dialogRef = this.dialog.open(EventDetailsComponent, {
          width: '500px',
          data: { event: eventsForDay[0] }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadEvents(); // Recharger les événements si un événement a été supprimé
          }
        });
      }


      const sessionsForDay = this.getSessionsForDay(day);
      if (sessionsForDay.length > 0) {
        const dialogRef = this.dialog.open(SessionDetailsComponent, {
          width: '500px',
          data: { session: sessionsForDay[0] }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.loadSessions();
          }
        });
      }
    }
  }


  selectMonth(monthIndex: number): void {
    this.currentDate.setMonth(monthIndex);
    this.viewMode = 'month';
    this.generateCalendar();
  }


  selectYear(year: number): void {
    this.currentDate.setFullYear(year);
    this.viewMode = 'year';
  }


  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }


  getYear(): number {
    return this.currentDate.getFullYear();
  }


  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }


  openEventForm(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEvent(result);
      }
    });
  }


  saveEvent(eventData: any): void {
    this.eventService.addEvent(eventData).subscribe({
      next: (response) => {
        console.log('Event saved successfully:', response);
        this.loadEvents();
      },
      error: (error) => {
        console.error('Error saving event:', error);
      }
    });
  }


  openSessionForm(): void {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveSession(result);
      }
    });
  }


  saveSession(sessionData: any): void {
    this.sessionService.addSession(sessionData).subscribe({
      next: (response) => {
        console.log('Session saved successfully:', response);
      },
      error: (error) => {
        console.error('Error saving session:', error);
      }
    });
  }





  getEventsForDay(day: number | null): any[] {
    if (day === null) return [];
    const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }


  private chunkArray(array: (number | null)[], size: number): (number | null)[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

sessions: any[] = [];


ngOnInit(): void {
  this.generateCalendar();
  this.loadEvents();
  this.loadSessions();
}


loadSessions(): void {
  this.sessionService.getAllSessions().subscribe({
    next: (response) => {
      this.sessions = response;
    },
    error: (error) => {
      console.error('Error loading sessions:', error);
    }
  });
}


getSessionsForDay(day: number | null): any[] {
  if (day === null) return [];
  const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
  return this.sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return (
      sessionDate.getFullYear() === date.getFullYear() &&
      sessionDate.getMonth() === date.getMonth() &&
      sessionDate.getDate() === date.getDate()
    );
  });
}
}
