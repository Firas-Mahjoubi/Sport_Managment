import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  player: Player = {  firstName: '', 
    lastName: '', 
    position: '', 
    playerNumber: 0, 
    performanceStats: '', 
    birthDate: '',  // ✅ Nouveau champ
    imageUrl: '',   // ✅ Nouveau champ
    status: 'Available', // ✅ Nouveau champ (par défaut "Available")
    teamId: 1 };

  constructor(private playerService: PlayerService) {}
  resetForm(): void {
    this.player = { 
      firstName: '', 
      lastName: '', 
      position: '', 
      playerNumber: 0, 
      performanceStats: '', 
      birthDate: '',  // ✅ Nouveau champ
      imageUrl: '',   // ✅ Nouveau champ
      status: 'Available', // ✅ Nouveau champ (par défaut "Available")
      teamId: 1 
    };
  }
  
  addPlayer(): void {
    console.log("✅ Button clicked! Player sent:", this.player); // 🔥 Vérification
  
    if (!this.player.firstName || !this.player.lastName || !this.player.position) {
      alert("❌ Please fill in all fields!");
      return;
    }
  
    this.playerService.create(this.player).subscribe({
      next: (response) => {
        console.log("✅ Player added successfully:", response);
        alert("✅ Player added successfully!");
        this.resetForm();
      },
      error: (err) => {
        console.error("❌ Error adding player:", err);
        alert("❌ An error has occurred !");
      }
    });
  }
  

  
}
