import { Component } from '@angular/core';

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './health-dashboard.component.html',
  styleUrls: ['./health-dashboard.component.css']
})
export class HealthDashboardComponent {


  ngAfterViewInit() {
    const video = document.getElementById("bgVideo") as HTMLVideoElement;

    if (video) {
      // 🔥 Écoute un clic n'importe où sur la page
      document.body.addEventListener("click", () => {
        video.muted = true; // 🔇 Forcer le son coupé
        video.play().catch(error => {
          console.error("Impossible de lire la vidéo :", error);
        });
      }, { once: true }); // 🔥 L'événement ne s'exécute qu'une seule fois
    }
  }

}
