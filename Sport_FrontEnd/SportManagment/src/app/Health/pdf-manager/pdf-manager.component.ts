import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { RecoveryPlanService } from '../services/recovery-plan.service';
import * as QRCode from 'qrcode';
const QRCodeModule: any = QRCode;

@Component({
  selector: 'app-pdf-manager',
  templateUrl: './pdf-manager.component.html',
  styleUrls: ['./pdf-manager.component.css']
})
export class PdfManagerComponent implements OnInit {
  players: Player[] = [];
  customNotes: string = '';

  constructor(
    private playerService: PlayerService,
    private recoveryPlanService: RecoveryPlanService
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers().subscribe({
      next: data => this.players = data,
      error: err => console.error('Erreur chargement joueurs :', err)
    });
  }

  async generatePdf(player: Player): Promise<void> {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height || 297;
    let y = 15;

    const logo = await this.loadImage('/assets/esprit.jpg');
    doc.setFillColor(25, 25, 112);
    doc.rect(0, 0, 210, 30, 'F');
    doc.addImage(logo, 'PNG', 0, 0, 50, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text('                Rapport du Joueur', 75, 18);


    y = 55;

    const photo = await this.loadImage('/assets/tu.jpg');
    doc.addImage(photo, 'JPEG', 160, y - 10, 60, 40);
    doc.setFillColor(240, 248, 255);
    doc.rect(10, y - 5, 140, 40, 'F');
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('INFORMATIONS PERSONNELLES', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom     : ${player.lastName}`, 15, y + 7);
    doc.text(`Prénom  : ${player.firstName}`, 15, y + 14);
    doc.text(`Position: ${player.position}`, 15, y + 21);
    doc.text(`N°      : ${player.playerNumber}`, 15, y + 28);

    y += 55;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(25, 25, 112);
    doc.text('RAPPORT MÉDICAL', 15, y);
    y += 8;
    doc.setFont('helvetica', 'normal');

    const qrCodeData: string[] = [
      `🔹 INFORMATIONS DU JOUEUR 🔹`,
      `Nom     : ${player.lastName}`,
      `Prénom  : ${player.firstName}`,
      `Position: ${player.position}`,
      `N°      : ${player.playerNumber}`,

      ``,
      `🔹 NOTES & RECOMMANDATIONS 🔹`,
      `${this.customNotes}`,
    ];

    this.recoveryPlanService.getRecoveryPlansByPlayerId(player.id).subscribe(async plans => {
      if (plans.length > 0) {
        qrCodeData.push('', '🔹 PLANS DE RÉCUPÉRATION 🔹');

        plans.forEach(plan => {
          // Bloc dans le PDF
          doc.setFillColor(245, 245, 245);
          doc.rect(10, y - 5, 190, 50, 'F');
          doc.setTextColor(0);
          doc.setFontSize(11);
          doc.text(`planDescription : ${plan.planDescription}`, 15, y);
          doc.text(`  startDate      : ${plan.startDate}     /    EstimatedEndDate : ${plan.estimatedEndDate}`, 15, y + 6);
          doc.text(`  Statut    : ${plan.planStatus}`, 15, y + 12);
          doc.text(`  Type      : ${plan.planType}`, 15, y + 18);
          doc.text(`  SessionFrequency/sem  : ${plan.sessionFrequency}/sem`, 15, y + 24);
          doc.text(`  sessionDuration/min   : ${plan.sessionDuration} min`, 15, y + 30);

          const barX = 50, barY = y + 34, barW = 100, barH = 5;
          doc.setDrawColor(0);
          doc.rect(barX, barY, barW, barH, 'S');
          let color: [number, number, number] = plan.progress < 50 ? [255, 99, 71] : [76, 175, 80];
          doc.setFillColor(...color);
          doc.rect(barX, barY, barW * (plan.progress / 100), barH, 'F');
          doc.setFontSize(10);
          doc.setTextColor(0);
          doc.text(`${plan.progress}%`, barX + barW + 5, barY + 4);

          y += 60;
          if (y > pageHeight - 50) {
            doc.addPage();
            y = 20;
          }

          // Ajout au contenu QR
          qrCodeData.push(
            '',
            `📋 Description : ${plan.planDescription}`,
            `📆 Du ${plan.startDate} au ${plan.estimatedEndDate}`,
            `📊 Statut      : ${plan.planStatus}`,
            `🏃 Type        : ${plan.planType}`,
            `🕒 Fréquence   : ${plan.sessionFrequency}/sem | ${plan.sessionDuration} min`,
            `📈 Progression : ${plan.progress}%`
          );
        });
      } else {
        doc.setFontSize(12);
        doc.setTextColor(200, 0, 0);
        doc.text('Aucun plan de récupération disponible.', 15, y);
        y += 10;

        qrCodeData.push('', 'Aucun plan de récupération disponible.');
      }

      if (y + 50 > pageHeight - 60) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(25, 25, 112);
      doc.text('NOTES ET RECOMMANDATIONS', 15, y += 10);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Commentaires personnalisés:', 15, y += 6);
      doc.setTextColor(0);
      doc.setFontSize(10);
      doc.text(this.customNotes, 15, y + 10);

      doc.setDrawColor(200, 200, 200);
      doc.line(10, y + 15, 200, y + 15);

      // 🔽 Position du QR Code : bas de la page (juste au-dessus de la date)
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, qrCodeData.join('\n'));
      const qrCodeImage = qrCanvas.toDataURL();
      const qrX = 15;
      const qrY = pageHeight - 65; // 65 mm au-dessus du bas
      doc.addImage(qrCodeImage, 'PNG', qrX, qrY, 40, 40);

      this.drawSignatureAndFooter(doc);
      this.openPdf(doc);
    });
  }

  drawSignatureAndFooter(doc: jsPDF) {
    const ph = doc.internal.pageSize.height || 297;
    doc.setFont('times', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(80);
    doc.text('Signature Médecin Sportif : ____________________', 15, ph - 20);
    doc.text('Date : ____/____/2025', 150, ph - 20);
    doc.setFillColor(25, 25, 112);
    doc.rect(0, ph - 15, 210, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(' HealthApp © 2025 — Rapport Professionnel', 15, ph - 5);
  }

  openPdf(doc: jsPDF) {
    const blob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
  }


  loadImage(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
      img.src = url;
    });
  }
}
