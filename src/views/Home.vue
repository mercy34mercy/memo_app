<template>
  <div class = "header">
    <button @click="logingoogle()">ログイン</button>
  </div>
  <div class="card">
    <p v-for="task in tasks" :key="task">{{task.task}}</p>
  </div>
  <div>
    <input v-model="this.inputtask"  @keypress.enter="onKeypressEnter()">
  </div>

</template>

<script>
// @ is an alias to /src
import { collection, doc, getDocs ,addDoc,where} from 'firebase/firestore';
import { db } from "../main";
import { getAuth, signInWithPopup,GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";

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
    this.gettasks();
    this.getfireauth()
  },
  methods: {
    onKeypressEnter(){
      this.fetchtasks();
    },
  getfireauth(){
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
    this.logingoogle()
  }
});

  },
  async gettasks() {
  const citySnapshot = await getDocs(collection(db, "tasks"), where("id", "==", this.userid));
  console.log(this.userid)
  this.tasks.splice(0,this.tasks.length)
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
  this.inputtask = ""
  this.gettasks();
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
  },
  pushData(array, value){
	
	if (array.indexOf(value) == -1){
		array.push(value);
	}
	return true;
}
}
</script>


