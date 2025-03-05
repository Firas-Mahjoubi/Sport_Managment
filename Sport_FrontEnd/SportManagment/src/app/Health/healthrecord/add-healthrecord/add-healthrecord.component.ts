import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthRecordService } from '../../services/health-record.service';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { HealthRecord, Fatigue, EtatPhysique, DouleursMusculaires, Intensite, StatusJoueur } from '../../models/HealthRecord';

@Component({
  selector: 'app-add-healthrecord',
  templateUrl: './add-healthrecord.component.html',
  styleUrls: ['./add-healthrecord.component.css']
})
export class AddHealthrecordComponent implements OnInit {
  players: Player[] = [];
  addForm: FormGroup;  // ✅ Utilisation de FormGroup pour gérer les validations

  Fatigue = Fatigue;
  EtatPhysique = EtatPhysique;
  DouleursMusculaires = DouleursMusculaires;
  Intensite = Intensite;
  StatusJoueur = StatusJoueur;

  constructor(
    private fb: FormBuilder,
    private healthRecordService: HealthRecordService,
    private playerService: PlayerService,
    private router: Router
  ) {
    // ✅ Initialisation du formulaire avec validation
    this.addForm = this.fb.group({
      player: [null, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      date: ['', Validators.required],
      fatigue: [Fatigue.MOYENNE, Validators.required],
      etatPhysique: [EtatPhysique.EXCELLENT, Validators.required],
      douleursMusculaires: [DouleursMusculaires.AUCUNE, Validators.required],
      intensite: [Intensite.MOYENNE, Validators.required],
      statusJoueur: [StatusJoueur.ACTIF, Validators.required],
      commentaire: ['']
    });
  }

  ngOnInit(): void {
    this.playerService.getPlayersWithoutHealthRecord().subscribe(players => {
      console.log("Joueurs reçus :", players);
      this.players = players;
    });
  }

  // ✅ Mettre à jour automatiquement le nom
  updateName(): void {
    const selectedPlayer = this.addForm.get('player')?.value;
    if (selectedPlayer) {
      this.addForm.get('name')?.setValue(`${selectedPlayer.firstName} ${selectedPlayer.lastName}`);
    } else {
      this.addForm.get('name')?.setValue('');
    }
  }

  // ✅ Vérification avant soumission
  onSubmit(): void {
    if (this.addForm.invalid) {
      console.error("Formulaire invalide !");
      return;
    }

    const healthRecordData = this.addForm.getRawValue();
    const playerId = healthRecordData.player.id;

    this.healthRecordService.createHealthRecord(playerId, healthRecordData)
      .subscribe(() => {
        console.log("Health Record ajouté !");
          // ✅ Redirection après le succès
      this.router.navigate(['/health/health-records']);
      });
  }
}
