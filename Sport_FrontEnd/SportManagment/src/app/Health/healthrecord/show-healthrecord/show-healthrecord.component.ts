import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthRecordService } from '../../services/health-record.service';
import { HealthRecord } from '../../models/HealthRecord';

@Component({
  selector: 'app-show-healthrecord',
  templateUrl: './show-healthrecord.component.html',
  styleUrls: ['./show-healthrecord.component.css']
})
export class ShowHealthrecordComponent implements OnInit {
  healthRecord!: HealthRecord;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private healthRecordService: HealthRecordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Récupérer l'ID depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getHealthRecord(+id);
    } else {
      this.errorMessage = "ID non valide !";
      this.loading = false;
    }
  }

  // ✅ Récupération des données du HealthRecord
  getHealthRecord(id: number): void {
    this.healthRecordService.getHealthRecordById(id).subscribe({
      next: (record) => {
        this.healthRecord = record;
        this.loading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération du HealthRecord", err);
        this.errorMessage = "Erreur lors de la récupération des données.";
        this.loading = false;
      }
    });
  }

  // ✅ Retour à la liste des HealthRecords
  goBack(): void {
    this.router.navigate(['/health/health-records']);
  }
}
