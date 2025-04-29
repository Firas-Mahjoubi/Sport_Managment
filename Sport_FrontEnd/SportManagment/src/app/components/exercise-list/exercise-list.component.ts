import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {
  exercises: any[] = [];
  defaultImage: string = 'https://via.placeholder.com/150'; // ✅ Default Image
  searchQuery: string = '';
  selectedFilter: string = '';
  constructor(private exerciseService: ExerciseService,private sanitizer: DomSanitizer) {
    
  }
  getStars(level: number): SafeHtml {
    const maxStars = 5; // Maximum of 5 stars
    const fullStar = '<i class="fas fa-star text-warning"></i>';
    const emptyStar = '<i class="far fa-star text-warning"></i>';

    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
      stars += i <= Math.round(level / 20) ? fullStar : emptyStar;
    }
    
    return this.sanitizer.bypassSecurityTrustHtml(stars);
  }
  ngOnInit(): void {
    this.loadExercises();
  }

  // ✅ Fetch Exercises
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('Error loading exercises:', error); }
    );
  }

  deleteExercise(id: number): void {
    if (confirm('Are you sure you want to delete this exercise?')) {
      this.exerciseService.deleteExercise(id).subscribe(
        () => {
          alert('Exercise deleted successfully!');
          this.loadExercises(); // Reload list after deletion
        },
        (error) => {
          console.error('Error deleting exercise:', error);
          alert('Failed to delete exercise.');
        }
      );
    }
  }
   // ✅ Filtered Exercises
   filteredExercises(): any[] {
    return this.exercises.filter(exercise => {
      // 🔎 Filter by search query
      const matchesSearch = exercise.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // 📂 Filter by visibility (Public/Private)
      const matchesFilter = this.selectedFilter ? exercise.visibility === this.selectedFilter : true;

      return matchesSearch && matchesFilter;
    });
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
  currentPage: number = 1;
itemsPerPage: number = 3;

get paginatedExercises() {
  const filtered = this.filteredExercises();
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return filtered.slice(start, start + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.filteredExercises().length / this.itemsPerPage);
}

changePage(page: number) {
  this.currentPage = page;
}

}
