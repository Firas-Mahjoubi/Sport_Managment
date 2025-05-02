export class Exercice {
    id!: number;
    name!: string;
    description!: string;
    visibility!: string;         // string enum: "PUBLIC" | "PRIVATE" | etc.
    fitnessLevel!: number;
    techniqueLevel!: number;
    tacticLevel!: number;
    mainFocus!: string;
    ageGroup!: string;
    groupSize!: number;
    durationMinutes!: number;
    imageUrl!: string;
    // Add more fields if needed later (e.g. tags, difficulty, etc.)
  }
  