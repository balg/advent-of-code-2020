import { Ship, Direction } from "./ship";
import { input } from "./input";

const ship = new Ship({ X: 0, Y: 0 }, Direction.EAST);

console.log(ship.getPosition());

// ship.move("FORWARD", 10);
// ship.move(Direction.NORTH, 3);
// ship.move("FORWARD", 7);
// ship.turn("RIGHT", 90);
// ship.move("FORWARD", 11);

input.split(" ").map((line) => {
  let action = line.slice(0, 1);
  const amount = Number(line.slice(1));

  switch (action) {
    case "F":
      return ship.move("FORWARD", amount);
    case "N":
      return ship.move(Direction.NORTH, amount);
    case "E":
      return ship.move(Direction.EAST, amount);
    case "S":
      return ship.move(Direction.SOUTH, amount);
    case "W":
      return ship.move(Direction.WEST, amount);
    case "R":
    case "L":
      if (amount !== 90 && amount !== 180 && amount !== 270) {
        throw new Error("The action is TURN but the amount is not 90/180/270");
      }
      return ship.turn(action === "R" ? "RIGHT" : "LEFT", amount);
    default:
      break;
  }
});

console.log({
  position: ship.getPosition(),
  manhattanDistance: ship.getManhattanDistance(),
});
