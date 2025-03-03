import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { TagService } from '../../services/tag.service';
@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit {
  exerciseId: number | null = null;  // If null, it's add mode; otherwise, edit mode
  tags: any[] = [];
  selectedTags: number[] = [];
  isEditing: boolean = false;
 
  exercise: any = {
    name: '',
    visibility: 'PUBLIC',
    description: '',
    fitnessLevel: 50,
    techniqueLevel: 50,
    tacticLevel: 50,
    mainFocus: '',
    ageGroup: '',
    groupSize: 1,
    durationMinutes: 10,
    imageUrl: '',
    tags: []
  };

  constructor(
    private exerciseService: ExerciseService,
    private tagService: TagService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTags();
    this.checkEditMode();
  }

  // ✅ Load Tags from Backend
  loadTags(): void {
    this.tagService.getAllTags().subscribe(
      (data) => { this.tags = data; },
      (error) => { console.error('Error loading tags:', error); }
    );
  }

  // ✅ Check if we are in Edit Mode
  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.exerciseId = +id;
        this.isEditing = true;
        this.loadExercise(this.exerciseId);
      }
    });
  }

  loadExercise(id: number): void {
    this.exerciseService.getExerciseById(id).subscribe(
      (data) => {
        this.exercise = data;
  
        // ✅ Ensure 'tags' is an array before mapping
        if (data.tags && Array.isArray(data.tags)) {
          this.selectedTags = data.tags.map((tag: { id: number }) => tag.id);
        } else {
          this.selectedTags = [];
        }
      },
      (error) => {
        console.error('Error loading exercise:', error);
      }
    );
  }
  

  // ✅ Save or Update Exercise
  saveExercise(): void {
    this.exercise.tags = this.selectedTags.map(id => ({ id }));

    if (this.isEditing) {
      this.exerciseService.updateExercise(this.exerciseId!, this.exercise).subscribe(() => {
        alert('Exercise Updated Successfully');
        this.router.navigate(['/exercise-list']);
      });
    } else {
      this.exerciseService.createExercise(this.exercise).subscribe(() => {
        alert('Exercise Created Successfully');
        this.router.navigate(['/exercise-list']);
      });
    }
  }

}
