<template>
  <div
    class="board"
    :class="{
      player: isPlayerBoard,
      com: !isPlayerBoard,
      active:
        (isPlayerBoard && gameState.paused) ||
        (gameState.playing && !isPlayerBoard),
    }"
  >
    <div class="row" v-for="(row, yIndex) in gameboard.grid" :key="row">
      <div
        @click="handleCellClick(xIndex, yIndex)"
        class="cell"
        :class="{
          player: isPlayerBoard,
          com: !isPlayerBoard,
          missed: cell == -Infinity,
          sunk: cell < 0 && cell != -Infinity,
          ship: isShipCell(cell, xIndex, yIndex),
        }"
        :data-x="xIndex"
        :data-y="yIndex"
        v-for="(cell, xIndex) in row"
        :key="cell"
      >
        <span class="missed" v-if="cell == -Infinity"> &#9675;</span>
        <span class="sunk" v-else-if="cell < 0">&#10008;</span>
        <div v-if="isShipCell(cell, xIndex, yIndex)">
          <Ship draggable="true" :ship="getShip(cell)" />
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import Ship from "./Ship.vue";
export default {
  props: ["gameboard", "isPlayerBoard", "gameState"],
  components: { Ship },
  setup(props, { emit }) {
    function handleCellClick(x, y) {
      if (props.isPlayerBoard || props.gameState.playing == false) {
        return;
      } else if (!props.isPlayerBoard) {
        console.log("here");
        emit("shot", x, y);
      }
    }

    const ships = computed(() => props.gameboard.shipsOnTheBoard);
    const getShip = (shipId) => {
      shipId = Math.abs(shipId);
      return ships.value.get(shipId);
    };

    const isShipCell = (cell, xIndex, yIndex) =>
      props.isPlayerBoard &&
      getShip(cell) != undefined &&
      getShip(cell).getStartingCordinate().x == xIndex &&
      getShip(cell).getStartingCordinate().y == yIndex;

    return { handleCellClick, ships, getShip, isShipCell };
  },
};
</script>

<style scoped>
.board {
  width: 450px;
  height: 450px;
  border: 1px beige solid;
  display: grid;
  gap: 3px;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  margin: 30px 30px;
  --beau-blue: hsla(209, 69%, 84%, 1);
  --orange-soda: hsla(10, 85%, 61%, 1);
  --rich-black-fogra-29: hsla(195, 100%, 6%, 1);
  --flax: hsla(54, 63%, 71%, 1);
  --old-lavender: hsla(273, 5%, 42%, 1);
}
.board {
  cursor: not-allowed;
}
.board.com.active {
  cursor: crosshair;
}
.board.player.active {
  cursor: grabbing;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(209, 69%, 84%, 1);
  border: 2px var(--rich-black-fogra-29) solid;
  margin: 0;
  width: 100%;
  height: 100%;
}
.cell.ship {
  align-items: flex-start;
  justify-content: flex-start;
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
