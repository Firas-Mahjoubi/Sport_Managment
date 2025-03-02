export interface Club {
    id?: number;  // "?" signifie que c'est optionnel
    name: string;
    location: string;
    stadiumName: string;
    foundationYear: string;  // Format YYYY-MM-DD
    clubLogo: string;
  }