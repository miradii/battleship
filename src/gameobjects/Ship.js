function createShip(lengthInput) {
  return {
    length: lengthInput,
    coordinates: [],
    isHorizontal: true,

    isSunk() {
      return (
        this.getCoordinates().length > 0 &&
        this.coordinates.reduce((acc, position) => acc && position < 0, true)
      );
    },
    setCoordinates(array) {
      this.coordinates = array;
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
