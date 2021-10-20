export function createGameBoard() {
  return {
    grid: Array.from(Array(10), () => new Array(10)),

    shipsOnTheBoard: new Map(),

    numberOfShips: 0,

    placeShip(ship, xCordinate, yCordinate, id) {
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
      ship.setCoordinates(
        shipCordinates,
        ship.isHorizontal ? yCordinate : xCordinate
      );
      const shipId = id || this.numberOfShips;
      this.shipsOnTheBoard.set(shipId, ship);

      return ship;
    },
    reposition(shipId, xCordinate, yCordinate) {
      const ship = this.shipsOnTheBoard.get(shipId);
      if (!this.isThereSpaceAt(xCordinate, yCordinate, ship)) {
        throw new Error("no space for that ship there");
      }
      this.shipsOnTheBoard.delete(shipId);
      let prevHorizontal;
      if (ship.fixedCordinate.x == null) {
        prevHorizontal = true;
      } else {
        prevHorizontal = false;
      }
      const startingPoint = ship.getCoordinates()[0];
      if (prevHorizontal) {
        const exY = ship.fixedCordinate.y;
        for (let i = startingPoint; i < startingPoint + ship.length; i++) {
          this.grid[exY][i] = undefined;
        }
      } else {
        const exX = ship.fixedCordinate.x;
        for (let i = startingPoint; i < startingPoint + ship.length; i++) {
          this.grid[i][exX] = undefined;
        }
      }
      this.placeShip(ship, xCordinate, yCordinate, shipId);
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
