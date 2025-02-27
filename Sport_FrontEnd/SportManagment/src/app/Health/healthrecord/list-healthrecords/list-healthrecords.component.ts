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
  players: Player[] = [];
  searchTerm: string = '';
  selectedPlayer: string = 'all'; // 'all' signifie tous les joueurs

  constructor(
    private healthRecordService: HealthRecordService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.fetchHealthRecords();
    this.fetchPlayers();
  }

  /**
   * Récupère tous les Health Records
   */
  fetchHealthRecords(): void {
    this.healthRecordService.getAllHealthRecords().subscribe({
      next: (records) => {
        this.healthRecords = records;
        this.filteredRecords = records;
        console.log("📋 Health Records récupérés :", this.healthRecords);
      },
      error: (err) => console.error("❌ Erreur lors de la récupération des Health Records :", err)
    });
  }

  /**
   * Récupère tous les joueurs et les trie par ordre alphabétique
   */
  fetchPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (players) => {
        this.players = players.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log("🎯 Joueurs récupérés :", this.players);
      },
      error: (err) => console.error("❌ Erreur lors de la récupération des joueurs :", err)
    });
  }

  /**
   * Supprime un Health Record avec confirmation
   */
  deleteHealthRecord(id?: number): void {
    if (!id) return; // Vérification pour éviter les erreurs
    if (confirm('⚠️ Voulez-vous vraiment supprimer ce Health Record ?')) {
      this.healthRecordService.deleteHealthRecord(id).subscribe({
        next: () => this.fetchHealthRecords(),
        error: (err) => console.error(`❌ Erreur lors de la suppression du Health Record ID ${id} :`, err)
      });
    }
  }

  /**
   * Filtre les Health Records en fonction du joueur sélectionné et du texte recherché
   */
  filterRecords(): void {
    this.filteredRecords = this.healthRecords.filter(record => {
      const playerFullName = `${record.player?.firstName ?? ''} ${record.player?.lastName ?? ''}`.toLowerCase();
      const matchesSearch = playerFullName.includes(this.searchTerm.toLowerCase()) ||
                            record.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            record.statusJoueur.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesPlayer = this.selectedPlayer === 'all' || record.player?.id === +this.selectedPlayer;

      return matchesSearch && matchesPlayer;
    });
  }
}
