<template>

  <Panel>
    <template #header>
      Submit a response
    </template>

  </Panel>


</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";
  export default {
    name: 'QuestionReponse',
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
