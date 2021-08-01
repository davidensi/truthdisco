<template>
  <div>{{ getActiveAccount }}</div>
  <button @click="fetchReputation(getActiveAccount)">Get reputation</button>
  <button @click="setReputation({address: getActiveAccount, value: '10'})">Set reputation</button>


</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: 'Repuation',
    computed: {
      ...mapGetters("accounts", ["getActiveAccount", "getActiveBalance", "getW3Modal"])
    },
    methods: {
      ...mapActions("contracts", ["fetchReputation", "setReputation"]),
    }
  }

</script>
