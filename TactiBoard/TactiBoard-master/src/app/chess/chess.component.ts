import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChessComponent implements OnInit {
    title = 'TactiBoard';
    ngOnInit() {}
}

var settings = {
    "url": "http://chess-api-chess.herokuapp.com/api/v1/highscores",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "scoreboard_id":"5c8619c6ee69c700141d4577"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
});
