<template>
  <nav-bar></nav-bar>
  <status></status>
  <reputation></reputation>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Status from './components/Status.vue';
import Reputation from './components/Reputation.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Status,
    Reputation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
