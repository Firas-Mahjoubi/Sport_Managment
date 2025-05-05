import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { HealthRecordService } from '../services/health-record.service';
import { Player } from '../models/player';
import { EtatPhysique, HealthRecord } from '../models/HealthRecord';

@Component({
  selector: 'app-player-terrain-selector',
  templateUrl: './player-terrain-selector.component.html',
  styleUrls: ['./player-terrain-selector.component.css']
})
export class PlayerTerrainSelectorComponent implements OnInit {
  players: Player[] = [];
  healthRecords: HealthRecord[] = [];

  /** Notes et statuts pré‑calculés pour chaque joueur (par id) */
  playerNotes: { [playerId: number]: number } = {};
  playerStatus: { [playerId: number]: string } = {};

  /** Joueurs affichables dans la popup de sélection */
  availablePlayers: Player[] = [];

  /** Joueurs choisis pour chaque position */
  selectedPlayers: { [posKey: string]: Player } = {};

  selectedPosition: any = null;
  showPlayerPopup = false;

  /** Note globale de l’équipe (moyenne des notes >0) */
  teamGlobalNote = 0;

  positions = [
    { key: 'lw', label: 'LW', class: 'lw' },
    { key: 'st', label: 'ST', class: 'st' },
    { key: 'rw', label: 'RW', class: 'rw' },
    { key: 'cm1', label: 'CM1', class: 'cm1' },
    { key: 'cm2', label: 'CM2', class: 'cm2' },
    { key: 'cm3', label: 'CM3', class: 'cm3' },
    { key: 'cb1', label: 'CB1', class: 'cb1' },
    { key: 'cb2', label: 'CB2', class: 'cb2' },
    { key: 'lb', label: 'LB', class: 'lb' },
    { key: 'rb', label: 'RB', class: 'rb' },
    { key: 'gk', label: 'GK', class: 'gk' }
  ];

  constructor(
    private playerService: PlayerService,
    private healthRecordService: HealthRecordService
  ) {}

  ngOnInit(): void {
    // 1) Charger joueurs puis health records
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;

      this.healthRecordService.getAllHealthRecords().subscribe(records => {
        this.healthRecords = records;

        // 2) Pré-calculer note & statut pour chaque joueur
        this.players.forEach(p => {
          const hr = this.healthRecords.find(r =>
            r.name.toLowerCase().includes(p.firstName.toLowerCase()) &&
            r.name.toLowerCase().includes(p.lastName.toLowerCase())
          );
          if (hr) {
            this.playerNotes[p.id] = this.calculateNote(hr);
            this.playerStatus[p.id] =
              hr.etatPhysique === EtatPhysique.BLESSE ? 'Blessé' : '';
          } else {
            this.playerNotes[p.id] = 0;
            this.playerStatus[p.id] = 'Aucun enregistrement';
          }
        });
      });
    });
  }

  /** Ouvre la popup pour une position donnée */
  selectPosition(pos: any) {
    this.selectedPosition = pos;
    this.availablePlayers = this.players.filter(p =>
      p.position.toUpperCase() === pos.label
    );
    this.showPlayerPopup = true;
  }

  /** Assigne un joueur à la position sélectionnée */
  assignPlayerToPosition(player: Player) {
    if (this.selectedPosition) {
      this.selectedPlayers[this.selectedPosition.key] = player;
      this.updateTeamGlobalNote();
    }
    this.closePopup();
  }

  removePlayer(slotKey: string) {
    delete this.selectedPlayers[slotKey];
    this.updateTeamGlobalNote();
  }

  closePopup() {
    this.showPlayerPopup = false;
    this.selectedPosition = null;
  }

  resetFormation() {
    this.selectedPlayers = {};
    this.teamGlobalNote = 0;
  }

  /** Calcule la note 0–100 d’un HealthRecord */
  private calculateNote(hr: HealthRecord): number {
    if (hr.etatPhysique === EtatPhysique.BLESSE) return 0;
    const e = this.mapValue(hr.etatPhysique);
    const f = this.mapValue(hr.fatigue);
    const d = this.mapValue(hr.douleursMusculaires);
    return Math.round(0.5 * e + 0.25 * f + 0.25 * d);
  }

  private mapValue(val: string): number {
    const m: Record<string, number> = {
      'EXCELLENT': 100, 'BON': 80, 'MOYEN': 60, 'FATIGUE': 30, 'BLESSE': 0,
      'FAIBLE': 100, 'MOYENNE': 60, 'ELEVEE': 20,
      'AUCUNE': 100, 'LEGERES': 70, 'MODEREES': 40, 'SEVERES': 10,
    };

    const normalized = val?.toUpperCase().trim();
    return m[normalized] ?? 50;
  }
  /** Moyenne des notes >0 des joueurs sélectionnés */
  updateTeamGlobalNote(): void {
    const notes = Object.values(this.selectedPlayers)
      .map(p => this.playerNotes[p.id] || 0)
      .filter(n => n > 0);
    this.teamGlobalNote = notes.length
      ? Math.round(notes.reduce((a, b) => a + b, 0) / notes.length)
      : 0;
  }

  getProgressColor(note: number): string {
    if (note >= 80) return 'green';
    if (note >= 50) return 'orange';
    return 'red';
  }

  getPlayerStatus(id: number): string {
    return this.playerStatus[id] || '';
  }

  isPlayerDisabled(id: number): boolean {
    const s = this.getPlayerStatus(id);
    return s === 'Blessé' || s === 'Aucun enregistrement';
  }

  /**
   * vrai si note<40 et pas déjà blessé
   */
  isAtRisk(playerId: number): boolean {
    return (
      this.playerStatus[playerId] !== 'Blessé' &&
      (this.playerNotes[playerId] || 0) < 40
    );
  }
}
