<!-- This should only be shown if connected by the administrator account -->
<template>

  <div >
    <h3>hello from admin</h3>
    <button v-on:click="createQuestion('this is the stimulus')">Create a question</button>
    <div>Process question</div>
    <div>Close quesiton</div>
  </div>
  <button v-on:click="this.fetchOwner">check owner</button>

</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'Administrator',
    computed: {
      ...mapGetters("contracts", ["getQuestionList"]),
    },
    methods: {
      ...mapActions("contracts", [ "createQuestion" ]),
    }

  }

</script>
