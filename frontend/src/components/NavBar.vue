<template>
 <header class="mdc-top-app-bar">
   <div class="mdc-top-app-bar__row">
     <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
        @click="goHome">
        <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button>
        <span class="mdc-top-app-bar__title ">TruthDisco</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <button class="mdc-button mdc-theme--on-primary mdc-button--touch" @click="goHome">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label">User</span>
        </button>
        <button class="mdc-button mdc-theme--on-primary mdc-button--touch" @click="goToAdmin">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__touch"></span>
          <span class="mdc-button__label">Administrator</span>
        </button>
        <button v-if="isUserConnected" @click="disconnectWeb3Modal" class="material-icons mdc-top-app-bar__action-item mdc-icon-button">link</button>
        <button v-if="!isUserConnected" @click="connectWeb3Modal" class="material-icons mdc-top-app-bar__action-item mdc-icon-button">link_off</button>
      </section>
    </div>



    <!-- <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWeb3Modal">Connect your wallet</a>
        <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3Modal">Disconnect</a>
      </li>
    </ul> -->

  </header>


</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "Navbar",
    computed: {
      ...mapGetters("accounts", ["getActiveAccount", "isUserConnected", "getW3Modal"]),
    },
    created() {
      this.$store.dispatch("accounts/initWeb3Modal");
      this.$store.dispatch("accounts/ethereumListener");
    },
    methods: {
      ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
      goHome: function() {
        this.$router.push({name: "User"});
      },
      goToAdmin: function() {
        this.$router.push({name: "Admin"});
      }
    }
  }

</script>

<style>

</style>
