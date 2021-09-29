<template>
  <div class="p-grid">

  <Panel class="qr-panel p-col-10 p-offset-1 p-lg-8 p-lg-offset-2">
    <template #header>
      Submit a response
    </template>
      <Textarea v-model="response" class="p-col-12" :autoresize="true">
      </Textarea>

      <div align="center">
      <Button @click="submitResponse" label="Submit response" class="p-col-4 p-button-sm" />
    </div>
  </Panel>
</div>


</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'QuestionReponse',
    props: {
      qId: Number,
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
      submitResponse: function() {
        console.log(this.qId);
        // if(this.response != '') {
          // this.submitAnswer({ qId: parseInt(qId), text: this.response} )
        // }
      }
    }
  }

</script>

<style scoped>
.qr-panel {
  margin-top: 20px;
}

.response-text {
}
</style>
