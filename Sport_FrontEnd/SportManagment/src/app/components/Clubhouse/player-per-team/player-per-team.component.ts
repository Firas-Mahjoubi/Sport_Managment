import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-players-per-team',
  templateUrl: './player-per-team.component.html',
  styleUrls: ['./player-per-team.component.css']
})
export class PlayersPerTeamComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  stats: any[] = []; // Données originales
  filteredStats: any[] = []; // Données filtrées pour l'affichage
  uniqueClubs: string[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  viewMode: 'chart' | 'table' = 'chart'; // Mode d'affichage par défaut
  selectedClub: string = 'all'; // Club sélectionné
  
  // Configuration du graphique
  barChartType: ChartType = 'bar';
  barChartLabels: string[] = [];
  barChartDataSet: { 
    data: number[]; 
    label: string; 
    backgroundColor?: string[];
    hoverBackgroundColor?: string[];
    borderColor?: string;
    borderWidth?: number;
  }[] = [];

  // Options avancées pour le graphique
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          precision: 0
        },
        title: {
          display: true,
          text: 'Nombre de joueurs'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.statisticsService.getPlayersPerTeam().subscribe(data => {
      console.log('📦 Données reçues depuis l\'API :', data);
      this.stats = data;
      this.filteredStats = [...data]; // Copie pour le filtrage
      
      // Extraire la liste des clubs uniques
      this.uniqueClubs = [...new Set(this.stats.map(item => item.clubName))];
      
      // Configuration du graphique
      this.prepareChartData();
    });
  }
  
  // Méthode pour basculer entre les modes d'affichage
  setViewMode(mode: 'chart' | 'table'): void {
    this.viewMode = mode;
    console.log('Mode d\'affichage changé:', mode);
  }
  
  // Méthode pour filtrer par club
  filterByClub(): void {
    console.log('Filtrage par club:', this.selectedClub);
    
    if (this.selectedClub === 'all') {
      this.filteredStats = [...this.stats];
    } else {
      this.filteredStats = this.stats.filter(item => item.clubName === this.selectedClub);
    }
    
    // Mettre à jour le graphique avec les données filtrées
    this.prepareChartData();
    if (this.chart) {
      this.chart.update();
    }
  }

  prepareChartData(): void {
    // Labels plus courts pour le graphique
    this.barChartLabels = this.filteredStats.map(item => {
      // Abrévier les noms trop longs
      const teamName = item.teamName.length > 10 
        ? item.teamName.substring(0, 10) + '...' 
        : item.teamName;
      return `${teamName} (${item.clubName})`;
    });

    // Générer des couleurs par club
    const clubColors = this.generateClubColors();
    const backgroundColors = this.filteredStats.map(item => clubColors[item.clubName]);
    
    // Configuration des données
    this.barChartDataSet = [
      {
        data: this.filteredStats.map(item => Number(item.playerCount)),
        label: 'Nombre de joueurs',
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors.map(color => this.adjustBrightness(color, -15)),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }
    ];
  }

  // Méthodes utilitaires
  getTotalPlayers(): number {
    return this.filteredStats.reduce((sum, item) => sum + Number(item.playerCount), 0);
  }

  getMaxPlayers(): number {
    return this.filteredStats.length > 0 
      ? Math.max(...this.filteredStats.map(item => Number(item.playerCount)))
      : 0;
  }

  getAveragePlayers(): number {
    return this.getTotalPlayers() / (this.filteredStats.length || 1);
  }

  sortData(column: string): void {
    // Inverser la direction si on clique sur la même colonne
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Tri des données
    this.filteredStats.sort((a, b) => {
      const valueA = column === 'playerCount' ? Number(a[column]) : a[column];
      const valueB = column === 'playerCount' ? Number(b[column]) : b[column];
      
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Mettre à jour le graphique
    this.prepareChartData();
    if (this.chart) {
      this.chart.update();
    }
  }

  // Génère des couleurs pour chaque club
  generateClubColors(): {[key: string]: string} {
    const colors: {[key: string]: string} = {};
    const baseColors = [
      '#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f',
      '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab'
    ];

    this.uniqueClubs.forEach((club, index) => {
      colors[club] = baseColors[index % baseColors.length];
    });
    
    return colors;
  }

  // Retourne la couleur associée au club
  getClubColor(clubName: string): string {
    const clubColors = this.generateClubColors();
    return clubColors[clubName] || '#777777';
  }

  // Ajuster la luminosité d'une couleur hexadécimale
  adjustBrightness(col: string, amount: number): string {
    let usePound = false;
  
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
 
    const num = parseInt(col, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
 
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
 
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
  }

  generateFullPdf(): void {
    const exportElement = document.getElementById('full-stats-export');
  
    if (exportElement) {
      html2canvas(exportElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        let position = 10;
  
        if (imgHeight > pageHeight - 20) {
          // Si l’image dépasse la hauteur, on la divise en plusieurs pages
          let remainingHeight = imgHeight;
          let pageCount = 0;
  
          while (remainingHeight > 0) {
            const srcY = pageCount * (canvas.height * (pageHeight - 20) / imgHeight);
  
            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = canvas.height * (pageHeight - 20) / imgHeight;
            const ctx = pageCanvas.getContext('2d');
  
            if (ctx) {
              ctx.drawImage(canvas, 0, srcY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);
              const pageImgData = pageCanvas.toDataURL('image/png');
              if (pageCount > 0) pdf.addPage();
              pdf.addImage(pageImgData, 'PNG', 10, position, imgWidth, pageHeight - 20);
            }
  
            remainingHeight -= pageHeight - 20;
            pageCount++;
          }
        } else {
          // Si tout tient sur une page
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        }
  
        pdf.save('full-statistics.pdf');
      });
    }
  }
  
  
}