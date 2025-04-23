import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventFormComponent } from './event-form/event-form.component';
import { SessionFormComponent } from '../session-form/session-form.component';
import { EventService } from '../../services/event.service';
import { EventDetailsComponent } from '../event-details/event-details.component';
import { SessionService } from '../../services/session.service';
import { SessionDetailsComponent } from '../session-details/session-details.component';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendarElement') calendarElement!: ElementRef;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  currentDate: Date = new Date();
  daysInMonth: (number | null)[] = [];
  weeks: (number | null)[][] = [];
  selectedDate: Date | null = null;
  viewMode: 'month' | 'day' | 'year' = 'month';

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  isDarkMode: boolean = true;
  events: any[] = [];
  sessions: any[] = [];
  heatmapDays: { date: Date, eventCount: number }[] = [];
  maxHeatmapEvents = 0;

  constructor(
    private dialog: MatDialog,
    private eventService: EventService,
    private sessionService: SessionService,
  ) {
    this.generateCalendar();
    this.loadEvents();
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.loadEvents();
    this.loadSessions();
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

    const startDay = firstDay.getDay();
    for (let i = 0; i < startDay; i++) {
      this.daysInMonth.unshift(null);
    }

    this.weeks = this.chunkArray(this.daysInMonth, 7);
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.events = response;
        this.updateHeatmap();
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  loadSessions(): void {
    this.sessionService.getAllSessions().subscribe({
      next: (response) => {
        this.sessions = response;
        this.updateHeatmap();
      },
      error: (error) => {
        console.error('Error loading sessions:', error);
      }
    });
  }

  prevMonth(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate = newDate;
    this.generateCalendar();
    this.updateHeatmap();
  }

  nextMonth(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate = newDate;
    this.generateCalendar();
    this.updateHeatmap();
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
            this.loadEvents();
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

  updateHeatmap() {
    this.heatmapDays = [];
    this.maxHeatmapEvents = 0;

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const eventCountMap = new Map<string, number>();

    // Count events
    this.events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
        const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
        eventCountMap.set(dateKey, (eventCountMap.get(dateKey) || 0) + 1);
      }
    });

    
    this.sessions.forEach(session => {
      const sessionDate = new Date(session.date);
      if (sessionDate.getMonth() === month && sessionDate.getFullYear() === year) {
        const dateKey = `${sessionDate.getFullYear()}-${sessionDate.getMonth()}-${sessionDate.getDate()}`;
        eventCountMap.set(dateKey, (eventCountMap.get(dateKey) || 0) + 1);
      }
    });

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = `${year}-${month}-${day}`;
      const count = eventCountMap.get(dateKey) || 0;
      this.heatmapDays.push({ date, eventCount: count });
      this.maxHeatmapEvents = Math.max(this.maxHeatmapEvents, count);
    }
  }

  getHeatmapColor(eventCount: number): string {
    if (this.maxHeatmapEvents === 0) return '#f0f0f0';
    const intensity = eventCount / this.maxHeatmapEvents;
    const hue = 240; // Blue color
    const lightness = 100 - (intensity * 50);
    return `hsl(${hue}, 70%, ${lightness}%)`;
  }
  async exportToPDF(): Promise<void> {
    try {
      const calendarEl = this.calendarElement.nativeElement;

      // Create a clean clone
      const clone = calendarEl.cloneNode(true) as HTMLElement;

      // Remove unwanted elements
      const elementsToRemove = [
        '.add-event-container',
        '.heatmap-container',

        '.view-selector',
        'app-admin-header',
        'app-admin-sidebar'
      ];

      elementsToRemove.forEach(selector => {
        clone.querySelectorAll(selector).forEach(el => el.remove());
      });

      // Force month view for PDF
      clone.querySelector('.month-view')?.classList.remove('hidden');

      // Create temporary container
      const tempDiv = document.createElement('div');
      tempDiv.style.cssText = 'position:fixed; top:-9999px; left:-9999px; width:1000px;';
      tempDiv.appendChild(clone);
      document.body.appendChild(tempDiv);

      // Add PDF-specific styling
      clone.style.cssText = `
        position: relative !important;
        top: 0 !important;
        left: 0 !important;
        transform: none !important;
        width: 100% !important;
        box-shadow: none !important;
      `;

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        windowHeight: clone.scrollHeight,
        windowWidth: clone.scrollWidth,
        logging: true
      });

      document.body.removeChild(tempDiv);

      const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height]);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('calendar-export.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  }

  private chunkArray(array: (number | null)[], size: number): (number | null)[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
