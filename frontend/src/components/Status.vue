<template>
  <div>
    <div v-if="!isUserConnected">
      <h2>You aren't connected</h2>
    </div>
    <div v-if="isUserConnected">
      <h3>You are connected.  Your account address is: </h3>
      <h3>{{ getActiveAccount }}</h3>

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
