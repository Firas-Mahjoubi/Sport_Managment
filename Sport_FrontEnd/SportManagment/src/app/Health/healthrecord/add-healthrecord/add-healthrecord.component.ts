import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DouleursMusculaires, EtatPhysique, Fatigue, HealthRecord, Intensite, StatusJoueur } from '../../models/HealthRecord';
import { HealthRecordService } from '../../services/health-record.service';


@Component({
  selector: 'app-add-healthrecord',
  templateUrl: './add-healthrecord.component.html',
  styleUrls: ['./add-healthrecord.component.css']
})
export class AddHealthrecordComponent {
  healthRecord: HealthRecord = {
    name: '',
    date: '',
    fatigue: Fatigue.FAIBLE,
    etatPhysique: EtatPhysique.EXCELLENT,
    douleursMusculaires: DouleursMusculaires.AUCUNE,
    intensite: Intensite.BASSE,
    statusJoueur: StatusJoueur.ACTIF,
    commentaire: ''
  };

  // Options des énumérations pour les <select>
  fatigueLevels = Object.values(Fatigue);
  etatPhysiqueLevels = Object.values(EtatPhysique);
  douleursMusculairesLevels = Object.values(DouleursMusculaires);
  intensiteLevels = Object.values(Intensite);
  statusJoueurLevels = Object.values(StatusJoueur);

  constructor(private healthRecordService: HealthRecordService, private router: Router) {}


  onSubmit() {
    console.log('📤 Données envoyées :', this.healthRecord); // 🔍 Debug

    this.healthRecordService.createHealthRecord(1, this.healthRecord).subscribe({
      next: () => {
        console.log('✅ Health Record ajouté avec succès');
        this.router.navigate(['/health/health-records']);
      },
      error: (err) => console.error('❌ Erreur lors de l\'ajout :', err)
    });
  }

}
