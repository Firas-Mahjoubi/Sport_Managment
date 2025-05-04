export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  playerNumber: number;
  performanceStats: string;

  blessé: boolean; // Propriété qui indique si le joueur est blessé
}

