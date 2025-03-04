import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
})
export class ExerciseFormComponent implements OnInit, AfterViewInit {
  exerciseId: number | null = null;
  tags: any[] = [];
  selectedTags: number[] = [];
  isEditing: boolean = false;
  isSubmitting: boolean = false;  // ✅ Prevents double submission

  @ViewChild('successModal') successModal!: ElementRef;

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

  ngAfterViewInit(): void {
    if (!this.successModal) {
      console.error('Success modal element not found.');
    }
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

  // ✅ Save or Update Exercise (Fixed duplicate submission issue)
  saveExercise(): void {
    if (this.isSubmitting) return;  // ✅ Prevent multiple submissions
    this.isSubmitting = true;

    this.exercise.tags = this.selectedTags.map(id => ({ id }));

    if (this.isEditing) {
      this.exerciseService.updateExercise(this.exerciseId!, this.exercise).subscribe(() => {
        this.showModal();
        setTimeout(() => {
          this.hideModal();
          this.router.navigate(['/exercise-list']);
          this.isSubmitting = false; // ✅ Reset submission state
        }, 2000);
      });
    } else {
      this.exerciseService.createExercise(this.exercise).subscribe(() => {
        this.showModal();
        setTimeout(() => {
          this.hideModal();
          this.router.navigate(['/exercise-list']);
          this.isSubmitting = false; // ✅ Reset submission state
        }, 2000);
      });
    }
  }

  showModal() {
    if (this.successModal) {
      this.successModal.nativeElement.style.display = 'block';
    }
  }

  hideModal() {
    if (this.successModal) {
      this.successModal.nativeElement.style.display = 'none';
    }
  }
}
