import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gameweek-slider',
  templateUrl: './gameweek-slider.component.html',
  styleUrls: ['./gameweek-slider.component.css']
})
export class GameweekSliderComponent {
  gameWeeks: number[] = Array.from({ length: 38 }, (_, i) => i + 1); // GW1 to GW38
  selectedGameWeek: number = 1;
  startIndex: number = 0; // Controls which three GWs are visible

  @Output() gameWeekSelected = new EventEmitter<number>();

  selectGameWeek(gameWeek: number) {
    this.selectedGameWeek = gameWeek;
    this.gameWeekSelected.emit(gameWeek);
  }

  prevGameWeek() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  nextGameWeek() {
    if (this.startIndex + 3 < this.gameWeeks.length) {
      this.startIndex++;
    }
  }
}
