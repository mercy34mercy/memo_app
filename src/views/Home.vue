<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <button @click="this.getCities()">aaaaaaaaaaaaaa</button>
    <a v-for="task in tasks" :key="task">{{task}}</a>
  </div>
  <div>
    <input v-model="this.inputtask">
  </div>
  <div>
    <button @click="fetchtasks()">いけ!</button>
  </div>
    <div>
    <button @click="logingoogle()">ログイン</button>
  </div>
</template>

<script>
// @ is an alias to /src
import { collection, doc, getDocs ,addDoc} from 'firebase/firestore';
import { db } from "../main";
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";

export default {
  name: 'Home',
  data :()=> {
    return{
      tasks:[],
      inputtask:"",
      userid:""
    }
  },
  components: {
  },
  mounted() {
    this.getCities();
  },
  methods: {
  async getCities() {
  // const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(collection(db, "tasks"));
  citySnapshot.forEach((doc)=>{
    this.tasks.push({...doc.data(),id:doc.id});
    console.log({...doc.data(),id:doc.id})
  });
  console.log({...doc.data(),id:doc.id})
},
async fetchtasks(){
    const docRef = await addDoc(collection(db, "tasks"), {
    task: this.inputtask,
    userid: this.userid
});
console.log("Document written with ID: ", docRef.id);

  },
  logingoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    this.userid = user.uid
    console.log(token,user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(errorCode,errorMessage,email,credential)
  });
  }
  }
}
</script>


