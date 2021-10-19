<template>
  <div class="boards">
    <div>
      <h3>Player Board</h3>
      <GameBoard
        :gameboard="playerboard"
        :isPlayerBoard="true"
        :key="playerKey"
      />
    </div>
    <div>
      <h3>Computer Board</h3>
      <GameBoard
        :gameboard="comboard"
        :isPlayerBoard="false"
        @shot="handleRound"
        :key="comKey"
      />
    </div>
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
    const { player, comPlayer } = startGame();
    playerboard.value = comPlayer.enemyBoard;
    comboard.value = player.enemyBoard;

    //By updating these keys we can rerender a component
    let playerKey = ref(0);
    let comKey = ref(2000);

    //clickHandlers
    const handleRound = (x, y) => {
      player.play(x, y);
      comKey.value--;
      comPlayer.play();
      playerKey.value++;
    };
    return { playerboard, comboard, handleRound, playerKey, comKey };
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
