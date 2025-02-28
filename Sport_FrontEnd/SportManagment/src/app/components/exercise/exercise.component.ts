import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { TagService } from '../../services/tag.service';


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  exercises: any[] = [];
  tags: any[] = [];
  selectedTags: number[] = [];


  newExercise: any = {
    name: '',
    description: '',
    visibility: 'PUBLIC',
    fitnessLevel: 50,  // Valeur par défaut au milieu
    techniqueLevel: 50,
    tacticLevel: 50,
    mainFocus: '',
    ageGroup: [],
    groupSize: 1,       // Par défaut 1
    durationMinutes: 10, // Ajouté
    imageUrl: '',       // Ajouté (NULL dans la BDD)
    tags: []    // Liste des tags sélectionnés
  };


  constructor(
    private exerciseService: ExerciseService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.loadExercises();
    this.loadTags();
    
  }

  // ✅ Charger tous les exercices
  loadExercises(): void {
    this.exerciseService.getAllExercises().subscribe(
      (data) => { this.exercises = data; },
      (error) => { console.error('Erreur chargement exercices:', error); }
    );
  }

  // ✅ Charger tous les tags
  loadTags(): void {
    this.tagService.getAllTags().subscribe(
      (data) => { this.tags = data; },
      (error) => { console.error('Erreur chargement tags:', error); }
    );
  }

  addExercise(): void {
    if (!Array.isArray(this.selectedTags)) {
      this.selectedTags = [];  // ✅ Fix: Always make it an array
    }

    this.newExercise.tags = this.selectedTags.map(id => ({ id })); // ✅ Transform tag IDs

    this.exerciseService.createExercise(this.newExercise).subscribe(
      () => {
        this.loadExercises(); // Reload exercises list
        this.resetForm();
      },
      (error) => {
        console.error('Error adding exercise:', error);
      }
    );
  }

  

  // ✅ Réinitialiser le formulaire après ajout
  resetForm(): void {
    this.newExercise = {
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
      tags: [],
    };
    this.selectedTags = [];
  }
}
