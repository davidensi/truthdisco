<template>
  <nav-bar></nav-bar>
  <status></status>
  <administrator v-if="isAdmin"></administrator>
  <user></user>
</template>

<script>
  // import { mapActions, mapGetters } from "vuex";
  import { mapGetters } from "vuex";

  import NavBar from './components/NavBar.vue';
  import Status from './components/Status.vue';
  import Administrator from './components/Administrator.vue';
  import User from './components/User.vue';

  export default {
    name: 'App',
    components: {
      NavBar,
      Status,
      Administrator,
      User,
    },
    computed: {
      ...mapGetters("accounts", ["isAdmin"])
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
