<template>
  <html>
    <div class="body">
      <Header>
      </Header>
      <Vcard>
      </Vcard>
      <AddTask>
      </AddTask>
    </div>
  </html>
</template>

<script>
// @ is an alias to /src
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

import Header from "../components/header.vue"
import AddTask from "../components/Addtask.vue"
import Vcard from "../components/Vcard.vue"



export default {
  name: "Home",

  components: {
    Header,
    AddTask,
    Vcard
  },
  created() {
  },
  methods: {
    getfireauth() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          this.userid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  position: relative;
  width: 100%;
  min-height: 100vh;
}







</style>



