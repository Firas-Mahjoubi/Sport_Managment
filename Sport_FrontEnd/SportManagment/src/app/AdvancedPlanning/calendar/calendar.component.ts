import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component';
import { SessionFormComponent } from '../session-form/session-form.component'; // Import du composant SessionForm
import { EventService } from '../../services/event.service'; // Service pour les événements
import { EventDetailsComponent } from '../event-details/event-details.component'; // Import du composant EventDetails
import { SessionService } from '../../services/session.service'; // Service pour les sessions
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // Icônes FontAwesome
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  // Variables pour la gestion du calendrier
  currentDate: Date = new Date(); // Date actuelle
  daysInMonth: (number | null)[] = []; // Jours du mois
  weeks: (number | null)[][] = []; // Semaines du mois
  selectedDate: Date | null = null; // Jour sélectionné
  viewMode: 'day' | 'month' | 'year' = 'month'; // Vue par défaut

  // Noms des mois et des jours
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Mode sombre
  isDarkMode: boolean = false;

  // Tableau pour stocker les événements
  events: any[] = [];

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private sessionService: SessionService,
  ) {
    this.generateCalendar();
    this.loadEvents(); // Charger les événements au démarrage
  }

  // Générer le calendrier pour le mois en cours
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

  // Charger les événements depuis le backend
  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events = response; // Stocker les événements
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  // Passer au mois précédent
  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  // Passer au mois suivant
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  // Passer à l'année précédente
  prevYear(): void {
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);
    this.generateCalendar();
  }

  // Passer à l'année suivante
  nextYear(): void {
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
    this.generateCalendar();
  }

  // Sélectionner un jour
  // In CalendarComponent
selectDay(day: number | null): void {
  if (day !== null) {
    this.selectedDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
    this.viewMode = 'day'; // Switch to day view

    // Open event details if an event is clicked
    const eventsForDay = this.getEventsForDay(day);
    if (eventsForDay.length > 0) {
      const dialogRef = this.dialog.open(EventDetailsComponent, {
        width: '500px',
        data: { event: eventsForDay[0] } // Pass the first event of the day
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadEvents(); // Reload events if an event was deleted
        }
      });
    }
  }
}

  // Sélectionner un mois
  selectMonth(monthIndex: number): void {
    this.currentDate.setMonth(monthIndex);
    this.viewMode = 'month'; // Basculer vers la vue mois
    this.generateCalendar();
  }

  // Sélectionner une année
  selectYear(year: number): void {
    this.currentDate.setFullYear(year);
    this.viewMode = 'year'; // Basculer vers la vue année
  }

  // Obtenir le nom du mois
  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }

  // Obtenir l'année
  getYear(): number {
    return this.currentDate.getFullYear();
  }

  // Basculer entre le mode clair et sombre
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  // Ouvrir le formulaire pour ajouter un événement
  openEventForm(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: {} // Vous pouvez passer des données au formulaire si nécessaire
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEvent(result); // Envoyer les données au backend
      }
    });
  }

  // Envoyer les données de l'événement au backend
  saveEvent(eventData: any): void {
    this.eventService.addEvent(eventData).subscribe({
      next: (response) => {
        console.log('Event saved successfully:', response);
        this.loadEvents(); // Recharger les événements après l'ajout
      },
      error: (error) => {
        console.error('Error saving event:', error);
      }
    });
  }

  // Ouvrir le formulaire pour ajouter une session
  openSessionForm(): void {
    const dialogRef = this.dialog.open(SessionFormComponent, {
      width: '500px',
      data: {} // Vous pouvez passer des données au formulaire si nécessaire
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveSession(result); // Envoyer les données au backend
      }
    });
  }

  // Envoyer les données de la session au backend
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

  // Filtrer les événements pour un jour donné
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

  // Diviser un tableau en sous-tableaux de taille donnée
  private chunkArray(array: (number | null)[], size: number): (number | null)[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}