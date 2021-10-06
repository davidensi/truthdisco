<!-- This should only be shown if connected by the administrator account -->
<template>
  <div class="ud-container">
    <h2 style="margin: 1em;"> Question list </h2>
    <user-question-card
    v-for="question in getQuestionList" :key="question.qId"
      :qId="question.id.toNumber()"
      :stimulus="question.stimulus"
      ></user-question-card>
  </div>

  <!-- <user-question-list></user-question-list> -->


</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  import UserQuestionCard from './UserQuestionCard';


  export default {
    name: 'User',
    components: {
      UserQuestionCard,
    },
    data: function() {
      return {
      }
    },
    computed: {
      ...mapGetters("contracts", ["getQuestionList"])
    },
    methods: {
      ...mapActions("contracts", [ "submitAnswer" ]),
      // submitResponse: function(qId) {
      //   if(this.response != '') {
      //     this.submitAnswer({ qId: parseInt(qId.toNumber()), text: this.response} )
      //   }
      //

      // }
    }
  }

</script>

<style scoped>
/* User Dashboard container*/
.ud-container {
  padding: 20px;
}

.question-card {
  /* margin: 25px; */
  /* padding: 16px; */
  /* width: 350px; */
  /* height: 350px; */
}
</style>
