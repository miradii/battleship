function createPlayer(human, board, turn) {
  return {
    isHuman: human,
    ships: [],
    enemyBoard: board,
    previousShots: Array.from(Array(10), () => new Array(10)),
    toggleTurn() {
      turn["player"] = !turn["player"];
      turn["com"] = !turn["com"];
    },
    play(xCordinate = -1, yCordinate = -1) {
      if (this.isHuman && turn["player"]) {
        if (this.previousShots[xCordinate][yCordinate] == undefined) {
          this.enemyBoard.receiveAttack(xCordinate, yCordinate);
          this.previousShots[xCordinate][yCordinate] = true;
          this.toggleTurn();
        }
      } else if (!this.isHuman && turn["com"]) {
        xCordinate = Math.floor(Math.random() * 10);
        yCordinate = Math.floor(Math.random() * 10);

        while (this.previousShots[xCordinate][yCordinate] == true) {
          xCordinate = Math.floor(Math.random() * 10);
          yCordinate = Math.floor(Math.random() * 10);
        }
        this.previousShots[xCordinate][yCordinate] = true;
        this.enemyBoard.receiveAttack(xCordinate, yCordinate);
        this.toggleTurn();
      }
    },
  };
}

export { createPlayer };
