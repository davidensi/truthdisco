<!-- This should only be shown if connected by the administrator account -->
<template>

  <Card class="aq-card p-lg-8 p-lg-offset-2">
    <template #title>
      QuestionID: {{ qId }}
    </template>
    <template #subtitle>
      {{ stimulus }}
    </template>
    <template #footer>
      <div align="right" class="p-grid">
        <Button @click="processQ" label="Check and process question" class="p-col-12 p-button-sm" />
      </div>
    </template>
  </Card>

</template>

<script>
  // import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'AdminQuestionCard',
    props: {
      qId: Number,
      stimulus: String

    },
    data: function() {
      return {
        response: '',
      }
    },
    computed: {
      // ...mapGetters("contracts", ["getQuestionList"])
    },
    methods: {
      ...mapActions("contracts", ["processQuestion"]),
      processQ() {
        console.log(this.qId);
        this.processQuestion(this.qId);
      }
    }
  }

</script>

<style scoped>
.aq-card {
  margin: 20px;
}
</style>
