<template>
  <div class="create-question-card p-grid">
    <Card class="p-ol-6 -offset-3 ">
      <template #title>
        Create a new question
      </template>
      <template #content>
        <span class="p-float-label">
          <InputText id="stimulus" type="text" v-model="stimulus" />
          <label for="stimulus">Enter stimulus CID</label>
          <Button @click="createNewQuestion" label="Create" class=""/>
        </span>
      </template>
    </Card>
  </div>
</template>


<script>
  // import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  export default {
    name: 'CreateQuestion',
    data: function() {
      return {
        stimulus: '',
      }
    },
    methods: {
      ...mapActions("contracts", [ "createQuestion" ]),
      createNewQuestion: function() {
        if(this.stimulus !== '') {
          this.createQuestion(this.stimulus);
        }
      }
    }
  }

</script>

<style scoped>
.create-question-card {
  margin: 20px;
}

</style>
