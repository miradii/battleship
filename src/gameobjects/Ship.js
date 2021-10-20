function createShip(lengthInput) {
  return {
    length: lengthInput,
    coordinates: [],
    isHorizontal: true,
    fixedCordinate: { x: null, y: null },

    isSunk() {
      return (
        this.getCoordinates().length > 0 &&
        this.coordinates.reduce((acc, position) => acc && position < 0, true)
      );
    },
    setCoordinates(array, fixed) {
      this.coordinates = array;
      if (this.isHorizontal) {
        this.fixedCordinate = { x: null, y: fixed };
      } else {
        this.fixedCordinate = { x: fixed, y: null };
      }
    },
    getCoordinates() {
      return this.coordinates;
    },
    hit(position) {
      const index = this.coordinates.indexOf(position);
      this.coordinates[index] = 0 - this.coordinates[index];
    },
    changeDirection() {
      this.isHorizontal = !this.isHorizontal;
    },
  };
}

export { createShip };
