<template>
  <div
    class="card mb-3"
    v-for="task in tasks"
    :key="task"
    style="max-width: 18rem"
  >
    <div class="row g-0">
      <div class="col-md-4 color"></div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ task.task }}</h5>
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../main";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { collection, query, where, doc, getDocs } from "firebase/firestore";

export default {
  name: "Home",
  data: () => {
    return {
      tasks: [],
      inputtask: "",
      userid: "",
    };
  },
  created() {
    this.gettasks();
  },
  methods: {
    async gettasks() {
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

      console.log("userid:%s", this.userid);
      const queryct = query(
        collection(db, "tasks"),
        where("userid", "==", this.userid)
      );
      const citySnapshot = await getDocs(queryct);

      this.tasks.splice(0, this.tasks.length);
      citySnapshot.forEach((doc) => {
        this.tasks.push({ ...doc.data(), id: doc.id });
        console.log({ ...doc.data(), id: doc.id });
      });
      console.log({ ...doc.data(), id: doc.id });
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin: auto;
  //background: #7f2ccb;
}
</style>