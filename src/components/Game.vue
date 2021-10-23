<template>
  <div class="boards">
    <div>
      <h3>Player Board</h3>
      <GameBoard
        :gameboard="playerboard"
        :isPlayerBoard="true"
        :gameState="state"
        :key="playerKey"
      />
    </div>
    <div>
      <h3>Computer Board</h3>
      <GameBoard
        :gameboard="comboard"
        :isPlayerBoard="false"
        :gameState="state"
        @shot="handleRound"
        :key="comKey"
      />
    </div>
  </div>
  <div class="controls">
    <button v-if="state.over" @click="handleStart" id="startBtn">
      New Game
    </button>
    <button v-if="state.playing" id="stopBtn" @click="handleStop">
      Stop Game
    </button>
    <button v-if="state.paused" id="stopBtn" @click="handleStart">
      Start Game
    </button>
  </div>
  <Hud :message="hudMessage" />
</template>

<script>
import { startGame } from "../gameobjects/Game";
import GameBoard from "./GameBoard.vue";
import Hud from "./Hud.vue";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  name: "Game",
  components: {
    Hud,
    GameBoard,
  },
  setup() {
    // put everything we get from a game object on a ref so they are reactive
    let playerboard = ref(null);
    let comboard = ref(null);
    let state = ref(null);
    let hudMessage = ref("Press Start");
    let game = startGame();
    let { player, comPlayer, gameState } = game;
    playerboard.value = comPlayer.enemyBoard;
    comboard.value = player.enemyBoard;
    state.value = gameState;
    //By updating these keys we can rerender a component
    let playerKey = ref(true);
    let comKey = ref(true);

    //clickHandlers
    const handleRound = (x, y) => {
      player.play(x, y);
      comPlayer.play();
      (comKey.value = !comKey.value), (playerKey.value = !comKey.value);
      if (comPlayer.enemyBoard.areAllShipSunk()) {
        state.value = {
          playing: false,
          paused: false,
          over: true,
        };
        hudMessage.value = "You Lost, Maybe Next Time :(";
        (comKey.value = !comKey.value), (playerKey.value = !comKey.value);
      }
      if (player.enemyBoard.areAllShipSunk()) {
        state.value = {
          playing: false,
          paused: false,
          over: true,
        };
        hudMessage.value = "You Win. Congratualtions :)";
        (comKey.value = !comKey.value), (playerKey.value = !comKey.value);
      }
    };
    watch(state, () => {
      (comKey.value = !comKey.value), (playerKey.value = !comKey.value);
    });
    const handleStart = () => {
      if (state.value.paused) {
        state.value = {
          playing: true,
          paused: false,
          over: false,
        };
      } else {
        game = startGame();
        const {
          player: newplayer,
          comPlayer: newcomPlayer,
          gameState: newgameState,
        } = game;
        player = newplayer;
        comPlayer = newcomPlayer;
        gameState = newgameState;
        playerboard.value = comPlayer.enemyBoard;
        comboard.value = player.enemyBoard;
        state.value = gameState;
      }
    };
    const handleStop = () => {
      state.value = {
        playing: false,
        paused: false,
        over: true,
      };
    };
    return {
      playerboard,
      comboard,
      handleRound,
      playerKey,
      comKey,
      state,
      handleStart,
      handleStop,
      hudMessage,
    };
  },
};
</script>

<style>
.boards {
  display: flex;
  justify-content: center;
  width: 100%;
}
.controls {
  margin: 20px 20px;
}
</style>
