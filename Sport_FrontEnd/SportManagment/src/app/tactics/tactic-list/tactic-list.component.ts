import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TacticService, Tactic } from '../../services/tactic.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateTacticDialogComponent } from '../create-tactic-dialog/create-tactic-dialog.component';
import { take } from 'rxjs/operators';
// import { AppHeaderComponent } from '../header/app-header.component'; // Adjust the path as necessary
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
      this.filteredTactics = [...this.tactics]; // Refresh displayed tactics
      console.log("Loaded tactics:", this.tactics);
      this.cdRef.detectChanges(); // Ensure UI updates
    });
  }

  trackById(index: number, tactic: Tactic): number {
    return tactic.id!;
  }

  openTacticFolder(id: number): void {
    this.router.navigate([`/tactics/${id}`]);
  }

  deleteTactic(id: number): void {
    if (confirm("Are you sure you want to delete this tactic?")) {
      this.tacticService.deleteTactic(id).subscribe(() => {
        this.loadTactics(); // Refresh the full list instead of filtering manually
      });
    }
  }

  filterTactics(): void {
    const query = this.searchQuery.toLowerCase().trim();
    console.log("Search Query:", query);

    if (query === '') {
      this.filteredTactics = [...this.tactics]; // Reset when empty
    } else {
      this.filteredTactics = this.tactics.filter(tactic =>
        tactic.name.toLowerCase().includes(query) // Ensure case-insensitive filtering
      );
    }

    this.cdRef.detectChanges(); // Force UI update
  }

  renameTactic(tactic: Tactic): void {
    const newName = prompt("Enter new name:", tactic.name);
    if (newName && newName !== tactic.name) {
      const updatedTactic = { ...tactic, name: newName };
      this.tacticService.updateTactic(tactic.id!, updatedTactic).subscribe(() => {
        this.loadTactics(); // Reload list instead of manually updating
      });
    }
  }

  copyTactic(tactic: Tactic): void {
    const copiedTactic = { ...tactic, id: undefined, name: tactic.name + " - Copy" };
    this.tacticService.createTactic(copiedTactic, copiedTactic.teamId!).subscribe(() => {
      this.loadTactics(); // Reload list to ensure all data is in sync
    });
  }

  moveTactic(tactic: Tactic): void {
    alert("Moving tactic is not yet implemented!");
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTacticDialogComponent, {
      width: '400px',
    });
  
    // Ensure the subscription runs only ONCE
    dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
      if (result) {
        const newTactic: Tactic = {
          name: result.name,
          description: result.description || "",
          formation: result.formation || "",
          trainingFocus: result.trainingFocus || "",
          teamId: 1 // Replace with actual team ID
        };
  
        console.log("Creating tactic:", newTactic);
  
        this.tacticService.createTactic(newTactic, newTactic.teamId!).subscribe(() => {
          this.loadTactics(); // Refresh the list
        });
      }
    });
  }
  
}
