<template>
  <Toolbar>
    <template #left>
      <h2 class="">TruthDisco</h2>
    </template>
    <template #right>
      <SplitButton v-bind:label="current.label" v-bind:icon="current.icon" :model="menuItems" class="" style="width: 10em"></SplitButton>
      <Button v-if="!isUserConnected" @click="connectWeb3Modal" label="Connect" icon="pi pi-link"  style="width: 10em; margin-left:.5em" class="p-button-help" />
      <Button v-if="isUserConnected" @click="disconnectWeb3Modal" label="Disconnect" icon="pi pi-times" style="width: 10em; margin-left:.5em" class="p-button-danger " />
    </template>
  </Toolbar>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "Navbar",
    components: {

    },
    data: function() {
      return {
        menuItems: [
          {
            label: 'User dashboard',
            icon: 'pi pi-user',
            command: () => {
              this.$router.push({ name: "User" });
              this.current = {
                label: 'User',
                icon: 'pi pi-user',
              }
            }
          },
          {
            label: 'Administrator',
            icon: 'pi pi-cog',
            command: () =>  {
              this.$router.push({ name: "Admin" });
              this.current = {
                label: 'Admin',
                icon: 'pi pi-cog',
              }
            }
          }
        ]
      }
    },
    computed: {
      ...mapGetters("accounts", ["isUserConnected", "getW3Modal"]),
      current() {
        if(this.$route.name === 'User' || this.$route.name === 'QuestionResponse') {
          return {
            label: 'User',
            icon: 'pi pi-user',
          };
        } else {
          return {
            label: 'Admin',
            icon: 'pi pi-cog',
          };
        }
      }
    },
    created() {
      this.$store.dispatch("accounts/initWeb3Modal");
      this.$store.dispatch("accounts/ethereumListener");
    },
    methods: {
      ...mapActions("accounts", ["connectWeb3Modal", "disconnectWeb3Modal"]),
      goHome: function() {
        this.$router.push({name: "User"});
      },
      goToAdmin: function() {
        this.$router.push({name: "Admin"});
      }
    }
  }

</script>

<style scoped>

</style>
