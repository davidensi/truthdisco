<!-- This should only be shown if connected by the administrator account -->
<template>

  <h3>hello from user</h3>
  <div>
    <h4>Question list</h4>
    <div>**Submit answer to question in list**</div>
  </div>


</template>

<script>
  import { mapGetters } from "vuex";
  // import { mapActions } from "vuex";
  export default {
    name: 'User',
    computed: {
      ...mapGetters("contracts", ["getQuestionList"])
    },
    methods: {
    }
  }

</script>
