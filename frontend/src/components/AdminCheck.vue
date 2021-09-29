<!-- This should only be shown if connected by the administrator account -->
<template>

  <administrator v-if="isAdmin" />
  <div v-else>
    <h1>Sorry, you aren't the administrator</h1>
  </div>


</template>

<script>
  import { mapGetters } from "vuex";
  // import { mapActions } from "vuex";


  import Administrator from './Administrator.vue';


  export default {
    name: 'AdminCheck',
    components: {
      Administrator
    },
    computed: {
      ...mapGetters("accounts", ["isAdmin"])
    },
    methods: {
    }
  }

</script>
