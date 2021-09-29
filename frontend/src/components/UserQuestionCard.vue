<!-- This should only be shown if connected by the administrator account -->
<template>

  <Card class="uq-card p-lg-8 p-lg-offset-2">
    <template #title>
      QuestionID: {{ qId }}
    </template>
    <template #subtitle>
      {{ stimulus }}
    </template>
    <template #footer>
      <div align="right" class="p-grid">
        <Button @click="goToQResponse" label="Submit response" class="p-col-12 p-button-sm" />
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
      qId: Number,
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
      goToQResponse: function() {
        this.$router.push({ name: 'QuestionResponse', params: { qId: this.qId }});
      }
    }
  }

</script>

<style scoped>
.uq-card {
  margin: 20px;
}
</style>
