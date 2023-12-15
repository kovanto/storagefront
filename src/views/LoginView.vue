<template>
  <div @keydown.enter="login">
    <div class="container text-center">
      <div class="row justify-content-center" >
        <div class="col col-6">
          <ErrorAlert :error-message="errorMessage"/>
        </div>
      </div>
    </div>
    <div class="container text-center" style="padding: 100px">
      <div class="row justify-content-center">
        <div class="col col-6 mb-5">
          <div class="input-group mb-3">
            <span class="input-group-text">E-maili aadress</span>
            <input v-model="email" type="text" class="form-control">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">parool</span>
            <input v-model="password" type="password" class="form-control">
          </div>
          <button @click="login" type="submit" class="btn btn-outline-dark"  style="background-color:#008080; color:#fff">Logi sisse</button>
        </div>

      </div>
    </div>


  </div>
</template>

<script>

import ErrorAlert from "@/components/alert/ErrorAlert.vue";
import router from "@/router";

export default {
  name: "LoginView.vue",
  components: {ErrorAlert},

  data() {
    return {
      errorMessage: '',
      email: '',
      password: '',
      loginResponse: {
        userId: 0,
        roleName: ''
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {
    login() {
      if (this.allRequiredFieldsAreFilled()) {
        this.sendLoginRequest();
      } else {
        this.handleRequiredFieldsAlert()
      }
    },

    sendLoginRequest() {
      this.$http.get("/login", {
            params: {
              email: this.email,
              password: this.password
            },
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleSuccessfulLogin();
      }).catch(error => {
            this.handleUnsuccessfulLogin(error)
          }
      )
    },

    handleSuccessfulLogin() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu', Number(this.loginResponse.userId))
      router.push({name: 'allLocationsRoute'});
    },

    allRequiredFieldsAreFilled() {
      return this.email.length > 0 && this.password.length > 0
    },

    handleRequiredFieldsAlert() {
      this.errorMessage = 'Täida kõik väljad'
    },

    resetErrorMessage() {
      this.errorMessage = '';
    },

    handleUnsuccessfulLogin(error) {
      this.errorResponse = error.response.data
      const httpStatusCode = error.response.status
      if (httpStatusCode === 403 & this.errorResponse.errorCode === 111) {
        this.errorMessage = this.errorResponse.message;
      } else {
        router.push({name: 'errorRoute'})
      }
    },
  },

}
</script>