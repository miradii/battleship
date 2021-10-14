export function createGameBoard() {
  return {
    grid: Array.from(Array(10), () => new Array(10)),

    shipsOnTheBoard: new Map(),

    numberOfShips: 0,

    placeShip(ship, xCordinate, yCordinate) {
      this.numberOfShips++;
      let startingPoint = 0;

      if (ship.isHorizontal) {
        for (let i = 0; i < ship.length; i++) {
          //set location of the grid to the ship id
          this.grid[yCordinate][xCordinate + i] = this.numberOfShips;
        }
        startingPoint = xCordinate;
      } else {
        for (let i = 0; i < ship.length; i++) {
          //set location of the grid to the ship id
          this.grid[yCordinate + i][xCordinate] = this.numberOfShips;
        }
        startingPoint = yCordinate;
      }

      let shipCordinates = Array(ship.length).fill(startingPoint);

      shipCordinates = shipCordinates.map((el, i) => el + i);
      ship.setCoordinates(shipCordinates);

      this.shipsOnTheBoard.set(this.numberOfShips, ship);

      return ship;
    },

    receiveAttack(xCordinate, yCordinate) {
      const attackedCell = this.grid[yCordinate][xCordinate];

      if (attackedCell > 0) {
        const attackedShipId = this.grid[yCordinate][xCordinate];
        const attackedShip = this.shipsOnTheBoard.get(attackedShipId);

        if (attackedShip.isHorizontal) {
          attackedShip.hit(xCordinate);
        } else {
          attackedShip.hit(yCordinate);
        }

        this.grid[yCordinate][xCordinate] = 0 - attackedShipId;
      } else if (attackedCell == undefined) {
        this.grid[yCordinate][xCordinate] = -Infinity;
      }
    },

    areAllShipSunk() {
      let res = true;
      this.shipsOnTheBoard.forEach((ship) => (res = res && ship.isSunk()));
      return res;
    },

    checkCordinates(x, y) {
      if (x > 9 || x < 0 || y > 9 || y < 0 || this.grid[y][x] != undefined) {
        return false;
      } else {
        return true;
      }
    },

    isThereSpaceAt(x, y, ship) {
      let res = true;
      if (ship.isHorizontal) {
        for (let i = x; i < x + ship.length; i++) {
          res = res && this.checkCordinates(i, y);
        }
      } else {
        for (let i = y; i < y + ship.length; i++) {
          res = res && this.checkCordinates(x, i);
        }
      }
      return res;
    },
  };
}
