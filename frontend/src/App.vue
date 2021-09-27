<template>
  <nav-bar></nav-bar>
  <!-- <status></status> -->
  <!-- <administrator v-if="isAdmin"></administrator> -->
  <!-- <user></user> -->
  <main class="mdc-top-app-bar--fixed-adjust">
    <router-view></router-view>
  </main>
</template>

<script>
  // import { mapActions, mapGetters } from "vuex";
  import { mapGetters } from "vuex";

  import NavBar from './components/NavBar.vue';
  // import Status from './components/Status.vue';
  // import Administrator from './components/Administrator.vue';
  // import User from './components/User.vue';

  export default {
    name: 'App',
    components: {
      NavBar,
      // Status,
      // Administrator,
      // User,
    },
    computed: {
      ...mapGetters("accounts", ["isAdmin"])
    }
  }
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
</style>
