<template>
  <html>
    <div class="body">
      <div class="header">
        <button @click="gettasks()">fetti</button>
        <button @click="logingoogle()">ログイン</button>
        <button @click="googlelogout()">ログアウト</button>
      </div>
      <div class="card mb-3 border-primary" v-for="task in tasks" :key="task" style="max-width: 18rem">
        <div class="row g-0">
          <div class="col-md-4 color">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ task.task }}</h5>
              <p class="card-text">
              </p>
            </div>
          </div>

          <!-- <p v-for="task in tasks" :key="task">{{ task.task }}</p> -->
        </div>
      </div>
      <div class = "footer">
      <div class="taskinput">
        <input  v-model="this.inputtask" @keypress.enter="onKeypressEnter()" />
        <img class="submit" src="../assets/submit.png" @click="fetchtasks()"/>
      </div>
    </div>
    </div>
  </html>
</template>

<script>
// @ is an alias to /src
import {
  collection,
  doc,
  getDocs,
  addDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../main";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default {
  name: "Home",
  data: () => {
    return {
      tasks: [],
      inputtask: "",
      userid: "",
    };
  },
  components: {},
  created() {
    this.gettasks()
   
  },
  methods: {
    onKeypressEnter() {
      this.fetchtasks();
    },
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
        where("userid", "==",this.userid)
      );
      const citySnapshot = await getDocs(queryct);
      
      this.tasks.splice(0, this.tasks.length);
      citySnapshot.forEach((doc) => {
        this.tasks.push({ ...doc.data(), id: doc.id });
        console.log({ ...doc.data(), id: doc.id });
      });
      console.log({ ...doc.data(), id: doc.id });
    },
    async fetchtasks() {
      const docRef = await addDoc(collection(db, "tasks"), {
        task: this.inputtask,
        userid: this.userid,
      });
      console.log("Document written with ID: ", docRef.id);
      this.inputtask = "";
      this.gettasks();
    },
    logingoogle() {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          this.userid = user.uid;
          console.log(token, user);
          this.gettasks();
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(errorCode, errorMessage, email, credential);
        });
    },
  },
  async googlelogout() {
    const auth = getAuth();
    await signOut(auth)
      .then(() => {
        alert("signout");
      })
      .catch(function (error) {
        //  //失敗の処理
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("ログインに失敗しました");
      });
  },
};
</script>

<style lang="scss" scoped>
html {
  background-color: #b3b3f1;
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.card{
  margin:auto;  
  background: #7F2CCB;
}

.color{
 
  width: 40px;
}

.footer{
  height: 3rem;
  width:15rem;
  position:fixed;
  bottom: 3rem;
  right: 4rem;
  background-color:#E8E2FF;
  border-radius: 10px;
}

.taskinput{
  height: 100%;
}

input{
   background-color: #CEC2FF;
     outline:double 1px #FDEEEE;
     border:none;
     height: 1.5rem;
}

.submit{
  height:2rem;
  width:2rem;
  background-color:#2A2D43;
}
</style>



