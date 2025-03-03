export interface Player {
  id?: number;
  firstName: string;
  lastName: string;
  position: string;
  playerNumber: number;
  performanceStats: string;
  birthDate: string; // 🟢 Ajout de la date de naissance (format string ISO)
  imageUrl: string;  // 🟢 Ajout de l'URL de l'image du joueur
  status: string;    // 🟢 Ajout du statut (Available, Injured, Rehab, etc.)
  teamId: number;
}
