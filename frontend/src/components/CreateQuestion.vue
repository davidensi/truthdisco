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
          <!-- <FileUpload mode="basic" name="demo" url="" @change="onUpload" accept="image/*" :maxFileSize="1000000"> -->
          <!-- </FileUpload> -->
          <Button @click="createNewQuestion" label="Create" class=""/>
        </span>
      </template>
    </Card>
  </div>
</template>


<script>
  // import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  // import storage from '../plugins/storage';

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
      },
      // onUpload: async function(e) {
      //   console.log(e);
      //   console.log(e.files);
      // }
      //
      //   this.createFileImage(file);
      //   console.log(file);
      //   const cid = await storage.upload([file]);
      //   console.log(cid);
      // }


    }
  }

</script>

<style scoped>
.create-question-card {
  margin: 20px;
}

</style>
