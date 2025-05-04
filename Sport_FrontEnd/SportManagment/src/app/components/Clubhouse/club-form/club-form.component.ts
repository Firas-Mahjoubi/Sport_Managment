import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubService } from 'src/app/services/club.service';
import { ActivatedRoute, Router } from '@angular/router';
import { League, LeagueService } from 'src/app/services/league.service';


@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {
  leagues: League[] = [];
  clubForm!: FormGroup;
  selectedImageFile: File | null = null;
  isEditMode = false;
  clubId?: number;

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      stadiumName: ['', Validators.required],
      foundationYear: ['', [Validators.required]],
      leagueId: ['', [Validators.required]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clubId = +id;
      this.clubService.getById(this.clubId).subscribe({
        next: (data) => {
          this.clubForm.patchValue(data);
        },
        error: (err) => {
          console.error("❌ Error retrieving club:", err);
          alert("Error retrieving club!");
        }
      });
    }
    this.leagueService.getAll().subscribe(data => {
      this.leagues = data; // ✅ On récupère les leagues existantes
    });
  }

  /*onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }*/

  saveClub(): void {
    if (this.clubForm.invalid || !this.selectedImageFile) {
      alert("❌ Please fill all fields and upload a logo!");
      return;
    }

    const formData = new FormData();
    formData.append('name', this.clubForm.get('name')?.value);
    formData.append('location', this.clubForm.get('location')?.value);
    formData.append('stadiumName', this.clubForm.get('stadiumName')?.value);
    formData.append('foundationYear', this.clubForm.get('foundationYear')?.value);
    formData.append('imageUrl1', this.selectedImageFile); // ✅ correspond à backend
    formData.append('leagueId', this.clubForm.get('leagueId')?.value);

    if (this.isEditMode && this.clubId) {
      this.clubService.update(this.clubId, formData).subscribe({
        next: () => {
          alert("✅ Club updated successfully!");
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          console.error("❌ Update error:", err);
          alert("❌ Failed to update club.");
        }
      });
    } else {
      this.clubService.addClub(formData).subscribe({
        next: () => {
          alert("✅ Club added successfully!");
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          console.error("❌ Creation error:", err);
          alert("❌ Failed to add club.");
        }
      });
    }
  }

  imagePreview: string | ArrayBuffer | null = null;

onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}

}
