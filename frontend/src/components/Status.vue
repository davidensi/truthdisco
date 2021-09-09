<template>
  <div>
    <h3>Metamask debug</h3>
    <div v-if="!isUserConnected">
      <div>You aren't connected</div>
    </div>
    <div v-if="isUserConnected">
      <div>You are connected.  Your account address is: {{ getActiveAccount }}</div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Status",
    computed: {
      ...mapGetters("accounts", ["getActiveAccount", "isUserConnected"])
    }
  }


</script>

<style>

</style>
