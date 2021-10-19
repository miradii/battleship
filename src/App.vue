<template>
<div class="boards">
  <GameBoard :gameboard="playerboard" />
  <GameBoard :gameboard="comboard" />
</div>
</template>

<script>
import { startGame } from "./gameobjects/Game";
import GameBoard from "./components/GameBoard.vue";
import { ref } from "@vue/reactivity";

export default {
  name: "App",
  components: {
    GameBoard,
  },
  setup() {
    const playerboard = ref(null);
    const comboard = ref(null);
    const { playerGameBoard, comGameBoard } = startGame();
    playerboard.value = playerGameBoard;
    comboard.value = comGameBoard;
    return { playerboard,comboard };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.boards {
    display: flex;
  }
</style>
