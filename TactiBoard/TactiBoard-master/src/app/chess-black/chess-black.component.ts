import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { PIECE, INPUT_EVENT_TYPE, MOVE_INPUT_MODE, COLOR, MARKER_TYPE, Chessboard } from 'cm-chessboard';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chess-black',
  templateUrl: './chess-black.component.html',
  styleUrls: ['./chess-black.component.css'],
  encapsulation: ViewEncapsulation.None,
  template: `<div width="100%" height="100%" id="board" #board></div>
             <div id="settings_button">
                <button id="short_button" (click)="openSettingMenu()" mat-fab style="background-color: #FFF;"> ↓ </button>
             </div>
             <div id="game_over_back"></div>
             <div id="game_over_msg" class="menu">
                <p style="margin: 10px">Les {{ color }} ont gagnés</p>
                <div id="buttons">
                    <button mat-raised-button (click)="Reload()" color="primary"> Rejouer </button>
                    <br />
                    <button mat-raised-button routerLink="../chess" color="warn" style="margin: 25px"> Sortir </button>
                </div>
            </div>
            <div id="settingsMenu" class="menu">
                <div class="divHeader">
                    <p>Couleurs de plateau:</p>
                    <p class="fakeButton" (click)="closeSettingMenu()">x</p>
                </div>
                <div id="color_buttons">
                    <button mat-raised-button (click)="changeBoardColor('default')" style="background-color: #b79877;"> Marron </button><br/>
                    <button mat-raised-button (click)="changeBoardColor('blue')" style="background-color: #9cb1d8;" > Bleu </button><br/>
                    <button mat-raised-button (click)="changeBoardColor('green')"  style="background-color: #87b798;"> Vert </button><br/>
                </div>
             </div>`,
})

