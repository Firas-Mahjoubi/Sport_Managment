import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthRecordService } from '../../services/health-record.service';
import { HealthRecord } from '../../models/HealthRecord';

@Component({
  selector: 'app-edit-healthrecord',
  templateUrl: './edit-healthrecord.component.html',
  styleUrls: ['./edit-healthrecord.component.css']
})
export class EditHealthrecordComponent implements OnInit {
  editForm!: FormGroup;
  recordId!: number;
  isLoading: boolean = true;
  errorMessage: string = '';

  // Définition des valeurs ENUM
  fatigueEnum = ['FAIBLE', 'MOYENNE', 'ELEVEE'];
  etatPhysiqueEnum = ['BON', 'MOYEN', 'MAUVAIS'];
  douleursEnum = ['AUCUNE', 'LEGERE', 'MODEREE', 'SEVERE'];
  intensiteEnum = ['FAIBLE', 'MOYENNE', 'FORTE'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private healthRecordService: HealthRecordService
  ) {}

  ngOnInit(): void {
    // Vérification et récupération de l'ID depuis l'URL
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) {
      this.errorMessage = "❌ ID invalide.";
      this.isLoading = false;
      return;
    }

    this.recordId = +paramId;
    this.initForm();
    this.loadHealthRecord();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required], // 🔒 Désactivé
      date: ['', Validators.required],
      fatigue: ['', Validators.required],
      etatPhysique: ['', Validators.required],
      douleursMusculaires: ['', Validators.required],
      intensite: ['', Validators.required],
      statusJoueur: ['', Validators.required],
      commentaire: ['']
    });
  }

  loadHealthRecord(): void {
    this.healthRecordService.getHealthRecordById(this.recordId).subscribe({
      next: (record) => {
        if (!record) {
          this.errorMessage = "❌ Aucune donnée trouvée.";
          return;
        }
        this.editForm.patchValue(record);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
        this.errorMessage = "❌ Impossible de charger les données.";
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.errorMessage = "❌ Veuillez remplir tous les champs requis.";
      return;
    }

    this.healthRecordService.updateHealthRecord(this.recordId, this.editForm.value).subscribe({
      next: () => {
        alert('✅ Modification réussie !');
        this.router.navigate(['/health/health-records']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        this.errorMessage = "❌ Échec de la mise à jour.";
      }
    });
  }
}
