import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player } from 'src/app/services/player.service';

@Component({
  selector: 'app-public-player-qr',
  templateUrl: './public-player-qr.component.html',
  styleUrls: ['./public-player-qr.component.css']
})
export class PublicPlayerQrComponent implements OnInit {

  @ViewChild('qrCode', { static: false }) qrCodeElement!: ElementRef;

  player?: Player;
  playerDataForQR: string = ''; // Texte que va contenir ton QR code

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    const playerId = Number(this.route.snapshot.paramMap.get('id'));
    if (playerId) {
      this.playerService.getById(playerId).subscribe(data => {
        this.player = data;

        // 🟢 Ici on génère **le texte clair** que le QR va contenir
        this.playerDataForQR = `
First Name: ${data.firstName}
Last Name: ${data.lastName}
Position: ${data.position}
Number: ${data.playerNumber}
Performance: ${data.performanceStats}
Club: ${data.clubName}
Team: ${data.teamName}
Birth Date: ${data.birthDate}
        `;
      });
    }
  }

  downloadQRCode(): void {
    if (!this.qrCodeElement) {
      alert('❌ QR Code not ready yet!');
      return;
    }
  
    const canvas = this.qrCodeElement.nativeElement.querySelector('canvas');
    if (canvas) {
      const imgDataUrl = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imgDataUrl;
      link.download = 'player-qr-code.png';
      link.click();
    } else {
      alert('❌ QR Code Canvas not found!');
    }
  }
  
    }
  
  
  
  

