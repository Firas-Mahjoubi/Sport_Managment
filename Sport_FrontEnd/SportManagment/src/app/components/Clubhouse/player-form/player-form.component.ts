import { Component, OnInit } from '@angular/core';
import { PlayerRequest, PlayerService } from '../../../services/player.service';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/services/club.service';



@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {

  clubs: Club[] = []; // ✅ Liste des clubs
  categories: string[] = ['SENIOR', 'JUNIOR', 'U18', 'U15'];

  

  player: PlayerRequest = {
    firstName: '',
    lastName: '',
    position: '',
    playerNumber: 0,
    performanceStats: '',
    birthDate: '',
    imageUrl: null as any,
    clubId: 0,
    category: ''  // ✅ Ajout du champ "category"
    

    
    
  };

  constructor(private playerService: PlayerService, private clubService: ClubService // 🆕 Ajout
  ) {}

  ngOnInit(): void {
    this.clubService.getAll().subscribe({
      next: (data) => {
        this.clubs = data;
      },
      error: (err) => {
        console.error("❌ Failed to load clubs:", err);
      }
    });
    
  }
  
  // ✅ Gère l'import de fichier image
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.player.imageUrl = file;
    }
  }

  // ✅ Envoie le joueur au backend via PlayerService
  addPlayer(): void {
    if (!this.player.firstName || !this.player.lastName || !this.player.position) {
      alert('Please fill in all required fields.');
      return;
    }

    if (this.player.imageUrl) {
      this.playerService.addPlayer(this.player).subscribe({
        next: () => {
          console.log(this.player);
          alert('✅ Player added successfully!');
          this.resetForm();
        },
        error: () => {
          alert('❌ Failed to add player.');
        }
      });
    } else {
      alert('❌ Please upload a player image.');
    }
  }

  // ✅ Réinitialise le formulaire
  resetForm(): void {
    this.player = {
      firstName: '',
      lastName: '',
      position: '',
      birthDate: '',
      playerNumber: 0,
      performanceStats: '',
      imageUrl: null as any,
      clubId: 0,
      category: ''  // ✅ Réinitialise le champ "category"
      

    };
  }
}
