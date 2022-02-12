<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <button @click="this.getCities()">aaaaaaaaaaaaaa</button>
    <a v-for="task in tasks" :key="task">{{task}}</a>
  </div>
  <div>
    <input v-bind="inputtask">
  </div>
</template>

<script>
// @ is an alias to /src
import { collection, doc, getDocs ,addDoc} from 'firebase/firestore';
import { db } from "../main";

export default {
  name: 'Home',
  data :()=> {
    return{
      tasks:[],
      inputtask:""
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
  const citySnapshot = await getDocs(collection(db, "cities"));
  citySnapshot.forEach((doc)=>{
    this.tasks.push({...doc.data(),id:doc.id});
    console.log({...doc.data(),id:doc.id})
  });
  console.log({...doc.data(),id:doc.id})
},
async fetchtasks(){
    const docRef = await addDoc(collection(db, "tasks"), {
    task: this.inputtask,
    id:1
});
console.log("Document written with ID: ", docRef.id);

  }
  }
}
</script>
