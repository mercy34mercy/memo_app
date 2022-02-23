<template>

    <div class="d-flex justify-content-end">
      <button class="btn" @click="logingoogle()">sign in</button>
      <button class="btn">sign out</button>
  </div>

  <!-- <div class="d-grid gap-2 d-md-flex justify-content-md-end header">
  <button class="btn btn-primary me-md-2 btn-1" @click="logingoogle()"  type="button">ログイン</button>
  <button class="btn btn-primary"         @click="googlelogout()" type="button">ログアウト</button>
</div> -->
</template>
<script>
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";

export default {
  name: "Home",
  methods: {
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
  },
};
</script>

<style scoped lang="scss">
.header {
  //margin-top:1.5rem;
  // margin-right: 2rem;
}

.btn-1 {
  // padding:0 2rem;
}
</style>