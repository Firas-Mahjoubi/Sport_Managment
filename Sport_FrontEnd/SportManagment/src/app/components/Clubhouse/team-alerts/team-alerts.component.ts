import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { finalize } from 'rxjs/operators';

interface TeamAlert {
  teamName: string;
  clubName: string;
  playerCount: number;
  alert: string;
  severity: 'danger' | 'warning' | 'success';
  id?: string; // Optional ID for team reference
  requiredPlayers?: number; // Minimum number of players required
}

@Component({
  selector: 'app-team-alerts',
  templateUrl: './team-alerts.component.html',
  styleUrls: ['./team-alerts.component.css']
})
export class TeamAlertsComponent implements OnInit {
  alerts: TeamAlert[] = [];
  filteredAlerts: TeamAlert[] = [];
  loading: boolean = true;
  searchTerm: string = '';
  filterBySeverity: string = 'all';
  
  constructor(private playerService: PlayerService) {}
  
  ngOnInit(): void {
    this.loadAlerts();
  }
  
  loadAlerts(): void {
    this.loading = true;
    this.playerService.getTeamRosterAlerts()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data: any[]) => {
          this.alerts = data.map(alert => ({
            ...alert,
            severity: alert.alert === 'Aucun joueur' ? 'danger' : 'warning',
            requiredPlayers: this.calculateRequiredPlayers(alert),
            id: `TEAM-${Math.floor(Math.random() * 10000)}`  // Demo ID for UI
          }));
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error loading team alerts:', err);
          // Here you could add a toast notification service to show the error
        }
      });
  }

  refreshData(): void {
    this.loadAlerts();
  }

  applyFilters(): void {
    let result = [...this.alerts];
    
    // Apply search filter if search term exists
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(alert => 
        alert.teamName.toLowerCase().includes(term) || 
        alert.clubName.toLowerCase().includes(term)
      );
    }
    
    // Apply severity filter if not set to 'all'
    if (this.filterBySeverity !== 'all') {
      result = result.filter(alert => alert.severity === this.filterBySeverity);
    }
    
    this.filteredAlerts = result;
  }

  // Watch for changes in filters
  ngDoCheck() {
    this.applyFilters();
  }

  getDangerAlertsCount(): number {
    return this.alerts.filter(alert => alert.severity === 'danger').length;
  }

  getWarningAlertsCount(): number {
    return this.alerts.filter(alert => alert.severity === 'warning').length;
  }

  getHealthyTeamsCount(): number {
    // This is a mock value since we don't have the total teams count
    // In a real application, you would calculate this based on total teams - teams with alerts
    return 0; // Example value
  }

  getTeamId(alert: TeamAlert): string {
    return alert.id || 'Unknown';
  }

  getRequiredPlayers(alert: TeamAlert): number {
    return alert.requiredPlayers || 11;
  }

  calculateRequiredPlayers(alert: any): number {
    // This would normally be based on team type, division, etc.
    // For demo purposes, just returning fixed values
    return alert.alert === 'Aucun joueur' ? 11 : 11 - alert.playerCount;
  }

  
}