<template>
  <h2>BATTLESHIP</h2>
  <Game />
</template>

<script>
import Game from "./components/Game.vue";
export default {
  name: "App",
  components: { Game },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  --beau-blue: hsla(209, 69%, 84%, 1);
  --orange-soda: hsla(10, 85%, 61%, 1);
  --rich-black-fogra-29: hsla(195, 100%, 6%, 1);
  --flax: hsla(54, 63%, 71%, 1);
  --old-lavender: hsla(273, 5%, 42%, 1);
  --star-command-blue: hsla(202, 66%, 39%, 1);
  --raisin-black: hsla(244, 17%, 20%, 1);
  --xiketic: hsla(231, 28%, 10%, 1);
  --corn: hsla(58, 77%, 59%, 1);
  --cultured: hsla(0, 0%, 98%, 1);
  overflow: hidden;

  background: var(--cultured);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h2 {
  font-size: 85px;
  margin-top: 2px;
  margin-bottom: 3px;
  letter-spacing: 12px;
}
</style>
