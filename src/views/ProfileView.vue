<template>
  <div class="container text-center">
    <SuccessAlert :success-message="successMessage"/>
    <ErrorAlert :error-message="errorMessage"/>
    <div>
      <UserRoleSelection ref="userRoleSelectionRef"/>
    </div>
    <div>
      <UserNameAndEmailInput ref="userNameAndEmailInputRef"/>
    </div>
    <PasswordInput ref="passwordInputRef"/>
    <div class="row justify-content-center">
      <div class="col col-6">
        <button @click="createNewUser" type="submit" class="btn btn-primary">Registreeri uus kasutaja</button>
      </div>
    </div>
  </div>
</template>


<script>
import UserRoleSelection from "@/components/UserProfile/UserRoleSelection.vue";
import UserNameAndEmailInput from "@/components/UserProfile/UserNameAndEmailInput.vue";
import PasswordInput from "@/components/UserProfile/PasswordInput.vue";
import SuccessAlert from "@/components/alert/SuccessAlert.vue";
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: "ProfileView",
  components: {ErrorAlert, SuccessAlert, PasswordInput, UserNameAndEmailInput, UserRoleSelection},

  data() {
    return {
      userInfo: {
        roleId: 0,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      successMessage: '',
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },

  methods: {

    createNewUser() {
      this.resetErrorAlerts();
      this.getAndSetUserInfo();
      if (this.checkRequiredFieldsAreFilled()) {
        this.validatePasswordMatch();
      } else {
        this.handleRequiredFieldsError();
      }
    },

    getAndSetUserInfo: function () {
      this.userInfo.roleId = this.$refs.userRoleSelectionRef.roleId
      this.userInfo.firstName = this.$refs.userNameAndEmailInputRef.firstName
      this.userInfo.lastName = this.$refs.userNameAndEmailInputRef.lastName
      this.userInfo.email = this.$refs.userNameAndEmailInputRef.email
      this.userInfo.password = this.$refs.passwordInputRef.password
    },

    validatePasswordMatch: function () {
      if (this.$refs.passwordInputRef.password === this.$refs.passwordInputRef.passwordCheck) {
        this.postNewUserInfo();
      } else {
        this.errorMessage = 'Paroolid ei tohi erineda'
      }
    },

    postNewUserInfo() {
      this.$http.post("/register", this.userInfo
      ).then(response => {
        this.successMessage = 'Uus kasutaja "' + this.userInfo.firstName + ' ' + this.userInfo.lastName + '" on registreeritud!'
      }).catch(error => {
        this.errorResponse = error.response.data
        this.handlePostNewUserError(error.response.status)
      })
    },

    handlePostNewUserError(status) {
      if (status === 403 && this.errorResponse.errorCode === 112) {
        this.errorMessage = this.errorResponse.message;
      } else {
        router.push({name: 'errorRoute'});
      }
    },

    checkRequiredFieldsAreFilled() {
      return this.userInfo.firstName.length > 0 &&
          this.userInfo.lastName.length > 0 &&
          this.userInfo.email.length > 0 &&
          this.userInfo.password.length > 0 &&
          this.userInfo.roleId > 1
    },

    handleRequiredFieldsError() {
      this.errorMessage = 'Täida kõik väljad'
    },

    resetErrorAlerts() {
      this.errorMessage = ''
      this.successMessage = ''
    },

  }
}
</script>

