import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
})
export class ClubDetailComponent implements OnInit {
  club: any;

  constructor(private route: ActivatedRoute, private clubService: ClubService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clubService.getById(id).subscribe(data => {
      this.club = {
        ...data,
        imageUrl: `http://localhost:8088/clubs/image/${id}`
      };
    });
  }
  
}
