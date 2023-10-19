import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectFourGame } from '@games/connect-four-game';

@Component({
  selector: 'games-gameboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
})
export class GameboardComponent {
  game = new ConnectFourGame();
}
