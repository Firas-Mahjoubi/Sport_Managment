export class MediaExercice {
  id!: number;
  mediaType!: string;
  mediaUrl!: string;

  // Optional - if your backend sends this
  exercice?: {
    id: number;
  };
}