export class ChessBlackComponent implements AfterViewInit {
@ViewChild('board') board: ElementRef;
constructor(private router: Router, private http: HttpClient) { }
    color = "";
    tab: any;
    response: any;
    id = 0;
    index: any;
    resettime = 0;
    ngOnInit() {
        this.index = {
            squareFrom: "",
            squareTo: ""
        }
        this.tab = {
            board: new Chessboard(this.board.nativeElement,
                {
                    position: "start",
                    orientation: COLOR.black,
                    style: {
                        cssClass: "default",
                        showCoordinates: true,
                        showBorder: true,
                    },
                    responsive: true,
                    animationDuration: 300,
                    moveInputMode: MOVE_INPUT_MODE.dragPiece,
                }),
            chess: new Chess(),
            mov: 0,
            boardsave: 0,
            firstplay: 0
        }
        this.response = apiReset();
        this.tab.boardsave = apiBoard().board;
        this.id = setInterval(() => {
            if (apiTurn().current_player == "black" && this.resettime == 0) {
                var currentboard = apiBoard().board;
                for (var i = 0; i != 8; i += 1) {
                    if (currentboard[i] != this.tab.boardsave[i]) {
                        for (var j = 0; j != 8; j += 1) {
                            if (currentboard[i][j] != this.tab.boardsave[i][j] && currentboard[i][j] == "") {
                                this.index.squareFrom = String.fromCharCode(97 + j) + (i + 1).toString();
                            }
                            if (currentboard[i][j] != this.tab.boardsave[i][j] && currentboard[i][j] != "") {
                                this.index.squareTo = String.fromCharCode(97 + j) + (i + 1).toString();
                            }
                        }
                    }
                }
                for (var i = 0; i < this.tab.chess.SQUARES.length; i++) {
                    var pos = this.tab.chess.get(this.tab.chess.SQUARES[i]);
                    if (pos != null && pos.type == 'k' && pos.color == 'w')
                        var posW = this.tab.chess.SQUARES[i]
                    if (pos != null && pos.type == 'k' && pos.color == 'b')
                        var posB = this.tab.chess.SQUARES[i]
                }
                if (this.index.squareFrom != "" && this.index.squareTo != "") {
                    if (this.tab.chess.move({from: this.index.squareFrom, to: this.index.squareTo})) {
                        checkMate(this.tab, posB, posW);
                        checkRoque(this.tab, this.index);
                        checkPassant(this.tab, this.index);
                    } else {
                        checkPromotion(this.tab, this.index, posB, posW)
                    }
                    console.log(apiBoard());
                    apiMove(this.index.squareFrom, this.index.squareTo);
                    this.tab.boardsave = apiBoard().board;
                    this.tab.board.setPosition(this.tab.chess.fen(), true)
                }
                this.resettime = 1;
            }
            else if (apiTurn().current_player == "black" && this.resettime != 0)
                console.log("no")
            else {
                console.log("on fait quoi la");
                this.resettime = 0;
            }
        }, 3000);
    }
    ngOnDestroy() {
        if (this.id) {
            clearInterval(this.id);
        }
    }
    ngAfterViewInit() {
        var tab = this.tab;
        tab.board.enableMoveInput((event) => {
            if ((apiTurn().current_player == "black"))
                this.color = "noirs";
            else
                this.color = "blancs";
            switch (event.type) {
                case INPUT_EVENT_TYPE.moveStart:
                    console.log("nani")
                    tab.mov = tab.chess.moves({square: event.square, verbose: true});
                    return true
                case INPUT_EVENT_TYPE.moveDone:
                    return (moveDone(event, tab));
                case INPUT_EVENT_TYPE.moveCanceled:
                    console.log(`moveCanceled`)
            }
        }, COLOR.black);
    }
    setTurns() {
        var tab = this.tab;
        tab.board.enableMoveInput((event) => {
            if ((apiTurn().current_player == "black"))
                this.color = "noirs";
            else
                this.color = "blancs";
            switch (event.type) {
                case INPUT_EVENT_TYPE.moveStart:
                    console.log("nani")
                    tab.mov = tab.chess.moves({square: event.square, verbose: true});
                    return true
                case INPUT_EVENT_TYPE.moveDone:
                    return (moveDone(event, tab));
                case INPUT_EVENT_TYPE.moveCanceled:
                    console.log(`moveCanceled`)
            }
        }, COLOR.black);
    }
    changeBoardColor(color) {
        var pos = this.tab.board.getPosition();
        this.tab.board.destroy();
        this.tab.board = new Chessboard(this.board.nativeElement,
            {
                position: pos,
                orientation: COLOR.black,
                style: {
                    cssClass: color,
                    showCoordinates: true,
                    showBorder: true,
                },
                responsive: true,
                animationDuration: 300,
                moveInputMode: MOVE_INPUT_MODE.dragPiece,
            });
        console.log(this.tab.board.props.style.cssClass)
        this.setTurns();
    }
    Reload() {
        this.tab.board.setPosition("start");
        $("#game_over_back").css("display", "none");
        $("#game_over_msg").css("display", "none");
        this.tab.board.removeMarkers(null, MARKER_TYPE.emphasize)
        this.tab.chess = new Chess();
    }
    hideSettings() {
        $("#short_button").css("display", "block");
        $("#long_button").css("display", "none");
    }
    showSettings() {
        $("#short_button").css("display", "none");
        $("#long_button").css("display", "block");
    }
    openSettingMenu() {
        $("#settings_button").css("display", "none");
        $("#game_over_back").css("display", "block");
        $("#settingsMenu").css("display", "block");
    }
    closeSettingMenu() {
        $("#settings_button").css("display", "block");
        $("#game_over_back").css("display", "none");
        $("#settingsMenu").css("display", "none");
    }
}

declare var Chess: any;

function moveDone(event, tab) {
    for (var i = 0; i < tab.chess.SQUARES.length; i++) {
        var pos = tab.chess.get(tab.chess.SQUARES[i]);
        if (pos != null && pos.type == 'k' && pos.color == 'w')
            var posW = tab.chess.SQUARES[i]
        if (pos != null && pos.type == 'k' && pos.color == 'b')
            var posB = tab.chess.SQUARES[i]
    }
    if (tab.chess.move({from: event.squareFrom, to: event.squareTo})) {
        checkMate(tab, posB, posW);
        checkRoque(tab, event);
        checkPassant(tab, event);
        apiMove(event.squareFrom, event.squareTo);
        tab.boardsave = apiBoard().board;
        tab.firstplay = 1;
        return true
    }
    else
        return (checkPromotion(tab, event, posB, posW));
}

