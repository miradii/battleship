import { createShip } from "../../src/gameobjects/Ship.js";

test("test ship length", () => {
  expect(createShip(4).length).toBe(4);
});

test("if it's not sunk when coordinates are not set", () => {
  const ship = createShip(4);
  expect(ship.isSunk()).toBe(false);
});
test("if it's not sunk when not all positions are hit", () => {
  const ship = createShip(4);
  ship.setCoordinates([1, 2, 3, 4]);
  ship.hit(1);
  ship.hit(3);
  expect(ship.isSunk()).toBe(false);
});
test("we can set the coordinates", () => {
  expect(createShip(4).setCoordinates).toBeDefined();
});

test("we can get the correct coordinates", () => {
  const ship = createShip(4);
  ship.setCoordinates([1, 2, 3, 4], 2);
  expect(ship.getCoordinates()).toStrictEqual([1, 2, 3, 4]);
  expect(ship.fixedCordinate).toStrictEqual({ x: null, y: 2 });
});

test("the ship has a hit method", () => {
  const ship = createShip(4);
  expect(ship.hit).toBeDefined();
});

test("when we hit the ship at a given position the given coordinate turns negative to mark where it's hit", () => {
  const ship = createShip(4);
  ship.setCoordinates([1, 2, 3, 4], 2);
  ship.hit(2);
  expect(ship.getCoordinates()).toStrictEqual([1, -2, 3, 4]);
});

test("when all positions of the ship are hit it is sunk", () => {
  const ship = createShip(4);
  ship.setCoordinates([1, 2, 3, 4], 4);
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  ship.hit(4);
  expect(ship.isSunk()).toBe(true);
});

test("ship direction is horizontal at initiation", () => {
  const ship = createShip(3);
  expect(ship.isHorizontal).toBe(true);
});

test("we can change the ship direction using changeDirection method", () => {
  const ship = createShip(4);
  ship.changeDirection();
  expect(ship.isHorizontal).toBe(false);
  ship.changeDirection();
  expect(ship.isHorizontal).toBe(true);
});
