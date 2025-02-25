import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tactic-folder',
  templateUrl: './tactic-folder.component.html',
  styleUrls: ['./tactic-folder.component.css']
})
export class TacticFolderComponent implements OnInit {
  tacticId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tacticId = +this.route.snapshot.paramMap.get('id')!;
  }
}
