import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TacticService, Tactic } from '../../services/tactic.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateTacticDialogComponent } from '../create-tactic-dialog/create-tactic-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tactic-list',
  templateUrl: './tactic-list.component.html',
  styleUrls: ['./tactic-list.component.css']
})
export class TacticListComponent implements OnInit {
  tactics: Tactic[] = [];
  filteredTactics: Tactic[] = [];
  searchQuery: string = "";
  currentPage: number = 1; // Start at page 1
  itemsPerPage: number = 8; // Set the number of items per page

  constructor(
    private tacticService: TacticService,
    private router: Router,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTacticsByUser();
  }

  loadTacticsByUser(): void {
    const userId = localStorage.getItem('userId');  // Retrieve the userId from localStorage

    if (!userId) {
      console.error('User ID is not found in localStorage');
      return;
    }

    this.tacticService.getTacticsByUserId(Number(userId)).subscribe((data) => {
      this.tactics = data;
      this.filteredTactics = [...this.tactics]; // Refresh displayed tactics
      console.log("Loaded tactics:", this.tactics);
      this.cdRef.detectChanges(); // Ensure UI updates
      this.updatePagination();
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.filteredTactics = this.tactics.slice(start, end); // Apply pagination to filtered list
  }

  trackById(index: number, tactic: Tactic): number {
    return tactic.id!;
  }

  openTacticFolder(id: number): void {
    window.location.href = `http://localhost:3000/tactics-board`;
  }
  

  deleteTactic(id: number): void {
    if (confirm("Are you sure you want to delete this tactic?")) {
      this.tacticService.deleteTactic(id).subscribe(() => {
        this.loadTacticsByUser(); // Refresh the full list instead of filtering manually
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
    this.updatePagination(); // Apply pagination after filtering
  }

  renameTactic(tactic: Tactic): void {
    const newName = prompt("Enter new name:", tactic.name);
    if (newName && newName !== tactic.name) {
      const updatedTactic = { ...tactic, name: newName };
      this.tacticService.updateTactic(tactic.id!, updatedTactic).subscribe(() => {
        this.loadTacticsByUser(); // Reload list instead of manually updating
      });
    }
  }

  moveTactic(tactic: Tactic): void {
    alert("Moving tactic is not yet implemented!");
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateTacticDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
      if (result) {
        const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage

        if (!userId) {
          console.error('User ID is not found in localStorage');
          return; // Exit if userId is not available
        }

        const newTactic: Tactic = {
          name: result.name,
          description: result.description || "",
          formation: result.formation || "",
          trainingFocus: result.trainingFocus || "",
          teamId: 1, // Replace with actual team ID
          userId: userId // Add userId to the new tactic
        };

        console.log("Creating tactic:", newTactic);

        this.tacticService.createTactic(newTactic, newTactic.teamId!, userId).subscribe(() => {
          this.loadTacticsByUser(); // Refresh the list
        });
      }
    });
  }
  

  nextPage(): void {
    this.currentPage++;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  isChatOpen: boolean = false;

  // Method to open the chat window (toggle visibility)
  openChat() {
    this.isChatOpen = true;
  }

  // Close the chat window
  closeChat() {
    this.isChatOpen = false;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Toggle the chat window visibility
  }
}
