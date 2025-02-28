import { Component, OnInit } from '@angular/core';
import { InjuryService } from '../services/injury.service';


@Component({
  selector: 'app-list-injury-archive',
  templateUrl: './list-injury-archive.component.html',
  styleUrls: ['./list-injury-archive.component.css']
})
export class ListInjuryArchiveComponent implements OnInit {
  archivedInjuries: any[] = [];

  constructor(private injuryService: InjuryService) {}

  ngOnInit(): void {
    this.loadArchivedInjuries();
  }


  

  loadArchivedInjuries(): void {
    this.injuryService.getArchivedInjuries().subscribe({
      next: (data) => this.archivedInjuries = data,
      error: (err) => console.error("Erreur lors du chargement des blessures archivées", err)
    });
  }
}
