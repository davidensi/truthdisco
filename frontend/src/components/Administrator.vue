<!-- This should only be shown if connected by the administrator account -->
<template>

  <div >
    <h3>hello from admin</h3>
    <button
      class="mdc-button"
      v-on:click="createNewQuestion()">
      <span class="mdc-button__ripple"></span>
      <span class="mdc-button__touch"></span>
      <span class="mdc-button__label">Create a question</span></button>
    <input type="text" name="stimulus" v-model="stimulus">
    <div>Process question</div>
    <div>Close quesiton</div>
    <admin-question-list></admin-question-list>
  </div>

</template>

<script>
  // import { mapGetters } from "vuex";
  import { mapActions } from "vuex";

  import AdminQuestionList from './AdminQuestionList';

  export default {
    name: 'Administrator',
    components: {
      AdminQuestionList,
    },
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
