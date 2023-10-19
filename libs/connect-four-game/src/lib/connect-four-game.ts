export class ConnectFourGame {
  public gameboard: Array<string[]> = [];
  public currentPlayer = '';
  public winner = '';
  public readonly player1: string;
  public readonly player2: string;

  private readonly rowCount: number;
  private readonly columnCount: number;
  private readonly connectNumber: number;

  constructor(options?: any) {
    this.connectNumber = (options && options.connectNumber) || 4;
    this.columnCount = (options && options.columnCount) || 7;
    this.rowCount = (options && options.rowCount) || 6;
    this.player1 = (options && options.player1) || 1;
    this.player2 = (options && options.player2) || 2;
    this.reset();
  }

  public addPiece = (col: number) => {
    if (this.winner) {
      console.log(`Player ${this.winner} has won!`);
      return;
    }
    if (col > this.columnCount - 1) {
      console.log('out of bounds');
      return;
    }
    const playedPosition = this.setPlayerPiece(col);
    if (playedPosition) {
      const playerWon = this.isConnectFour(
        playedPosition[0],
        playedPosition[1],
        this.gameboard,
        this.currentPlayer
      );
      if (playerWon) {
        this.winner = this.currentPlayer;
        console.log(`Congratulations player ${this.winner}!`);
      } else {
        this.currentPlayer =
          this.currentPlayer === this.player1 ? this.player2 : this.player1;
      }
    } else {
      console.log('invalid move');
    }
  };

  public reset = () => {
    this.winner = '';
    this.gameboard = Array.from(Array(this.columnCount)).map(() =>
      Array.from(Array(this.rowCount)).map(() => '')
    );
    this.currentPlayer = this.player1;
  };

  private setPlayerPiece = (columnIndex: number) => {
    const column = this.gameboard[columnIndex];
    const currentRowIndex = column.findIndex((v) => !v);
    if (currentRowIndex >= 0) {
      this.gameboard[columnIndex][currentRowIndex] = this.currentPlayer;
      return [columnIndex, currentRowIndex];
    }
    return null;
  };

  private isTopRow = (row: number) => row === this.rowCount - 1;
  private isBottomRow = (row: number) => row === 0;
  private isLeftColumn = (col: number) => col === 0;
  private isRightColumn = (col: number) => col === this.columnCount - 1;

  private columnLeft = (col: number) => col - 1;
  private columnRight = (col: number) => col + 1;
  private rowUp = (row: number) => row + 1;
  private rowDown = (row: number) => row - 1;

  public isConnectFour = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    this.isVerticalFour(col, row, gameboard, currentPlayer) ||
    this.isHorizontalFour(col, row, gameboard, currentPlayer) ||
    this.isDiagonalFour(col, row, gameboard, currentPlayer);

  public isHorizontalFour = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    this.getLeftMatches(col, row, gameboard, currentPlayer) +
      this.getRightMatches(col, row, gameboard, currentPlayer) +
      1 >=
    this.connectNumber;

  public isVerticalFour = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    return (
      !this.isBottomRow(row) &&
      this.getVerticalMatches(col, row, gameboard, currentPlayer) + 1 >=
        this.connectNumber
    );
  };

  public isDiagonalFour = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    this.getLeftDownDiagonalMatches(col, row, gameboard, currentPlayer) +
      this.getLeftUpDiagonalMatches(col, row, gameboard, currentPlayer) +
      1 >=
    this.connectNumber;

  private isTopLeftMatch = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    !this.isTopRow(row) &&
    !this.isLeftColumn(col) &&
    this.isPositionCurrentPlayerOwned(
      this.columnLeft(col),
      this.rowUp(row),
      gameboard,
      currentPlayer
    );

  private isTopRightMatch = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    !this.isTopRow(row) &&
    !this.isRightColumn(col) &&
    this.isPositionCurrentPlayerOwned(
      this.columnRight(col),
      this.rowUp(row),
      gameboard,
      currentPlayer
    );
  private isRightMatch = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    !this.isRightColumn(col) &&
    this.isPositionCurrentPlayerOwned(
      this.columnRight(col),
      row,
      gameboard,
      currentPlayer
    );
  private isBottomRightMatch = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) =>
    !this.isRightColumn(col) &&
    !this.isBottomRow(row) &&
    this.isPositionCurrentPlayerOwned(
      this.columnRight(col),
      this.rowDown(row),
      gameboard,
      currentPlayer
    );
  private isBottomMatch = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    if (row <= 0) {
      return false;
    }
    const isPlayerPosition = this.isPositionCurrentPlayerOwned(
      col,
      this.rowDown(row),
      gameboard,
      currentPlayer
    );
    return isPlayerPosition;
  };
  private isBottomLeftMatch = (
    col: number,
    row: number,
    gameboard: Array<string[]>,
    currentPlayer: string
  ) =>
    !this.isBottomRow(row) &&
    !this.isLeftColumn(col) &&
    this.isPositionCurrentPlayerOwned(
      this.columnLeft(col),
      this.rowDown(row),
      gameboard,
      currentPlayer
    );
  private isLeftMatch = (
    col: number,
    row: number,
    gameboard: Array<string[]>,
    currentPlayer: string
  ) =>
    !this.isLeftColumn(col) &&
    this.isPositionCurrentPlayerOwned(
      this.columnLeft(col),
      row,
      gameboard,
      currentPlayer
    );

  private isPositionCurrentPlayerOwned = (
    col: number,
    row: number,
    gameboard: Array<string[]>,
    currentPlayer: string
  ) => {
    return (
      row >= 0 &&
      row < this.rowCount &&
      col < this.columnCount &&
      col >= 0 &&
      gameboard[col][row] === currentPlayer
    );
  };

  private getLeftMatches = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    let matches = 0;
    let checkMatch = true;
    if (col <= 0) {
      return 0;
    }
    while (checkMatch && matches < this.connectNumber - 1) {
      const spotsToLeft = col - matches;
      if (!this.isLeftMatch(spotsToLeft, row, gameboard, currentPlayer)) {
        checkMatch = false;
      } else {
        matches++;
      }
    }
    return matches;
  };

  private getRightMatches = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    let matches = 0;
    let checkMatch = true;
    if (col >= this.columnCount - 1) {
      return 0;
    }
    while (checkMatch && matches < this.connectNumber - 1) {
      if (!this.isRightMatch(col + matches, row, gameboard, currentPlayer)) {
        checkMatch = false;
      } else {
        matches++;
      }
    }
    return matches;
  };

  private getVerticalMatches = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    let matches = 0;
    let checkForMatch = true;
    while (checkForMatch && matches < this.connectNumber - 1) {
      if (this.isBottomMatch(col, row - matches, gameboard, currentPlayer)) {
        matches++;
      } else {
        checkForMatch = false;
      }
    }
    return matches;
  };

  private getLeftDownDiagonalMatches = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    let matches1 = 0;
    let checkMatch1 = true;
    while (checkMatch1 && matches1 < this.connectNumber - 1) {
      if (
        this.isTopLeftMatch(
          col - matches1,
          row + matches1,
          gameboard,
          currentPlayer
        )
      ) {
        matches1++;
      } else {
        checkMatch1 = false;
      }
    }
    let checkMatch2 = true;
    let matches2 = 0;
    while (checkMatch2 && matches2 < this.connectNumber - 1) {
      if (
        this.isBottomRightMatch(
          col + matches2,
          row - matches2,
          gameboard,
          currentPlayer
        )
      ) {
        matches2++;
      } else {
        checkMatch2 = false;
      }
    }
    return matches1 + matches2;
  };

  private getLeftUpDiagonalMatches = (
    col: number,
    row: number,
    gameboard: string[][],
    currentPlayer: string
  ) => {
    let matches1 = 0;
    let checkMatch1 = true;
    while (checkMatch1 && matches1 < this.connectNumber - 1) {
      if (
        this.isBottomLeftMatch(
          col - matches1,
          row - matches1,
          gameboard,
          currentPlayer
        )
      ) {
        matches1++;
      } else {
        checkMatch1 = false;
      }
    }
    let checkMatch2 = true;
    let matches2 = 0;
    while (checkMatch2 && matches2 < this.connectNumber - 1) {
      if (
        this.isTopRightMatch(
          col + matches2,
          row + matches2,
          gameboard,
          currentPlayer
        )
      ) {
        matches2++;
      } else {
        checkMatch2 = false;
      }
    }
    return matches1 + matches2;
  };
}
