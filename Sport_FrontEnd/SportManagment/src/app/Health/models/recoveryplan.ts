import { Injury } from './injury';

export interface RecoveryPlan {
  id: number;
  planDescription: string;
  startDate: string;            // LocalDate donc string ISO (ex: '2025-02-27')
  estimatedEndDate: string;     // idem
  actualEndDate?: string | null; // Optionnel, car pas toujours renseigné
  progress: number;              // Float
  sessionFrequency: number;
  sessionDuration: number;
  planType: PlanType;
  nextReviewDate: string;
  adjustments: string;
  planStatus: PlanStatus;
  injury: Injury;


}


// Enums associés (frontend Angular)
export enum PlanType {
  PHYSIOTHERAPY = 'PHYSIOTHERAPY',
  REST = 'REST',
  STRENGTH_TRAINING = 'STRENGTH_TRAINING'
}


export enum PlanStatus {
  EN_COURS = 'EN_COURS',
  TERMINE = 'TERMINE',
  SUSPENDU = 'SUSPENDU'
}

