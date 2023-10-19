import { ConnectFourGame } from './connect-four-game';

describe('connectFourGame', () => {
  const game = new ConnectFourGame();
  beforeEach(() => {
    game.reset();
  });
  it('should have 7 columns', () => {
    expect(game.gameboard.length).toEqual(7);
  });
  it('each column should have 6 rows', () => {
    game.gameboard.every((col) => expect(col.length).toEqual(6));
  });
  it('should have player1 in first column, first row', () => {
    game.addPiece(0);
    expect(game.gameboard[0][0]).toEqual(game.player1);
  });
  it('should have player2 in first column, second row', () => {
    game.addPiece(0);
    game.addPiece(0);
    expect(game.gameboard[0][1]).toEqual(game.player2);
  });
  it('should have player1 as winner (vertical)', () => {
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    expect(game.winner).toEqual(game.player1);
  });
  it('should have player2 as winner (vertical)', () => {
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(2);
    game.addPiece(1);
    expect(game.winner).toEqual(game.player2);
  });
  it('should have player1 as winner (horizontal)', () => {
    game.addPiece(0);
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(1);
    game.addPiece(2);
    game.addPiece(2);
    game.addPiece(3);
    expect(game.winner).toEqual(game.player1);
  });
  it('should have player2 as winner (vertical)', () => {
    game.addPiece(0);
    game.addPiece(1);
    game.addPiece(0);
    game.addPiece(2);
    game.addPiece(0);
    game.addPiece(3);
    game.addPiece(2);
    game.addPiece(4);
    expect(game.winner).toEqual(game.player2);
  });
});
