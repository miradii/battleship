<template>
  <div class="ship" :class={vertical:!ship.isHorizontal,horizontal:ship.isHorizontal}>
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
  width: 100%;
  height: 100%;
  color: antiquewhite;
}
.ship.horizontal {
    z-index: -1;
    display: flex;
    flex-direction: row; 
  }
</style>
