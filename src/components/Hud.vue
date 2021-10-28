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
  color: hsla(231, 28%, 10%, 1);
  background: hsla(0, 0%, 98%, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 22px;
  width: 100%;
  text-align: center;
  height: 8%;
  position: fixed;
  padding: 20px;
  padding-left: 0px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  bottom: 0;
}
</style>
