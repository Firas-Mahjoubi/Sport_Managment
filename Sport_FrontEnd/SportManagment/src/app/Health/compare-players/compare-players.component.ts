import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { HealthRecordService } from '../services/health-record.service';

@Component({
  selector: 'app-compare-players',
  templateUrl: './compare-players.component.html',
  styleUrls: ['./compare-players.component.css']
})
export class ComparePlayersComponent implements OnInit {
  players: any[] = [];
  selected1: any = null;
  selected2: any = null;
  healthRecords1: any = null;
  healthRecords2: any = null;
  note1: number = 0;
  note2: number = 0;
  riskAlert1: boolean = false;
  riskAlert2: boolean = false;
  winner: any = null;
  analysisResult: boolean = false;

  // **NOUVEAU** pour le modal trié
  showSortedList = false;
  sortedPlayers: any[] = [];

  constructor(
    private playerService: PlayerService,
    private healthRecordService: HealthRecordService
  ) {}

  ngOnInit(): void {
    this.playerService.getPlayers().subscribe(list => {
      this.players = list;
      // Pré-charger healthRecord sur chaque joueur
      this.healthRecordService.getAllHealthRecords().subscribe(records => {
        this.players.forEach(p => {
          const hr = records.find(r =>
            r.name.toLowerCase().includes(p.firstName.toLowerCase()) &&
            r.name.toLowerCase().includes(p.lastName.toLowerCase())
          );
          p.healthRecord = hr || null;
        });
      });
    });
  }

  selectPlayer(player: any, slot: number) {
    const loadSlot = slot === 1 ? 'healthRecords1' : 'healthRecords2';
    const noteSlot = slot === 1 ? 'note1' : 'note2';
    const riskSlot = slot === 1 ? 'riskAlert1' : 'riskAlert2';
    this[loadSlot] = null;
    this.healthRecordService.getAllHealthRecords().subscribe(records => {
      const hr = records.find(r =>
        r.name.toLowerCase().includes(player.firstName.toLowerCase()) &&
        r.name.toLowerCase().includes(player.lastName.toLowerCase())
      ) || null;
      this[loadSlot] = hr;
      this[noteSlot] = this.calculateNote(hr);
      this[riskSlot] = hr?.etatPhysique !== 'BLESSE' && this[noteSlot] < 40;
    });
    if (slot === 1) this.selected1 = player; else this.selected2 = player;
  }

  public calculateNote(hr: any): number {
    if (!hr || hr.etatPhysique === 'BLESSE') return 0;
    const e = this.mapValue(hr.etatPhysique);
    const f = this.mapValue(hr.fatigue);
    const d = this.mapValue(hr.douleursMusculaires);
    return Math.round(0.5 * e + 0.25 * f + 0.25 * d);
  }

  private mapValue(val: string): number {
    const m: Record<string, number> = {
      'EXCELLENT': 100,'BON': 80,'MOYEN': 60,'FATIGUE': 30,'BLESSE': 0,
      'FAIBLE': 100,'MOYENNE': 60,'ELEVEE': 20,
      'AUCUNE': 100,'LEGERES': 70,'MODEREES': 40,'SEVERES': 10,
    };
    return m[val?.toUpperCase().trim()] ?? 50;
  }

  analyze() {
    this.analysisResult = true;
    if (this.note1 > this.note2) {
      this.winner = { ...this.selected1, note: this.note1 };
    } else if (this.note2 > this.note1) {
      this.winner = { ...this.selected2, note: this.note2 };
    } else {
      this.winner = null;
    }
  }
  openSortedList() {
    this.sortedPlayers = [...this.players].sort((a, b) => {
      const na = this.calculateNote(a.healthRecord);
      const nb = this.calculateNote(b.healthRecord);
      return nb - na; // Tri décroissant
    });
    this.showSortedList = true;
  }


  closeSortedList() {
    this.showSortedList = false;



  }



}

