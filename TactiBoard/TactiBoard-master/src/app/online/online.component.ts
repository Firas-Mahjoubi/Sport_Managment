import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { PIECE, INPUT_EVENT_TYPE, MOVE_INPUT_MODE, COLOR, MARKER_TYPE, Chessboard } from 'cm-chessboard';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class OnlineComponent implements AfterViewInit {
constructor(private router: Router, private http: HttpClient) { }
    ngAfterViewInit() {
    }
}