function checkPassant(tab, event) {
    for (var i = 0; i < tab.mov.length; i += 1) {
        if (tab.mov[i].flags == "e" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "w") {
            setTimeout(function() {
                tab.board.setPiece(event.squareTo[0] + (Number(event.squareTo[1]) - 1), null);
            }, 350);
        }
        else if (tab.mov[i].flags == "e" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "b") {
            setTimeout(function() {
                tab.board.setPiece(event.squareTo[0] + (Number(event.squareTo[1]) + 1), null);
            }, 350);
        }
    }
}

function checkRoque(tab, event) {
    for (var i = 0; i < tab.mov.length; i += 1) {
        if (tab.mov[i].san == "O-O" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "w") {
            setTimeout(function() {
                tab.board.setPiece("f1", "wr");
                tab.board.setPiece("h1", null);
            }, 350);
        }
        if (tab.mov[i].san == "O-O" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "b") {
            setTimeout(function() {
                tab.board.setPiece("f8", "br");
                tab.board.setPiece("h8", null);
            }, 350);
        }
        if (tab.mov[i].san == "O-O-O" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "w") {
            setTimeout(function() {
                tab.board.setPiece("d1", "wr");
                tab.board.setPiece("a1", null);
            }, 350);
        }
        if (tab.mov[i].san == "O-O-O" && tab.mov[i].from == event.squareFrom && tab.mov[i].to == event.squareTo && tab.mov[i].color == "b") {
            setTimeout(function() {
                tab.board.setPiece("d8", "br");
                tab.board.setPiece("a8", null);
            }, 350);
        }
    }
}

function checkMate(tab, posB, posW) {
    if (tab.chess.in_checkmate() == true) {
        $("#game_over_back").css("display", "block");
        $("#game_over_msg").css("display", "block");
    }
    if (tab.chess.in_check() == true) {
        if (tab.chess.turn() == 'b')
            tab.board.addMarker(posB, MARKER_TYPE.emphasize)
        else
            tab.board.addMarker(posW, MARKER_TYPE.emphasize)
    }
    else if (tab.chess.in_check() == false) {
        if (tab.chess.turn() == 'w') {
            tab.board.removeMarkers(posB, MARKER_TYPE.emphasize)
        } else {
            tab.board.removeMarkers(posW, MARKER_TYPE.emphasize)
        }
    }

}

function checkPromotion(tab, event, posB, posW) {
    var turn = tab.chess.turn();
    if (tab.chess.move({from: event.squareFrom, to: event.squareTo, promotion: 'q'})) {
        setTimeout(function() {
            tab.board.setPiece(event.squareTo, turn + 'q');
        }, 350);
        checkMate(tab, posB, posW);
        apiMove(event.squareFrom, event.squareTo);
        tab.boardsave = apiBoard().board;
        tab.firstplay = 1;
        return true;
    } else {
        checkMate(tab, posB, posW);
        return false;
    }
}

function apiReset() {
    var response = $.ajax({
        "url": "http://10.101.53.76:5000/reset",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin':'*',
        },
        async: false,
    }).responseText;
    return (JSON.parse(response));
}

function apiTurn() {
    var response = $.ajax({
        "url": "http://10.101.51.150:5000/turn",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin':'*',
        },
        async: false,
    }).responseText;
    return (JSON.parse(response));
}

function apiBoard() {
    var response = $.ajax({
        "url": "http://10.101.51.150:5000/board",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin':'*',
        },
        async: false,
    }).responseText;
    return (JSON.parse(response));
}

function apiMove(move1, move2) {
    var response = $.ajax({
        "url": `http://10.101.51.150:5000/move?begin=${move1.toUpperCase()}&end=${move2.toUpperCase()}`,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin':'*',
        },
        async: false,
    }).responseText;
    return (JSON.parse(response));
}
