import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.css']
})
export class ListPlayerComponent implements OnInit {

  players: Player[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  playersPerPage: number = 8;

  searchTerm: string = '';  // Variable pour stocker le terme de recherche

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  // Filtrer les joueurs en fonction du terme de recherche
  filterPlayers(): void {
    this.currentPage = 1;  // Réinitialiser la page à la première page après chaque recherche
    this.calculateTotalPages();  // Recalculer le nombre total de pages après le filtrage
  }

  // Retourner la liste filtrée des joueurs
  get filteredPlayers(): Player[] {
    return this.players.filter(player =>
      player.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Charger les joueurs depuis le service
  loadPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.calculateTotalPages();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des joueurs :', err);
      }
    });
  }

  // Calculer le nombre total de pages en fonction des joueurs filtrés
  calculateTotalPages(): void {
    const filtered = this.filteredPlayers;  // Applique le filtrage
    this.totalPages = Math.ceil(filtered.length / this.playersPerPage); // Recalculer le nombre total de pages
  }

  // Obtenir les joueurs visibles pour la page actuelle
  visiblePlayers(): Player[] {
    const filtered = this.filteredPlayers;  // Applique le filtrage
    const startIndex = (this.currentPage - 1) * this.playersPerPage;
    const endIndex = startIndex + this.playersPerPage;
    return filtered.slice(startIndex, endIndex);  // Retourner les joueurs filtrés pour la page actuelle
  }

  // Calculer les pages visibles à afficher
  visiblePagesNumbers(): number[] {
    const pages = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    const pageStart = Math.max(2, currentPage - 2);
    const pageEnd = Math.min(totalPages - 1, currentPage + 2);

    for (let i = pageStart; i <= pageEnd; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Changer de page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  // Sélectionner un joueur
  selectPlayer(player: Player): void {
    console.log('Joueur sélectionné:', player);
    localStorage.setItem('selectedPlayerId', player.id.toString());
    window.location.href = '/add-recoveryplan';
  }

  // Voir les plans de récupération du joueur
  viewRecoveryPlans(): void {
    this.router.navigate(['/list-recoveryplan/:playerId']);
  }
}
