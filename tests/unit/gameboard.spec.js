import { createGameBoard } from "../../src/gameobjects/GameBoard.js";
import { createShip } from "../../src/gameobjects/Ship";
test("we can create a Game Board by calling the factory function", () => {
  const gameBoard = createGameBoard();
  expect(gameBoard).toBeDefined();
});

test("place ship at the given coordinates and get the ship cordinates", () => {
  const ship = createShip(4);
  const gameBoard = createGameBoard();
  gameBoard.placeShip(ship, 3, 4);
  expect(ship.getCoordinates()).toStrictEqual([3, 4, 5, 6]);
});

test("when given an attack the ship located at the position gets hit", () => {
  const ship = createShip(4);

  const gameBoard = createGameBoard();

  gameBoard.placeShip(ship, 3, 4);
  gameBoard.receiveAttack(3, 4);

  expect(ship.getCoordinates()).toStrictEqual([-3, 4, 5, 6]);

  gameBoard.receiveAttack(5, 4);
  expect(ship.getCoordinates()).toStrictEqual([-3, 4, -5, 6]);
});

test("when some cordinates is a hit the position on the grid is marked by a negative number", () => {
  const ship = createShip(4);
  const gameBoard = createGameBoard();
  gameBoard.placeShip(ship, 3, 4);
  gameBoard.receiveAttack(3, 4);
  expect(gameBoard.grid[4][3]).toBeLessThan(0);
});

test("when an attack misses the position on the board is marked as -Infinity", () => {
  const gameBoard = createGameBoard();
  gameBoard.receiveAttack(4, 8);
  expect(gameBoard.grid[8][4]).toBe(-Infinity);
});

test("check if all ships are sunk", () => {
  const ship1 = createShip(2);
  const ship2 = createShip(3);
  const ship3 = createShip(2);
  const ship4 = createShip(4);

  ship4.changeDirection();

  const gameBoard = createGameBoard();

  gameBoard.placeShip(ship1, 2, 3);
  gameBoard.placeShip(ship2, 4, 7);
  gameBoard.placeShip(ship3, 3, 2);
  gameBoard.placeShip(ship4, 7, 2);
  //sinking ship 1
  gameBoard.receiveAttack(2, 3);
  gameBoard.receiveAttack(3, 3);
  //sinking ship 2
  gameBoard.receiveAttack(4, 7);
  gameBoard.receiveAttack(5, 7);
  gameBoard.receiveAttack(6, 7);
  //sinking ship 3
  gameBoard.receiveAttack(3, 2);
  gameBoard.receiveAttack(4, 2);
  //sinking ship 4
  gameBoard.receiveAttack(7, 2);
  gameBoard.receiveAttack(7, 3);
  gameBoard.receiveAttack(7, 4);
  gameBoard.receiveAttack(7, 5);

  expect(gameBoard.areAllShipSunk()).toBe(true);
});

//TODO make place ship so it throws when you place it on occupied cells
