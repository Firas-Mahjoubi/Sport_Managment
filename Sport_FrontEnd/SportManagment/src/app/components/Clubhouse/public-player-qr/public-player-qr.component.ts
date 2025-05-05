import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService, Player } from 'src/app/services/player.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-public-player-qr',
  templateUrl: './public-player-qr.component.html',
  styleUrls: ['./public-player-qr.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PublicPlayerQrComponent implements OnInit {
  @ViewChild('qrCode', { static: false }) qrCodeElement!: ElementRef;

  player?: Player;
  playerDataForQR: string = '';
  loading: boolean = true;
  downloadInProgress: boolean = false;
  clubId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id'));
    if (!playerId) {
      this.router.navigate(['/public-club-players']);
      return;
    }
    
    this.loadPlayerData(playerId);
  }

  loadPlayerData(playerId: number): void {
    this.loading = true;
    this.playerService.getById(playerId).subscribe({
      next: (data) => {
        this.player = data;
        this.clubId = data.club?.id;
        
        // Génération du contenu du QR code avec formatage amélioré
        this.playerDataForQR = this.formatPlayerDataForQR(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading player data:', err);
        this.loading = false;
        this.router.navigate(['/public-club-players']);
      }
    });
  }

  formatPlayerDataForQR(player: Player): string {
    // Organisation plus claire des données pour le QR code
    const playerInfo = [
      `📋 PLAYER INFORMATION`,
      `---------------------------`,
      `👤 Name: ${player.firstName} ${player.lastName}`,
      `🎽 Number: #${player.playerNumber || 'N/A'}`,
      `🏃 Position: ${player.position || 'N/A'}`
    ];
    
    // Ajouter des données optionnelles seulement si elles existent
    if (player.clubName) {
      playerInfo.push(`🏢 Club: ${player.clubName}`);
    }
    
    if (player.teamName) {
      playerInfo.push(`👥 Team: ${player.teamName}`);
    }
    
    if (player.birthDate) {
      playerInfo.push(`🎂 Birth Date: ${player.birthDate}`);
    }
    
    if (player.performanceStats) {
      playerInfo.push(`📊 Performance: ${player.performanceStats}`);
    }
    
  
    
    return playerInfo.join('\n');
  }

  downloadQRCode(): void {
    if (this.downloadInProgress || !this.qrCodeElement) {
      return;
    }
    
    this.downloadInProgress = true;
    
    try {
      const canvas = this.qrCodeElement.nativeElement.querySelector('canvas');
      if (!canvas) {
        throw new Error('QR Code canvas not found');
      }
      
      // Création d'un nouveau canvas avec une bordure et du style
      const enhancedCanvas = document.createElement('canvas');
      const padding = 20;
      enhancedCanvas.width = canvas.width + (padding * 2);
      enhancedCanvas.height = canvas.height + (padding * 2) + 40; // Extra space for player name
      
      const ctx = enhancedCanvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Fill background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, enhancedCanvas.width, enhancedCanvas.height);
      
      // Draw border
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, enhancedCanvas.width - 10, enhancedCanvas.height - 10);
      
      // Draw QR code
      ctx.drawImage(canvas, padding, padding);
      
      // Add player name if available
      if (this.player) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#1E293B';
        ctx.textAlign = 'center';
        const playerText = `${this.player.firstName} ${this.player.lastName}`;
        ctx.fillText(playerText, enhancedCanvas.width / 2, canvas.height + padding + 25);
      }
      
      // Create download link
      const imgDataUrl = enhancedCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      const fileName = this.player 
        ? `${this.player.firstName.toLowerCase()}-${this.player.lastName.toLowerCase()}-qr.png`
        : 'player-qr-code.png';
        
      link.href = imgDataUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error downloading QR code:', error);
      alert('Could not download QR code. Please try again.');
    } finally {
      this.downloadInProgress = false;
    }
  }
}