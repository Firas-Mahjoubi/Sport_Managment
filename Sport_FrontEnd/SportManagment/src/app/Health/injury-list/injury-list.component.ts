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
  players: Player[] = [];
  searchText: string = '';
  selectedPlayer: string = 'all';






  // 🔥 Émet un événement lorsqu'une blessure est archivée
  @Output() injuryArchived: EventEmitter<void> = new EventEmitter<void>();

  constructor(private injuryService: InjuryService, private playerService: PlayerService,  private router: Router) {}

  ngOnInit(): void {
    this.loadInjuries();
    this.loadPlayers();
  }

  /**
   * Charge la liste des blessures depuis le backend
   */
  loadInjuries(): void {
    this.injuryService.getInjuries().subscribe((data: Injury[]) => {
      this.injuries = data;
      this.filteredInjuries = data;
      console.log("🚀 Blessures récupérées :", this.injuries); // 🔍 Vérifie les données
    });
  }

  
  loadPlayers(): void {
    this.playerService.getPlayers().subscribe((data: Player[]) => {
      this.players = data;
      console.log("🎯 Joueurs récupérés :", this.players);
    });
  }


  filterInjuries(): void {
    this.filteredInjuries = this.injuries.filter(injury => {
      const matchesSearch = injury.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
                            injury.description.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesPlayer = this.selectedPlayer === 'all' || injury.player?.id === +this.selectedPlayer;

      return matchesSearch && matchesPlayer;
    });
  }

  /**
   * Archive et supprime une blessure si elle est guérie
   * @param injury Blessure à archiver
   */
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
          this.loadInjuries(); // Recharge la liste après suppression
          this.injuryArchived.emit(); // Notifie que l'archivage est fait
          this.router.navigate(['/health/injury/archived']); // 🔄 Redirection a
        },
        error: (err) => {
          console.error("❌ Erreur lors de l'archivage", err);
          alert(err.error?.error || "Erreur lors de l'archivage !");
        }
      });
    }
  }





}
