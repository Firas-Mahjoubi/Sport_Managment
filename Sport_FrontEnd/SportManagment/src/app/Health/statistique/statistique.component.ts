import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player';
import { HealthRecordService } from '../services/health-record.service';
import { HealthRecord } from '../models/HealthRecord';
import { InjuryService } from '../services/injury.service';
import { Injury } from '../models/injury';
import { RecoveryPlanService } from '../services/recovery-plan.service';
import { RecoveryPlan } from '../models/recoveryplan';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})


export class StatistiqueComponent implements OnInit {
  currentSection: string = 'bio'; // Section actuellement active
  players: Player[] = []; // Liste des joueurs à afficher
  selectedPlayer: Player | null = null; // Joueur actuellement sélectionné
  showPlayerList: boolean = false; // Contrôle l'affichage de la liste des joueurs
  recoveryPlans: RecoveryPlan[] = [];

  archivedInjuries: Injury[] = [];     // ← stocker les blessures archivées filtrées

  selectedHealthRecord: HealthRecord | null = null;   // ← nouveau
  injuries: Injury[] = []
  injuryHistory: any[] = []; // Liste des blessures dans l'historique
  showInjuryHistory: boolean = false;
healthRecordItems: any;

  constructor(private playerService: PlayerService,
    private healthService: HealthRecordService  ,
    private injuryService: InjuryService   ,
    private recoveryService: RecoveryPlanService                  // ⬅️ injecte le service
  ) {}

  ngOnInit(): void {
    this.getAllPlayers(); // Appel pour récupérer les joueurs à l'initialisation
    this.selectedPlayer = this.players[0]; // Par défaut, sélectionner le premier joueur de la liste
  }

  toggleSection(section: string) {
    this.currentSection = section;
    this.showPlayerList = false;

    // ➜ Health‑Record Stat
    if (section === 'attributes' && this.selectedPlayer) {
      this.loadHealthRecord(this.selectedPlayer.id);
    }

    // ➜ Injury Stat
    if (section === 'icon' && this.selectedPlayer) {
      this.loadInjuries(this.selectedPlayer.id);             // blessures actives
      this.loadArchivedInjuries(this.selectedPlayer.id);     // blessures archivées
    }


    if (section === 'traits' && this.selectedPlayer) {    // onglet Recovery Plan Stat
      this.loadRecoveryPlans(this.selectedPlayer.id);
    }
  }

  // Récupérer tous les joueurs
  getAllPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data; // Stocke les joueurs récupérés
        console.log('Players:', this.players); // Affiche les joueurs dans la console
        if (!this.selectedPlayer) {
          this.selectedPlayer = this.players[0]; // Sélectionne un joueur par défaut si aucun n'est sélectionné
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des joueurs :', err);
      }
    });
  }

  // Afficher ou masquer la liste des joueurs
  togglePlayerList(): void {
    this.showPlayerList = !this.showPlayerList;
  }

  // Sélectionner un joueur de la liste
  selectPlayer(player: Player): void {
    this.selectedPlayer = player;
    this.showPlayerList = false; // Fermer la liste après sélection
    this.loadHealthRecord(player.id);
    this.loadInjuries(player.id);
    this.loadArchivedInjuries(player.id);    // ← charge aussi l’historique
    this.loadRecoveryPlans(player.id);
  }


/** nouvelle méthode privée */
private loadHealthRecord(playerId: number) {
  this.healthService.getHealthRecordById(playerId).subscribe({
    next: hr  => (this.selectedHealthRecord = hr),
    error: () => (this.selectedHealthRecord = null)
  });
}

private loadInjuries(playerId: number) {
  this.injuryService.getInjuriesByPlayerId(playerId).subscribe({
    next: data => {
      console.log('Injuries loaded:', data);   // debug rapide
      this.injuries = data;
    },
    error: () => this.injuries = []
  });
}


private loadArchivedInjuries(playerId: number) {
  this.injuryService.getArchivedInjuries().subscribe({
    next: all => {
      console.log('archives brutes', all);            // 1) vois ce qui arrive
      this.injuryHistory = all.filter(i => i.player?.id === playerId);
      console.log('archives filtrées', this.injuryHistory); // 2) voyez le résultat
    },
    error: err => {
      console.error('Erreur archives', err);
      this.injuryHistory = [];
    }
  });
}

private loadRecoveryPlans(playerId: number) {
  this.recoveryService.getRecoveryPlansByPlayerId(playerId).subscribe({
    next: data => (this.recoveryPlans = data),
    error: ()  => (this.recoveryPlans = [])
  });
}


}


