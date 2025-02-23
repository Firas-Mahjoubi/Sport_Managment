import { Component, OnInit } from '@angular/core';
import { TacticService, Tactic } from '../../services/tactic.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateTacticDialogComponent } from '../create-tactic-dialog/create-tactic-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-tactic-list',
  templateUrl: './tactic-list.component.html',
  styleUrls: ['./tactic-list.component.css']
})
export class TacticListComponent implements OnInit {
  tactics: Tactic[] = [];
  filteredTactics: Tactic[] = [];
  searchQuery: string = "";

  constructor(
    private tacticService: TacticService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.loadTactics();
  }

  loadTactics(): void {
    this.tacticService.getAllTactics().subscribe((data) => {
      this.tactics = data;
      this.filteredTactics = [...this.tactics]; // Initially show all tactics
      console.log("Loaded tactics:", this.tactics);
    });
  }
  trackById(index: number, tactic: Tactic): number {
    return tactic.id!;
  }
  openTacticFolder(id: number): void {
    this.router.navigate([`/tactics/${id}`]);
 
  }
  deleteTactic(id: number): void {
    if (confirm("Voulez-vous vraiment supprimer ce dossier ?")) {
      this.tacticService.deleteTactic(id).subscribe(() => {
        this.tactics = this.tactics.filter(t => t.id !== id);
      });
    }
  }
  filterTactics(): void {
    const query = this.searchQuery.toLowerCase().trim();
    console.log("Search Query:", query);

    if (query === '') {
      this.filteredTactics = [...this.tactics]; // Reset when empty
      console.log("Reset filter, showing all tactics.");
    } else {
      this.filteredTactics = this.tactics.filter(tactic =>
        tactic.name.toLowerCase().includes(query)  // Ensure case-insensitive filtering
      );
      console.log("Filtered tactics:", this.filteredTactics);
    }

    this.cdRef.detectChanges(); // <-- Force UI update
  }
  renameTactic(tactic: Tactic): void {
    const newName = prompt("Nouveau nom du dossier :", tactic.name);
    if (newName) {
      const updatedTactic = { ...tactic, name: newName };
      this.tacticService.updateTactic(tactic.id!, updatedTactic).subscribe(() => {
        tactic.name = newName;
      });
    }
  }
  copyTactic(tactic: Tactic): void {
    const copiedTactic = { ...tactic, id: undefined, name: tactic.name + " - Copie" };
    this.tacticService.createTactic(copiedTactic, copiedTactic.teamId!).subscribe((newTactic) => {
      this.tactics.push(newTactic);
    });
  }
  moveTactic(tactic: Tactic): void {
    alert("Déplacer la tactique n'est pas encore implémenté !");
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTacticDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe((tacticName) => {
      if (tacticName) {
        const newTactic: Tactic = {
          name: tacticName,
          description: "",
          formation: "",
          trainingFocus: "",
          teamId: 1 // Replace with the actual team ID from user selection
        };
  
        this.tacticService.createTactic(newTactic, newTactic.teamId!).subscribe((createdTactic) => {
          this.tactics.push(createdTactic);
          this.router.navigate([`/tactics/${createdTactic.id}`]); // Open new folder
        });
      }
    });
  }
  
}
