import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin-substitution',
  templateUrl: './admin-substitution.component.html',
  styleUrls: ['./admin-substitution.component.css']
})
export class AdminSubstitutionComponent implements OnInit {
  substitutions: any[] = [];
  matchId!: number; // Retrieved dynamically from route
  substitutionForm: FormGroup;
  errorMessage: string | null = null; // To show errors in UI
  successMessage: string | null = null; // Success message
  private baseUrl = 'http://localhost:8088/api/matches/substitutions';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.substitutionForm = this.fb.group({
      playerInNumber: [null, Validators.required],
      playerOutNumber: [null, Validators.required],
      timing: [null, Validators.required],
      isHomeTeam: [true, Validators.required] // Default value
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('matchId');
      if (id) {
        this.matchId = +id;
        this.getSubstitutions();
      }
    });
  }

  getSubstitutions(): void {
    this.http.get<any[]>(`${this.baseUrl}/getSubstitution/${this.matchId}`)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error fetching substitutions.';
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe(data => {
        this.substitutions = data.map(sub => ({
          id: sub.id,
          minuteOfPlay: sub.minuteOfPlay,
          playerIn: `${sub.playerInFirstName} ${sub.playerInLastName}`, // Combine first & last name
          playerOut: `${sub.playerOutFirstName} ${sub.playerOutLastName}`, // Combine first & last name
          homeTeam: sub.homeTeam
        }));

        console.log('Updated Substitutions:', this.substitutions);
      });
  }


  addSubstitution(): void {
    if (this.substitutionForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const substitutionData = this.substitutionForm.value;
    const url = `${this.baseUrl}/createSubstitution/${this.matchId}`;

    const params = new HttpParams()
      .set('minuteOfPlay', substitutionData.timing)
      .set('playerInNumber', substitutionData.playerInNumber)
      .set('playerOutNumber', substitutionData.playerOutNumber)
      .set('isHomeTeam', substitutionData.isHomeTeam.toString());

    this.http.post(url, {}, { params })
      .pipe(
        catchError(error => {
          this.errorMessage = 'Error adding substitution.';
          console.error('Error:', error);
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.getSubstitutions();
        this.substitutionForm.reset({ isHomeTeam: true }); // Reset form and keep default
        this.errorMessage = null; // Clear errors
        this.successMessage = 'Substitution added successfully!';

        setTimeout(() => this.successMessage = null, 3000); // Hide after 3 sec
      });
  }

  deleteSubstitution(subId: number) {
    this.http.delete(`http://localhost:8088/api/matches/substitutions/deleteSubstitution/${subId}`, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log(response); // Log the response for debugging
          this.successMessage = "Substitution deleted successfully!";
          this.substitutions = this.substitutions.filter(sub => sub.id !== subId);

          // Hide the success message after 3 seconds
          setTimeout(() => {
            this.successMessage = "";
          }, 3000);
        },
        error: (error) => {
          console.error("Error deleting substitution:", error);
          this.errorMessage = "Failed to delete substitution.";

          // Hide the error message after 3 seconds
          setTimeout(() => {
            this.errorMessage = "";
          }, 3000);
        }
      });
  }


}
