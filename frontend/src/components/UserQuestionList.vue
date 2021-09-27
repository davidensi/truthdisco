<!-- This should only be shown if connected by the administrator account -->
<template>

  <div>
    <h4>Question list</h4>
    <ul>
      <li v-for="(q, key) in this.getQuestionList"
        :key="key">
        {{ q[2] }}
        <button name="answer" v-on:click="submitResponse(q[0])">create submission</button>
        <input type="text" name="submission" v-model="response">

      </li>
    </ul>
  </div>


</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";
  export default {
    name: 'UserQuestionList',
    data: function() {
      return {
        response: '',
      }
    },
    computed: {
      ...mapGetters("contracts", ["getQuestionList"])
    },
    methods: {
      ...mapActions("contracts", [ "submitAnswer" ]),
      submitResponse: function(qId) {
        if(this.response != '') {
          this.submitAnswer({ qId: parseInt(qId), text: this.response} )
        }
      }
    }
  }

</script>

<style>
</style>
