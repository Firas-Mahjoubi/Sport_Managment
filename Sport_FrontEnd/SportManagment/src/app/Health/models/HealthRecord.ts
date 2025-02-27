import { Player } from "./player";

export enum Fatigue {
  FAIBLE = 'FAIBLE',
  MOYENNE = 'MOYENNE',
  ELEVEE = 'ELEVEE'
}

export enum EtatPhysique {
  EXCELLENT = 'EXCELLENT',
  BON = 'BON',
  MOYEN = 'MOYEN',
  FATIGUE = 'FATIGUE',
  BLESSE = 'BLESSE'
}

export enum DouleursMusculaires {
  AUCUNE = 'AUCUNE',
  LEGERES = 'LEGERES',
  MODEREES = 'MODEREES',
  SEVERES = 'SEVERES'
}

export enum Intensite {
  FAIBLE = 'FAIBLE',
  MOYENNE = 'MOYENNE',
  HAUTE = 'HAUTE'  // 🔄 Changement ici (remplace INTENSE par HAUTE)
}


export enum StatusJoueur {
  ACTIF = 'ACTIF',
  BLESSE = 'BLESSE',
  REPOS = 'REPOS'
}

export interface HealthRecord {
  id?: number;
  name: string;
  date: string; // Format YYYY-MM-DD
  fatigue: Fatigue;
  etatPhysique: EtatPhysique;
  douleursMusculaires: DouleursMusculaires;
  intensite: Intensite;
  statusJoueur: StatusJoueur;
  commentaire: string;
  player?: Player | null;  // 👈 Autoriser `null`
}
