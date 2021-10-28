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
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @contextmenu.prevent="handleRightClick"
        class="cell"
        :id="++cellId"
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
        <span
          class="sunk"
          v-else-if="cell < 0 && !isPlayerBoard && !getShip(cell).isSunk()"
          >&#9760;</span
        >
        <span v-if="isShipCell(cell, xIndex, yIndex)">
          <Ship :ship="getShip(cell)" />
        </span>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import Ship from "./Ship.vue";
export default {
  props: ["gameboard", "isPlayerBoard", "gameState", "player"],
  components: { Ship },
  setup(props, { emit }) {
    let placedShips = ref(1);
    let cellId = 0;
    const currentShip = computed(() => {
      if (placedShips.value <= 5) return getShip(placedShips.value);
      else return null;
    });
    function handleCellClick(x, y) {
      if (
        props.isPlayerBoard &&
        props.gameState.setup == true &&
        props.gameboard.isThereSpaceAt(x, y, currentShip.value)
      ) {
        props.gameboard.placeShip(currentShip.value, x, y);
        if (placedShips.value < 5) placedShips.value++;
        else {
          placedShips.value++;
          emit("setupFinished");
        }
      } else if (!props.isPlayerBoard && props.gameState.playing == true) {
        emit("shot", x, y);
        console.log(ships.value);
      }
    }

    function handleMouseEnter(e) {
      if (props.isPlayerBoard && props.gameState.setup == true) {
        const x = Number(e.target.dataset.x);
        const y = Number(e.target.dataset.y);
        const id = Number(e.target.id);
        const ship = currentShip.value;
        let interval = 10;
        if (ship.isHorizontal) {
          interval = 1;
        }
        if (props.gameboard.isThereSpaceAt(x, y, ship)) {
          for (let i = 0; i < ship.length; i++) {
            document
              .getElementById(`${id + i * interval}`)
              .classList.add("candidate");
          }
        }
      }
    }

    function handleMouseLeave() {
      if (props.isPlayerBoard && props.gameState.setup == true)
        document
          .querySelectorAll(".candidate")
          .forEach((cell) => cell.classList.remove("candidate"));
    }

    function handleRightClick(e) {
      if (props.isPlayerBoard && props.gameState.setup == true) {
        currentShip.value.changeDirection();
        handleMouseLeave();
        handleMouseEnter(e);
      }
    }

    const ships = computed(() => props.gameboard.shipsOnTheBoard);
    const getShip = (shipId, ship) => {
      if (ship) return ship;
      else {
        shipId = Math.abs(shipId);
        return ships.value.get(shipId);
      }
    };

    const isShipCell = (cell, xIndex, yIndex) =>
      getShip(cell) != undefined &&
      (props.isPlayerBoard || getShip(cell).isSunk()) &&
      (getShip(cell).getStartingCordinate().x == xIndex ||
        getShip(cell).getStartingCordinate().x == -xIndex ||
        (xIndex == 0 && getShip(cell).getStartingCordinate().x == -10)) &&
      (getShip(cell).getStartingCordinate().y == yIndex ||
        getShip(cell).getStartingCordinate().y == -yIndex ||
        (yIndex == 0 && getShip(cell).getStartingCordinate().y == -10));

    return {
      handleCellClick,
      ships,
      getShip,
      isShipCell,
      handleMouseEnter,
      cellId,
      handleMouseLeave,
      handleRightClick,
    };
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
  margin: 30px 190px;
  margin-top: 4px;
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
  cursor: pointer;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(202, 66%, 39%, 1);
  border: 2px var(--rich-black-fogra-29) solid;
  margin: 0;
  width: 100%;
  height: 100%;
}

.cell.ship {
  align-items: flex-start;
  justify-content: flex-start;
}
.cell.candidate {
  background: hsla(231, 28%, 10%, 1);
  cursor: pointer;
}
.cell.com:hover {
  background: #2e7901;
}
.cell.missed,
.cell.missed.com.missed:hover {
  color: var(--rich-black-fogra-29);
  font-size: 35px;
  cursor: not-allowed;
}

.cell.sunk,
.cell.sunk.cell:hover {
  color: var(--rich-black-fogra-29);
  background: var(--beau-blue);
  font-size: 35px;
  cursor: not-allowed;
}
</style>
