<!-- This should only be shown if connected by the administrator account -->
<template>

  <Card class="uq-card p-lg-8 p-lg-offset-2">
    <template #title>
      QuestionID: {{ qId }}
    </template>
    <template #subtitle>
      CID: {{ stimulus }}
      <h3 v-if="!active">Calculated answer: {{ answer }}</h3>
    </template>
    <template #footer>
      <div align="right" class="">
        <Button @click="viewImage" label="View image" style="margin-right:.5em" class="p-cl-6 p-button-sm" />
        <Button v-if="active" @click="goToQResponse" label="Submit response" class="p-co-6 p-button-sm" />
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
      stimulus: String,
      active: Boolean,
      answer: String,
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
      viewImage: function() {
        window.open("https://" + this.stimulus + ".ipfs.dweb.link")
      },
      goToQResponse: function() {
        console.log(this.qId)
        this.$router.push({ name: 'QuestionResponse', params: { qId: parseInt(this.qId), stimulus: this.stimulus }});
      }
    }
  }

</script>

<style scoped>
.uq-card {
  margin: 20px;
}
</style>
