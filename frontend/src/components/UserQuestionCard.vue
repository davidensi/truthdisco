<!-- This should only be shown if connected by the administrator account -->
<template>

  <Card class="uq-card">
    <template #title>
      QuestionID: {{ qid }}
    </template>
    <template #subtitle>
      {{ stimulus }}
    </template>
    <template #footer>
      <div align="right">
        <Button label="Submit response" class="p-button-sm" />
      </div>
    </template>
  </Card>

</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'UserQuestionCard',
    props: {
      qid: Number,
      stimulus: String
    },
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
    }
  }

</script>

<style scoped>
.uq-card {
  margin: 20px;
}
</style>
