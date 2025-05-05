import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from './club.service';
import { Team } from './team.service';


export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  playerNumber: number;
  performanceStats: string;
  birthDate: string; // 🟢 Ajout de la date de naissance (format string ISO)
  imageUrl: string;  // 🟢 Ajout de l'URL de l'image du joueur
  status: string;    // 🟢 Ajout du statut (Available, Injured, Rehab, etc.)
  clubName: string;
  category: string; // 🟢 Ajout de la catégorie (Senior, U18, etc.)
  teamName: string; // 🟢 Ajout du nom de l'équipe
  club:Club;
  team:Team;

  

}
export interface PlayerRequest {
  firstName: string;
  lastName: string;
  position: string;
  birthDate: string; // format YYYY-MM-DD
  playerNumber: number;
  performanceStats: string;
  imageUrl: File;
  clubId: number;
  category: string; 
  
}

@Injectable({
  providedIn: 'root'
})

export class PlayerService {

  private apiUrl = 'http://localhost:8088/players';
  constructor(private http: HttpClient) { }

//get all player
  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/getallplayers`);
  }
  
//getplayerbyid
  getById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/getplayer/${id}`);
  }

//ajouter un player
  create(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl+"/addplayer", player);
  }

//modifier un player
  update(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/updateplayer/${id}`, player);
  }

//supprimer un player
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteplayer/${id}`);
  }
  
  //tri
  // 🆕 Fonction pour récupérer les joueurs triés
getSortedPlayers(field: string, direction: string = 'asc'): Observable<Player[]> {
  return this.http.get<Player[]>(`${this.apiUrl}/sorted?field=${field}&direction=${direction}`);
}



  addPlayer(player: PlayerRequest): Observable<any> {
    const formData = new FormData();
    formData.append('firstName', player.firstName);
    formData.append('lastName', player.lastName);
    formData.append('position', player.position);
    formData.append('birthDate', player.birthDate);

    formData.append('playerNumber', player.playerNumber.toString());
    formData.append('performanceStats', player.performanceStats);
    formData.append('imageUrl', player.imageUrl); // image file
    formData.append('category', player.category); 
    formData.append('clubId', player.clubId.toString());

    return this.http.post(`${this.apiUrl}/addplayer`, formData);
  }
}
