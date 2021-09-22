<!-- This should only be shown if connected by the administrator account -->
<template>

  <div >
    <h3>hello from admin</h3>
    <button v-on:click="processNewQuestion()">Create a question</button>
    <input type="text" name="stimulus" v-model="stimulus">
    <div>Process question</div>
    <div>Close quesiton</div>
  </div>

</template>

<script>
  // import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'Administrator',
    data: function() {
      return {
        stimulus: '',
      }
    },
    methods: {
      ...mapActions("contracts", [ "createQuestion" ]),
      processNewQuestion: function() {
        if(this.stimulus !== '') {
          this.createQuestion(this.stimulus);
        }
      }
    }

  }

</script>
