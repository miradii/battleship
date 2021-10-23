<template>
  <div class="hud">
    <h3 class="message">
      {{ message }}
    </h3>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style scoped>
.hud {
  background: hsla(10, 85%, 61%, 1);
  color: darkblue;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 22px;
  width: 100%;
  height: 13%;
  position: fixed;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  bottom: 0;
}
</style>
