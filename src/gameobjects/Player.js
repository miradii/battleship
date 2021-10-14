function createPlayer(human, board) {
  return {
    isHuman: human,
    ships: [],
    enemyBoard: board,
    turn: false,
    previousShots: [],
    play(xCordinate = -1, yCordinate = -1) {
      if (this.isHuman) {
        this.enemyBoard.receiveAttack(xCordinate, yCordinate);
      } else {
        while (this.previousShot.includes({ x: xCordinate, y: yCordinate })) {
          xCordinate = Math.floor(Math.random() * 10);
          yCordinate = Math.floor(Math.random() * 10);
        }
        this.enemyBoard.receiveAttack(xCordinate, yCordinate);
      }
    },
  };
}

return { createPlayer };
