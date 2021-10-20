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
  gameBoard.receiveAttack(4, 2); //sinking ship 4
  gameBoard.receiveAttack(7, 2);
  gameBoard.receiveAttack(7, 3);
  gameBoard.receiveAttack(7, 4);
  gameBoard.receiveAttack(7, 5);

  expect(gameBoard.areAllShipSunk()).toBe(true);
});

test("if the given coordinates are full or out of bounds should checkCordinates should return false", () => {
  const ship1 = createShip(4);
  const ship2 = createShip(4);
  //a vertical ship
  ship2.changeDirection();

  const gameBoard = createGameBoard();

  gameBoard.placeShip(ship1, 3, 4);
  gameBoard.placeShip(ship2, 2, 4);

  // all the space first ship occupies
  expect(gameBoard.checkCordinates(3, 4)).toBe(false);
  expect(gameBoard.checkCordinates(4, 4)).toBe(false);
  expect(gameBoard.checkCordinates(5, 4)).toBe(false);
  expect(gameBoard.checkCordinates(6, 4)).toBe(false);

  //all the space second ship occupies
  expect(gameBoard.checkCordinates(2, 4)).toBe(false);
  expect(gameBoard.checkCordinates(2, 5)).toBe(false);
  expect(gameBoard.checkCordinates(2, 6)).toBe(false);
  expect(gameBoard.checkCordinates(2, 7)).toBe(false);

  //check if index is out of bounds
  expect(gameBoard.checkCordinates(3, -1)).toBe(false);
  expect(gameBoard.checkCordinates(12, 4)).toBe(false);
  expect(gameBoard.checkCordinates(3, -1)).toBe(false);
  expect(gameBoard.checkCordinates(0, 10)).toBe(false);
  expect(gameBoard.checkCordinates(10, 0)).toBe(false);
});

test("if we can place ship at the given coordinates", () => {
  const ship1 = createShip(4);
  const ship2 = createShip(4);
  //a vertical ship
  ship2.changeDirection();

  const gameBoard = createGameBoard();

  gameBoard.placeShip(ship1, 3, 4);
  gameBoard.placeShip(ship2, 2, 4);

  expect(gameBoard.isThereSpaceAt(3, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(1, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(5, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(0, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(10, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(7, 4, ship1)).toBe(false);
  expect(gameBoard.isThereSpaceAt(3, 5, ship1)).toBe(true);
  expect(gameBoard.isThereSpaceAt(2, 4, ship2)).toBe(false);
  expect(gameBoard.isThereSpaceAt(2, 0, ship2)).toBe(true);
  expect(gameBoard.isThereSpaceAt(2, 9, ship2)).toBe(false);
  expect(gameBoard.isThereSpaceAt(2, 7, ship2)).toBe(false);
  expect(gameBoard.isThereSpaceAt(2, 7, ship2)).toBe(false);
  expect(gameBoard.isThereSpaceAt(5, 5, ship2)).toBe(true);
  expect(gameBoard.isThereSpaceAt(2, 8, ship2)).toBe(false);
});

test("we can reposition a ship given the id and coordinates", () => {
  const ship1 = createShip(4);
  const ship2 = createShip(4);
  //a vertical ship
  ship2.changeDirection();

  const gameBoard = createGameBoard();

  gameBoard.placeShip(ship1, 3, 4);
  gameBoard.placeShip(ship2, 2, 4);

  gameBoard.reposition(1, 6, 3);
  expect(ship1.getCoordinates()).toStrictEqual([6, 7, 8, 9]);
  expect(gameBoard.isThereSpaceAt(3, 4, ship1)).toBe(true);
});
