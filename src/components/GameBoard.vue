<template>
  <div class="board" :class="{ player: isPlayerBoard, com: !isPlayerBoard }">
    <div class="row" v-for="(row, xIndex) in gameboard.grid" :key="row">
      <div
        @click="handleCellClick(xIndex, yIndex)"
        class="cell"
        :class="{
          player: isPlayerBoard,
          com: !isPlayerBoard,
          missed: cell == -Infinity,
          sunk: cell < 0 && cell != -Infinity,
        }"
        :data-x="xIndex"
        :data-y="yIndex"
        v-for="(cell, yIndex) in row"
        :key="cell"
      >
        <span class="missed" v-if="cell == -Infinity"> &#9675;</span>
        <span class="sunk" v-else-if="cell < 0">&#10008;</span>
        <span v-else-if="isPlayerBoard">{{ cell }}</span>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ["gameboard", "isPlayerBoard"],
  setup(props, { emit }) {
    function handleCellClick(x, y) {
      if (props.isPlayerBoard) {
        return;
      } else if (!props.isPlayerBoard) {
        emit("shot", x, y);
      }
    }
    return { handleCellClick };
  },
};
</script>

<style scoped>
.board {
  width: 450px;
  height: 450px;
  border: 1px beige solid;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  margin: 30px 30px;
  --beau-blue: hsla(209, 69%, 84%, 1);
  --orange-soda: hsla(10, 85%, 61%, 1);
  --rich-black-fogra-29: hsla(195, 100%, 6%, 1);
  --flax: hsla(54, 63%, 71%, 1);
  --old-lavender: hsla(273, 5%, 42%, 1);
}
.board.player {
  cursor: not-allowed;
}
.board.com {
  cursor: crosshair;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  content: "";
  background: var(--beau-blue);
  border: 2px var(--rich-black-fogra-29) solid;
  margin: 0;
  width: 100%;
  height: 100%;
}
.cell.com:hover {
  background: var(--flax);
}
.cell.com:active {
  background: var(--orange-soda);
}
.cell.missed,
.cell.missed:active,
.cell.missed:hover {
  color: var(--rich-black-fogra-29);
  background: var(--flax);
  cursor: not-allowed;
}

.cell.sunk,
.cell.sunk:active,
.cell.sunk.cell:hover {
  background: var(--flax);
  color: var(--orange-soda);
  cursor: not-allowed;
}
</style>
