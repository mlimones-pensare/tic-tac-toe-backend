import {Body, Controller, Delete, Get, Put} from '@nestjs/common';



export interface MyPosition {
    x: number;
    y: number;
}

export interface Cell {
    value: string;
    position: MyPosition;
}


export interface Game {
    dashboard: Cell [][];
    status: string;
    nextPlayer: string;
}

export interface Move {
    position: { x: number, y: number };
    player: string;
}

@Controller('game')
export class GameController {
    // @ts-ignore
  currentPlayer: string = 'O';
  board: Cell[][];

  constructor(){
    this.resetGame(null).then(()=>{});
  }

    @Get()
    async getGame(): Promise<Game> {
        console.log('stuff');
        return {
            dashboard: this.board,
            status: 'ACTIVE',
            nextPlayer: 'X',
        };
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    @Put()
    async updateGame(@Body() move: Move): Promise<Game> {
        // @ts-ignore
        this.board[move.position.x][move.position.y].value = this.currentPlayer;
        this.togglePlayer();
        return this.getGame();
    }

    @Delete()
    async resetGame(@Body() body): Promise<Game> {
      this.currentPlayer = 'X';
      this.board =[
        [
          { value: '', position: { x: 0, y: 0 } },
          { value: '', position: { x: 0, y: 1 } },
          { value: '', position: { x: 0, y: 2 } },
        ],
        [
          { value: '', position: { x: 1, y: 0 } },
          { value: 'X', position: { x: 1, y: 1 } },
          { value: '', position: { x: 1, y: 2 } },
        ],
        [
          { value: '', position: { x: 2, y: 0 } },
          { value: '', position: { x: 2, y: 1 } },
          { value: 'O', position: { x: 2, y: 2 } },
        ],
      ];
        return this.getGame();
    }
}
