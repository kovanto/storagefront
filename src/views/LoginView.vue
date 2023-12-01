<template>
  <div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col col-6">
          <div class="input-group mb-3">
            <span class="input-group-text">E-maili aadress</span>
            <input v-model="username" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">parool</span>
            <input v-model="password" type="password" class="form-control">
          </div>
          <button @click="sendLoginRequest" type="submit" class="btn btn-primary">Logi sisse</button>
        </div>

      </div>
    </div>


  </div>
</template>

<script>

import router from "@/router";

export default {
  name: "LoginView.vue",

  data() {
    return {
      email: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      }
    }
  },
  methods: {
    sendLoginRequest() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            },
          }
      ).then(response => {
        this.loginResponse = response.data
        // this.handleSuccessfulLogin();
      }) //.catch(error => {
        //this.handleUnsuccessfulLogin(error);
      } //);
    },

  }
</script>