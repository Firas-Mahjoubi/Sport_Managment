import { Player } from "./player";

export enum Type {
  CONTUSION = 'CONTUSION',
  ENTORSE = 'ENTORSE',
  FRACTURE = 'FRACTURE',
  LESION_MUSCULAIRE = 'LESION_MUSCULAIRE',
  AUTRE = 'AUTRE'
}

export enum Severity {
  LEGER = 'LEGER',
  MODERE = 'MODERE',
  GRAVE = 'GRAVE'
}

export enum ZoneAffectee {
  GENOU = 'GENOU',
  CHEVILLE = 'CHEVILLE',
  TETE = 'TETE',
  EPAULE = 'EPAULE'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  EN_RECUPERATION = 'EN_RECUPERATION',
  GUERIE = 'GUERIE'
}

export interface Injury {
  id?: number;        // ID de la blessure (optionnel pour la création)
  date: string;       // Date de la blessure (format ISO)
  type: Type;         // Type de blessure (Enum)
  severity: Severity; // Gravité (Enum)
  description: string; // Description de la blessure
  status: Status;     // État actuel de la blessure (Enum)
  zoneAffectee: ZoneAffectee; // Zone affectée (Enum)
  cause: string;      // Cause de la blessure
  player: Player;     // Joueur associé (objet complet)
}
