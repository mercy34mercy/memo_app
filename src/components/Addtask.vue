<template>
  <div class="footer">
    <div class="taskinput">
      <input v-model="this.inputtask" @keypress.enter="onKeypressEnter()" />
      <img class="submit" src="../assets/submit.png" @click="fetchtasks()" />
    </div>
  </div>
</template>
<script>
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../main";

export default {
  name: "Home",
  methods: {
    onKeypressEnter() {
      this.fetchtasks();
    },
    async fetchtasks() {
      if (this.inputtask == "") {
        alert("タスクを入力してください");
      } else if (this.userid == "") {
        alert("ログインしてください");
      } else {
        const docRef = await addDoc(collection(db, "tasks"), {
          task: this.inputtask,
          userid: this.userid,
        });
        console.log("Document written with ID: ", docRef.id);
        this.inputtask = "";
        this.gettasks();
      }
    },
  },
};
</script>

<style scoped lang="scss">

.footer {
  height: 3rem;
  width: 15rem;
  position: fixed;
  bottom: 3rem;
  right: 4rem;
  background-color: #e8e2ff;
  border-radius: 10px;
}

.submit {
  height: 100%;
  // background-color: #2a2d43;
  border: white;
  cursor: pointer;
  background: none;
  background-repeat: no-repeat;
  background-position: center;
}

.taskinput {
  margin-top: 4%;
  margin-left: 5%;
  height: 60%;
}

input {
  background-color: #cec2ff;
  outline: double 1px #fdeeee;
  border: none;
  height: 100%;
}

</style>