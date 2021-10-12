import { createGameBoard } from "../../src/gameobjects/GameBoard.js";
import { createShip } from "../../src/gameobjects/Ship";
test("we can create a Game Board by calling the factory function", () => {
  const gameBoard = createGameBoard();
  expect(gameBoard).toBeDefined();
});

test("place ship at the given coordinates and get the ship cordinates", () => {
  const ship = createShip(4);
  const gameBoard = createGameBoard();
  expect(gameBoard.placeShip(ship, 3, 4)).toStrictEqual([3, 4, 5, 6]);
});
