import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {
  player: Player = { firstName: '', lastName: '', position: '', playerNumber: 0, performanceStats: '', teamId: 1 };

  constructor(private playerService: PlayerService) {}
  resetForm(): void {
    this.player = { 
      firstName: '', 
      lastName: '', 
      position: '', 
      playerNumber: 0, 
      performanceStats: '', 
      teamId: 1 
    };
  }
  
  addPlayer(): void {
    console.log("✅ Button clicked! Envoi du joueur:", this.player); // 🔥 Vérification
  
    if (!this.player.firstName || !this.player.lastName || !this.player.position) {
      alert("❌ Veuillez remplir tous les champs !");
      return;
    }
  
    this.playerService.create(this.player).subscribe({
      next: (response) => {
        console.log("✅ Joueur ajouté avec succès:", response);
        alert("✅ Joueur ajouté avec succès !");
        this.resetForm();
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'ajout du joueur:", err);
        alert("❌ Une erreur est survenue !");
      }
    });
  }
  
}
