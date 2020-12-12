export enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

export type Position = {
  X: number;
  Y: number;
};

export class Ship {
  private position: Position;
  private facing: Direction;

  constructor(position: Position, facing: Direction) {
    this.position = position;
    this.facing = facing;
  }

  public move(direction: Direction | "FORWARD", amount: number): void {
    const axis = this.getAxis(direction);
    const signedAmount = this.getAmountSign(direction) * amount;

    this.position = {
      ...this.position,
      [axis]: this.position[axis] + signedAmount,
    };
  }

  public turn(direction: "LEFT" | "RIGHT", degrees: 90 | 180 | 270): void {
    const howManyTurns = degrees / 90;
    for (let i = 0; i < howManyTurns; i++) {
      this.turn90(direction);
    }
  }

  public getPosition() {
    return this.position;
  }

  public getManhattanDistance() {
    return Math.abs(this.position.X) + Math.abs(this.position.Y);
  }

  private getAxis(direction: Direction | "FORWARD"): "X" | "Y" {
    switch (direction) {
      case "FORWARD":
        return this.getAxis(this.facing);
      case Direction.NORTH:
      case Direction.SOUTH:
        return "Y";
      default:
        return "X";
    }
  }

  private getAmountSign(direction: Direction | "FORWARD"): -1 | 1 {
    switch (direction) {
      case "FORWARD":
        return this.getAmountSign(this.facing);
      case Direction.WEST:
      case Direction.SOUTH:
        return -1;
      default:
        return 1;
    }
  }

  private turn90(direction: "LEFT" | "RIGHT"): void {
    let newFacing = this.facing + 1 * (direction === "RIGHT" ? 1 : -1);
    if (newFacing > 3) {
      newFacing = 0;
    }
    if (newFacing < 0) {
      newFacing = 3;
    }
    this.facing = newFacing;
  }
}
