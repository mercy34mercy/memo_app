import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTlgif9f4ziHuuiylTlF7QTmzHPVgm7M8",
  authDomain: "ritsumei-d4ed5.firebaseapp.com",
  projectId: "ritsumei-d4ed5",
  storageBucket: "ritsumei-d4ed5.appspot.com",
  messagingSenderId: "110298025178",
  appId: "1:110298025178:web:fafea1d05b358f8487a9e3",
  measurementId: "G-XWENKHQEB4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

createApp(App).use(store).use(router).mount('#app')
