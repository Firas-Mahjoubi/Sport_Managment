import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InjuryService } from '../services/injury.service';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/player';
import { Injury, Severity, Status, Type, ZoneAffectee } from '../models/injury';

@Component({
  selector: 'app-injury-edit',
  templateUrl: './injury-edit.component.html',
  styleUrls: ['./injury-edit.component.css']
})
export class InjuryEditComponent implements OnInit {
  injuryForm!: FormGroup;
  injuryId!: number;
  players: Player[] = [];
  injury!: Injury;

  types = Object.values(Type);
  severities = Object.values(Severity);
  statuses = Object.values(Status);
  zones = Object.values(ZoneAffectee);

  constructor(
    private fb: FormBuilder,
    private injuryService: InjuryService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.injuryId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Injury ID récupéré:", this.injuryId); // 👈 DEBUG


    if (!this.injuryId || isNaN(this.injuryId)) {
      alert("ID de blessure invalide !");
      this.router.navigate(['/health/injury']);
      return;
    }

    this.initForm();
    this.loadPlayers();
    this.loadInjury();
  }

  private initForm(): void {
    this.injuryForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      severity: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      zoneAffectee: ['', Validators.required],
      cause: ['', Validators.required],
      player: ['', Validators.required]
    });
  }

  private loadPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: (players) => this.players = players,
      error: (err) => console.error("Erreur lors du chargement des joueurs", err)
    });
  }

  private loadInjury(): void {
    this.injuryService.getInjuryById(this.injuryId).subscribe({
      next: (injury) => {
        this.injury = injury;
        this.injuryForm.patchValue({
          date: injury.date,
          type: injury.type,
          severity: injury.severity,
          description: injury.description,
          status: injury.status,
          zoneAffectee: injury.zoneAffectee,
          cause: injury.cause,
          player: injury.player?.id
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement de la blessure", err);
        this.router.navigate(['/health/injury']);
      }
    });
  }

  onSubmit(): void {
    if (this.injuryForm.invalid) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const updatedInjury: Injury = {
      ...this.injury,
      ...this.injuryForm.value,
      player: this.players.find(p => p.id === +this.injuryForm.value.player) || null
    };

    this.injuryService.updateInjury(this.injuryId, updatedInjury).subscribe({
      next: () => {
        alert("Blessure mise à jour avec succès !");
        this.router.navigate(['/health/injury']);
      },
      error: (err) => console.error("Erreur lors de la mise à jour de la blessure", err)
    });
  }
}
