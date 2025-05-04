import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InjuryService } from '../services/injury.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player';
import { Injury } from '../models/injury';
import { Router } from '@angular/router';

@Component({
  selector: 'app-injury-list',
  templateUrl: './injury-list.component.html',
  styleUrls: ['./injury-list.component.css']
})
export class InjuryListComponent implements OnInit {
  injuries: Injury[] = [];
  filteredInjuries: Injury[] = [];
  paginatedInjuries: Injury[] = [];

  players: Player[] = [];
  searchText: string = '';
  selectedPlayer: string = 'all';

  searchPlayer: string = ''; // nouveau champ


  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  @Output() injuryArchived: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private injuryService: InjuryService,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInjuries();
    this.loadPlayers();
  }

  loadInjuries(): void {
    this.injuryService.getInjuries().subscribe((data: Injury[]) => {
      this.injuries = data;
      this.filterInjuries(); // Initialise aussi les données filtrées + paginées
      console.log("🚀 Blessures récupérées :", this.injuries);
    });
  }


  visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(2, this.currentPage - 2);
    const end = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }


  loadPlayers(): void {
    this.playerService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
      console.log("🎯 Joueurs récupérés :", this.players);
    });
  }

  filterInjuries(): void {
    this.filteredInjuries = this.injuries.filter(injury => {
      const matchesPlayerName =
        injury.player &&
        (injury.player.firstName.toLowerCase().includes(this.searchPlayer.toLowerCase()) ||
         injury.player.lastName.toLowerCase().includes(this.searchPlayer.toLowerCase()));

      const matchesPlayerId = this.selectedPlayer === 'all' || injury.player?.id === +this.selectedPlayer;

      return matchesPlayerName && matchesPlayerId;
    });

    this.totalPages = Math.ceil(this.filteredInjuries.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedInjuries();
  }
  /**
   * Met à jour les blessures affichées selon la page
   */
  updatePaginatedInjuries(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedInjuries = this.filteredInjuries.slice(start, end);
  }

  /**
   * Change la page actuelle
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedInjuries();

  }

  deleteInjury(injury: Injury): void {
    if (!injury.id) {
      console.error("❌ Erreur : L'ID de la blessure est manquant !");
      alert("Erreur : Impossible d'archiver cette blessure car son ID est invalide.");
      return;
    }

    if (injury.status !== 'GUERIE') {
      alert("🚫 Cette blessure ne peut pas être archivée car elle n'est pas encore guérie !");
      return;
    }

    if (confirm("🗑️ Voulez-vous vraiment archiver et supprimer cette blessure ?")) {
      this.injuryService.archiveInjury(injury.id).subscribe({
        next: (response) => {
          console.log("✅ Blessure archivée :", response);
          alert(response.message || "Blessure archivée avec succès !");
          this.loadInjuries();
          this.injuryArchived.emit();
          this.router.navigate(['/health/injury/archived']);
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'archivage", err);
          alert(err.error?.error || "Erreur lors de l'archivage !");
        }
      });
    }
  }
}
