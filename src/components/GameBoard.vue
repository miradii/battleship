<template>
  <div class="board">
    <div class="row"  v-for="(row,xIndex) in gameboard.grid" :key="row">
      <div class="cell" :data-x="xIndex" :data-y="yIndex" v-for="(cell,yIndex) in row" :key="cell">{{ cell }}</div>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  props: ["gameboard"],
  setup(){
      const xs = [0,1,2,3,4,5,6,7,8,9];
      const ys = [0,1,2,3,4,5,6,7,8,9];
      return {xs,ys}
    }
};
</script>

<style scoped>
.board {
  width: 450px;
  height: 450px;
  border: 1px beige solid;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10,10%);
  margin: 30px 30px;
}
.cell {
  content: "";
  background: lightblue;
  border: 2px black solid;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
