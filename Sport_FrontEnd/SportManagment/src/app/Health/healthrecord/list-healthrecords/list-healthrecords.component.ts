import { Component, OnInit } from '@angular/core';
import { HealthRecordService } from '../../services/health-record.service';
import { PlayerService } from '../../services/player.service';
import { HealthRecord } from '../../models/HealthRecord';
import { Player } from '../../models/player';

@Component({
  selector: 'app-list-healthrecords',
  templateUrl: './list-healthrecords.component.html',
  styleUrls: ['./list-healthrecords.component.css']
})
export class ListHealthrecordsComponent implements OnInit {
  healthRecords: HealthRecord[] = [];
  filteredRecords: HealthRecord[] = [];
  currentPageRecords: HealthRecord[] = [];
  players: Player[] = [];
  searchTerm: string = '';
  selectedPlayer: string = 'all'; // 'all' signifie tous les joueurs
  currentPage: number = 1;
  recordsPerPage: number = 6;
  totalPages: number = 0;
  pageNumbers: number[] = [];

  constructor(
    private healthRecordService: HealthRecordService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.fetchHealthRecords();
    this.fetchPlayers();
  }


  // Calculer les pages visibles
  visiblePages(): number[] {
    const pages = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    // Pages autour de la page actuelle
    const pageStart = Math.max(2, currentPage - 2);
    const pageEnd = Math.min(totalPages - 1, currentPage + 2);

    for (let i = pageStart; i <= pageEnd; i++) {
      pages.push(i);
    }
    return pages;
  }
  fetchHealthRecords(): void {
    this.healthRecordService.getAllHealthRecords().subscribe({
      next: (records) => {
        this.healthRecords = records;
        this.filteredRecords = records;
        this.calculatePagination();
      },
      error: (err) => console.error("❌ Erreur lors de la récupération des Health Records :", err)
    });
  }

  fetchPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (players) => {
        this.players = players.sort((a, b) => a.firstName.localeCompare(b.firstName));
      },
      error: (err) => console.error("❌ Erreur lors de la récupération des joueurs :", err)
    });
  }

  deleteHealthRecord(id?: number): void {
    if (!id) return;
    if (confirm('⚠️ Voulez-vous vraiment supprimer ce Health Record ?')) {
      this.healthRecordService.deleteHealthRecord(id).subscribe({
        next: () => this.fetchHealthRecords(),
        error: (err) => console.error(`❌ Erreur lors de la suppression du Health Record ID ${id} :`, err)
      });
    }
  }

  filterRecords(): void {
    this.filteredRecords = this.healthRecords.filter(record => {
      const playerFullName = `${record.player?.firstName ?? ''} ${record.player?.lastName ?? ''}`.toLowerCase();
      const matchesSearch = playerFullName.includes(this.searchTerm.toLowerCase()) ||
                            record.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            record.statusJoueur.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesPlayer = this.selectedPlayer === 'all' || record.player?.id === +this.selectedPlayer;

      return matchesSearch && matchesPlayer;
    });

    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRecords.length / this.recordsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(this.currentPage);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.recordsPerPage;
    const endIndex = startIndex + this.recordsPerPage;
    this.currentPageRecords = this.filteredRecords.slice(startIndex, endIndex);
  }
}
