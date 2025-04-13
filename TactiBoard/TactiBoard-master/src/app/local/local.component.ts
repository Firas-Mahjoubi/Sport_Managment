import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { PIECE, INPUT_EVENT_TYPE, MOVE_INPUT_MODE, COLOR, MARKER_TYPE, Chessboard } from 'cm-chessboard';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css'],
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
                    <p class="fakeButton" (click)="closeSettingMenu()">x</p>
                </div>
                <p style="text-align: left;margin-left: 10px;">Couleurs de plateau:</p>
                <div class="buttons">
                    <button mat-raised-button (click)="changeBoardColor('default')" style="background-color: #b79877;"> Marron </button><br/>
                    <button mat-raised-button (click)="changeBoardColor('blue')" style="background-color: #9cb1d8;" > Bleu </button><br/>
                    <button mat-raised-button (click)="changeBoardColor('green')"  style="background-color: #87b798;"> Vert </button><br/>
                </div>
                <p style="text-align: left;margin-left: 10px;">Affichage des pièces:</p>
                <div class="buttons">
                    <button mat-raised-button (click)="changePieces('default')"> Toutes </button><br/>
                    <button mat-raised-button (click)="changePieces('white')"> Seulement les blancs </button><br/>
                    <button mat-raised-button (click)="changePieces('black')"> Seulement les noirs </button><br/>
                </div>
             </div>`,
})

export class LocalComponent implements AfterViewInit {
@ViewChild('board') board: ElementRef;
constructor(private router: Router) { }

    color = "";
    tab: any;
    ngAfterViewInit() {
        this.tab = {
            board: new Chessboard(this.board.nativeElement,
                {
                    position: "start",
                    orientation: COLOR.white,
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
            mov: 0
        }
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
    setTurns() {
        this.tab.board.enableMoveInput((event) => {
            if (this.tab.chess.turn() == 'b')
                this.color = "blancs";
            else
                this.color = "noirs";
            switch (event.type) {
                case INPUT_EVENT_TYPE.moveStart:
                    this.tab.mov = this.tab.chess.moves({square: event.square, verbose: true});
                    if (this.tab.chess.moves({square: event.square, verbose: true})[0])
                        return true
                    else
                        return false
                case INPUT_EVENT_TYPE.moveDone:
                    return (moveDone(event, this.tab));
                case INPUT_EVENT_TYPE.moveCanceled:
                    console.log(`moveCanceled`)
            }
        });
    }
    changeBoardColor(color) {
        var pos = this.tab.board.getPosition();
        this.tab.board.destroy();
        this.tab.board = new Chessboard(this.board.nativeElement,
            {
                position: pos,
                orientation: COLOR.white,
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
    changePieces(pieces) {
        console.log("path/" + pieces + ".png");
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
        return true;
    } else {
        checkMate(tab, posB, posW);
        return false;
    }
}
