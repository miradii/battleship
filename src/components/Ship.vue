<template>
  <div
    class="ship"
    :class="{ vertical: !ship.isHorizontal, horizontal: ship.isHorizontal }"
  >
    <div
      class="shipblock"
      v-for="x in ship.getCoordinates()"
      :key="x"
      :class="{ destroyed: x < 0 }"
    ></div>
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
  border-radius: 12px;
  margin: 8px 6px;
  border: 1px gray solid;
  color: antiquewhite;
  background: rgba(0, 180, 72, 1);
  z-index: 2;
}
.shipblock.destroyed {
  background: hsla(0, 0%, 98%, 1);
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
