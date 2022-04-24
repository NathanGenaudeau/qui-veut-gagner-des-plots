<template>
  <div class="presentation">
    <router-link class="start" :to="{ name: 'Home' }">Jouer</router-link>
  </div>
</template>

<script>
export default {
  name: 'Presentation',
};
</script>

<style>
.presentation {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1080px;
  background-image: url("background_presentation.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.start {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 75px;
  background-color: green;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-top: 850px;
  border: 1px solid white;
}
</style>
