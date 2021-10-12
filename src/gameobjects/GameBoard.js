export function createGameBoard() {
  return {
    grid: Array(10).fill(Array(10)),
    shipsOnTheBoard: new Map(),
    numberOfShips: 0,
    placeShip(ship, xCordinate, yCordinate) {
      let startingPoint = 0;
      if (ship.isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          //set location of the grid to the ship id
          this.grid[xCordinate + i][yCordinate] = this.numberOfShips;
        }
        startingPoint = xCordinate;
      } else {
        for (let i = 0; i < ship.length; i++) {
          //set location of the grid to the ship id
          this.grid[xCordinate][yCordinate + i] = this.numberOfShips;
        }
        startingPoint = yCordinate;
      }
      let shipCordinates = Array(ship.length).fill(startingPoint);
      shipCordinates = shipCordinates.map((el, i) => el + i);
      ship.setCoordinates(shipCordinates);
      this.shipsOnTheBoard.set(this.numberOfShips, ship);
      return ship.getCoordinates();
    },
  };
}
