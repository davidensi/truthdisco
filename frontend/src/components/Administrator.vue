<!-- This should only be shown if connected by the administrator account -->
<template>

  <div v-if="isAdmin">
    <h3>hello from admin</h3>
    <div>{{ this.getOwner }} </div>
    <div>Create a question</div>
    <div>Process question</div>
    <div>Close quesiton</div>
  </div>
  <button v-on:click="this.fetchOwner">check owner</button>

</template>

<script>
  import { mapGetters } from "vuex";
  // import { mapActions, mapGetters } from "vuex";

  export default {
    name: 'Administrator',
    computed: {
      ...mapGetters("contracts", ["getOwner"]),
    },
    // methods: {
      // ...mapActions("contracts", [ "fetchOwner" ]),
      // fetchOwner: function() {
        // console.log("fetchOwner");
      // }

  }

</script>
