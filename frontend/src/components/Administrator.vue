<!-- This should only be shown if connected by the administrator account -->
<template>

  <create-question></create-question>
  <div class="ud-container">
    <h2 style="margin: 1em;"> Question list </h2>
    <admin-question-card
    v-for="question in getQuestionList" :key="question.qId"
      :qId="question.id.toNumber()"
      :stimulus="question.stimulus"
      ></admin-question-card>
  </div>



</template>

<script>
  import { mapGetters } from "vuex";
  // import { mapActions } from "vuex";

  import AdminQuestionCard from './AdminQuestionCard';
  import CreateQuestion from './CreateQuestion';

  export default {
    name: 'Administrator',
    components: {
      AdminQuestionCard,
      CreateQuestion,
    },
    data: function() {
      return {
      }
    },
    computed: {
      ...mapGetters("contracts", ["getQuestionList"])
    },
    methods: {
    }
  }

</script>

<style scoped>

</style>
