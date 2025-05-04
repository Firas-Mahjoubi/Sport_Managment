import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Player } from '../models/player';
import { Injury, Severity, Status, ZoneAffectee, Type } from '../models/injury';
import { InjuryService } from '../services/injury.service';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-injury-add',
  templateUrl: './injury-add.component.html',
  styleUrls: ['./injury-add.component.css']
})
export class InjuryAddComponent implements OnInit {
  injuryForm!: FormGroup;
  players: Player[] = [];

  types = Object.values(Type);
  severities = Object.values(Severity);
  zones = Object.values(ZoneAffectee);
  statuses = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private injuryService: InjuryService,
    private playerService: PlayerService,
    private router: Router // 🔥 Injection du Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPlayers();
  }

  initForm(): void {
    this.injuryForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      severity: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      zoneAffectee: ['', Validators.required],
      cause: ['', Validators.required],
      player: ['', Validators.required] // Sélection dynamique du joueur
    });
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe(
      (players: Player[]) => {
        this.players = players;
        console.log("Joueurs récupérés :", this.players);
      },
      (error: any) => {
        console.error("Erreur lors du chargement des joueurs", error);
      }
    );
  }


  submitForm(): void {
    if (this.injuryForm.valid) {
      console.log("Formulaire soumis :", this.injuryForm.value);

      const selectedPlayer = this.players.find(p => p.id === Number(this.injuryForm.value.player)); // ✅ Convertir en `number`
      console.log("Joueur sélectionné :", selectedPlayer);

      if (!selectedPlayer) {
        alert("Erreur : Aucun joueur sélectionné !");
        return; // 🛑 Arrête l'exécution si le joueur est null
      }

      const newInjury: Injury = {
        ...this.injuryForm.value,
        player: selectedPlayer
      };

      this.injuryService.addInjury(newInjury).subscribe(() => {
        alert('Blessure ajoutée avec succès !');
        this.router.navigate(['/health/injury']); // 🚀 Redirection automatique
      });
    }
  }

}
