import { createGameBoard } from "./GameBoard";
import { createPlayer } from "./Player";
import { createShip } from "./Ship";
function startGame() {
  const turn = [];
  turn["player"] = true;
  turn["com"] = false;
  const gameState = { playing: false, paused: true, over: false };
  const playerShips = [];
  playerShips.push(createShip(2));
  playerShips.push(createShip(3));
  playerShips.push(createShip(4));
  playerShips.push(createShip(3));
  playerShips.push(createShip(1));

  const comShips = [];
  comShips.push(createShip(2));
  comShips.push(createShip(3));
  comShips.push(createShip(4));
  comShips.push(createShip(3));
  comShips.push(createShip(1));

  const playerGameBoard = createGameBoard();
  const comGameBoard = createGameBoard();
  randomizeShips(playerGameBoard, playerShips);
  randomizeShips(comGameBoard, comShips);
  const player = createPlayer(true, comGameBoard, turn);
  const comPlayer = createPlayer(false, playerGameBoard, turn);

  return { player, comPlayer, gameState };
}
function randomizeShips(aGameBoard, anArrayOfShips) {
  anArrayOfShips.forEach((ship) => {
    let x = -1;
    let y = -1;
    while (aGameBoard.isThereSpaceAt(x, y, ship) === false) {
      ship.changeDirection();
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    aGameBoard.placeShip(ship, x, y);
  });
}
export { startGame };
