<template>
  <div
    class="ship"
    :class="{ vertical: !ship.isHorizontal, horizontal: ship.isHorizontal }"
  >
    <div class="shipblock" v-for="x in ship.getCoordinates()" :key="x"></div>
  </div>
</template>

<script>
export default {
  props: ["ship"],
};
</script>

<style>
.shipblock {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 8px 7px;
  border: 1px white solid;
  color: antiquewhite;
  background: hsla(273, 5%, 42%, 0.6);
  z-index: 2;
}
.ship.horizontal {
  display: flex;
  flex-direction: column;
}
.ship.vertical {
  display: flex;
  flex-direction: row;
}
</style>
