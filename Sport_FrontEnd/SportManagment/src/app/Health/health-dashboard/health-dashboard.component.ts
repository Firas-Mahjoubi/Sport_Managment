import { Component } from '@angular/core';

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './health-dashboard.component.html',
  styleUrls: ['./health-dashboard.component.css']
})
export class HealthDashboardComponent {


  ngAfterViewInit() {
    const video = document.getElementById("bgVideo") as HTMLVideoElement;
    const carousel = document.getElementById('circular-carousel') as HTMLElement;
    let rotateY = 0;
    let isDragging = false;
    let startX = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      carousel.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      rotateY += deltaX * 0.3;
      carousel.style.transform = `rotateY(${rotateY}deg)`;
      startX = e.clientX;
    });

     // Pour mobile
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (e) => {
    const deltaX = e.touches[0].clientX - startX;
    rotateY += deltaX * 0.3;
    carousel.style.transform = `rotateY(${rotateY}deg)`;
    startX = e.touches[0].clientX;
  });



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
