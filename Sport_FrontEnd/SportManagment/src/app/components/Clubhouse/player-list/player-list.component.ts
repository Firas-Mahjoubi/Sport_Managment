import { Component, OnInit } from '@angular/core';
import { PlayerService, Player } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  // Données principales
  players: Player[] = [];
  filteredPlayers: Player[] = [];
  
  // État de tri et filtrage
  sortField: string = 'lastName';
  sortDirection: string = 'asc';
  searchTerm: string = '';
  showActive: boolean = false;
  
  // Pagination
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;
  
  // Pour l'animation de chargement
  loading: boolean = true;

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.getPlayers();
  }

  /**
   * Récupère tous les joueurs depuis l'API
   */
  getPlayers(): void {
    this.playerService.getAll().subscribe(data => {
      this.players = data.map(player => ({
        ...player,
        imageUrl: `http://localhost:8088/players/image/${player.id}`, // 👈 crée une vraie URL utilisable
        birthDate: player.birthDate || 'Non spécifiée',
        status: player.status || 'Non défini'
      }));
    
    });
  }
    

  /**
   * Filtre les joueurs selon les critères actuels
   */
  filterPlayers(): void {
    let filtered = [...this.players];
    
    // Filtre par terme de recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(player => 
        player.firstName?.toLowerCase().includes(term) || 
        player.lastName?.toLowerCase().includes(term) ||
        player.position?.toLowerCase().includes(term) ||
        player.playerNumber?.toString().includes(term)
      );
    }
    
    // Filtre par statut actif
    if (this.showActive) {
      filtered = filtered.filter(player => player.status === 'Active');
    }
    
    // Applique le tri
    filtered = this.sortPlayersList(filtered, this.sortField, this.sortDirection);
    
    // Mise à jour de la pagination
    this.filteredPlayers = filtered;
    this.calculatePagination();
    this.applyPagination();
  }

  /**
   * Trie les joueurs selon le champ et la direction spécifiés
   */
  sortPlayers(field: string): void {
    // Si on clique sur le même champ, on inverse la direction
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    
    this.filterPlayers();
  }
  
  /**
   * Fonction de tri pour les joueurs
   */
  private sortPlayersList(players: Player[], field: string, direction: string): Player[] {
    return players.sort((a, b) => {
      let valueA: any = a[field as keyof Player];
      let valueB: any = b[field as keyof Player];
      
      // Gestion des valeurs nulles
      if (valueA === null || valueA === undefined) return direction === 'asc' ? -1 : 1;
      if (valueB === null || valueB === undefined) return direction === 'asc' ? 1 : -1;
      
      // Comparaison selon le type
      if (field === 'birthDate') {
        valueA = new Date(valueA).getTime();
        valueB = new Date(valueB).getTime();
      } else if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      // Retourne la comparaison selon la direction
      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
  
  /**
   * Calcul de la pagination
   */
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPlayers.length / this.itemsPerPage);
    // Remettre à la première page si on filtre et qu'on se retrouve avec moins de pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
  }
  
  /**
   * Applique la pagination aux résultats filtrés
   */
  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredPlayers = this.filteredPlayers.slice(startIndex, endIndex);
  }
  
  /**
   * Change la page courante
   */
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.filterPlayers();
  }
  
  /**
   * Retourne un tableau des numéros de page pour l'affichage de la pagination
   */
  getPageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }
  
  /**
   * Retourne le libellé du champ de tri pour l'affichage
   */
  getSortFieldLabel(): string {
    const labels: {[key: string]: string} = {
      'lastName': 'Nom',
      'firstName': 'Prénom',
      'birthDate': 'Date de naissance',
      'playerNumber': 'Numéro',
      'position': 'Position',
      'status': 'Statut'
    };
    
    return labels[this.sortField] || this.sortField;
  }

  /**
   * Fonction pour éditer un joueur
   */
  editPlayer(player: Player): void {
    if (player.id !== undefined) {
      this.router.navigate(['/edit-player', player.id]);
    } else {
      console.error("❌ ID du joueur non défini !");
    }
  }

  /**
   * Fonction pour supprimer un joueur
   */
  deletePlayer(id?: number): void {
    if (id !== undefined) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
        this.playerService.delete(id).subscribe(() => {
          console.log("✅ Joueur supprimé avec succès !");
          this.players = this.players.filter(p => p.id !== id);
          this.filterPlayers();
        }, error => {
          console.error("❌ Erreur lors de la suppression:", error);
        });
      }
    }
  }

  /**
   * Fonction pour voir les détails d'un joueur
   */
  viewDetails(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/players', id]);
    }
  }
}