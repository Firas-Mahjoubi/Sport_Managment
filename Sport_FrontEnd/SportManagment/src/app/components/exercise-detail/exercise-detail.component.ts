import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { MediaExercice } from '../../models/media-exercice.model';
import { Exercice } from '../../models/exercice.model';



@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {

  mediaList: MediaExercice[] = [];
  exercise!: Exercice;
  defaultImage: string = 'https://via.placeholder.com/150'; // ✅ Default Image


  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
  ) {}

  ngOnInit() {
    const exerciseId = +this.route.snapshot.params['id'];

    this.exerciseService.getExerciseById(exerciseId).subscribe(ex => {
      this.exercise = ex;
    });

    this.exerciseService.getMediaByExerciseId(exerciseId).subscribe(media => {
      this.mediaList = media;
    });
  }
}
