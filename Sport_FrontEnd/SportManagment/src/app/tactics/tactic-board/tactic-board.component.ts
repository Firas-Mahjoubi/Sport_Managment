import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-tactic-board',
  template: `
    <div class="board-container">
      <canvas #tacticCanvas></canvas>
    </div>
  `,
  styleUrls: ['./tactic-board.component.css']
})
export class TacticBoardComponent implements AfterViewInit {
  @ViewChild('tacticCanvas', { static: false }) canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private players: { x: number, y: number, color: string }[] = [];
  private dragging = false;
  private dragIndex: number | null = null;

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.initCanvas();
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 800;
    canvas.height = 500;
    this.drawField();
    this.addPlayers();
  }

  drawField() {
    const { ctx } = this;
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(0, 0, 800, 500);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    
    // Mid-line
    ctx.beginPath();
    ctx.moveTo(400, 0);
    ctx.lineTo(400, 500);
    ctx.stroke();
    
    // Center circle
    ctx.beginPath();
    ctx.arc(400, 250, 50, 0, Math.PI * 2);
    ctx.stroke();

    // Penalty areas
    ctx.strokeRect(50, 150, 100, 200);
    ctx.strokeRect(650, 150, 100, 200);
  }

  addPlayers() {
    this.players = [
      { x: 200, y: 250, color: 'blue' },
      { x: 600, y: 250, color: 'red' }
    ];
    this.drawPlayers();
  }

  drawPlayers() {
    this.players.forEach(player => {
      this.ctx.fillStyle = player.color;
      this.ctx.beginPath();
      this.ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.players.forEach((player, index) => {
      const dx = x - player.x;
      const dy = y - player.y;
      if (dx * dx + dy * dy < 100) {
        this.dragging = true;
        this.dragIndex = index;
      }
    });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging && this.dragIndex !== null) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.players[this.dragIndex].x = event.clientX - rect.left;
      this.players[this.dragIndex].y = event.clientY - rect.top;
      this.updateCanvas();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.dragging = false;
    this.dragIndex = null;
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, 800, 500);
    this.drawField();
    this.drawPlayers();
  }
}
