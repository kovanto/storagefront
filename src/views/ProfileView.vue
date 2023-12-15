<template>
  <div class="container text-center" style="padding: 50px">
    <SuccessAlert :success-message="successMessage"/>
    <ErrorAlert :error-message="errorMessage"/>
    <div v-if="isAddUser">
      <UserRoleSelection ref="userRoleSelectionRef"/>
    </div>
    <div>
      <UserNameAndEmailInput ref="userNameAndEmailInputRef"/>
    </div>
    <PasswordInput ref="passwordInputRef"/>
    <div class="row justify-content-center">
      <div class="col col-6">
        <button v-if="isAddUser" @click="addNewUserAndLogIn" type="submit" class="btn btn-outline-dark"  style="background-color:#008080; color:#fff">Registreeri uus
          kasutaja
        </button>
        <button v-if="isUpdateUser" @click="updateUserProfile" type="submit" class="btn btn-outline-dark"  style="background-color:#008080; color:#fff">Uuenda andmeid
        </button>
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
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  name: "ProfileView",
  components: {ErrorAlert, SuccessAlert, PasswordInput, UserNameAndEmailInput, UserRoleSelection},

  data() {
    return {
      userId: 0,
      roleName: '',
      isUpdateUser: false,
      isAddUser: true,
      profileInfo: {
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
      },
      loginResponse: {
        userId: 0,
        roleName: ''
      }

    }
  },

  methods: {


    handleIsAddOrUpdateUser() {
      if (useRoute().query.isEdit === 'true') {
        this.isAddUser = false
        this.isUpdateUser = true
        this.getProfileInfo()
      }
    },

    getProfileInfo() {
      this.$http.get("/profile", {
            params: {
              userId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.profileInfo = response.data
        this.fillAllFieldsFromProfileInfo()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },


    fillAllFieldsFromProfileInfo() {
      this.$refs.userNameAndEmailInputRef.firstName = this.profileInfo.firstName
      this.$refs.userNameAndEmailInputRef.lastName = this.profileInfo.lastName
      this.$refs.userNameAndEmailInputRef.email = this.profileInfo.email
    },


    addNewUserAndLogIn() {
      this.resetErrorAlerts();
      this.getAndSetProfileInfo();

      if (!this.profileInfoIsFilledAsRequired()) {
        this.handleRequiredFieldsError();
      } else if (!this.passwordFieldsMatch()) {
        this.handlePasswordMismatchError();
      } else {
        this.postNewProfileInfoAndLogin()
      }
    },

    updateUserProfile() {
      this.resetErrorAlerts();
      this.getAndSetProfileInfo();

      if (!this.profileInfoIsFilledAsRequired()) {
        this.handleRequiredFieldsError();
      } else if (!this.passwordFieldsMatch()) {
        this.handlePasswordMismatchError();
      } else {
        this.putNewProfileInfo();
      }
    },


    putNewProfileInfo() {
      this.$http.put("/profile", this.profileInfo, {
            params: {
              userId: sessionStorage.getItem('userId')
            }
          }
      ).then(response => {
        this.successMessage = 'Profiili ' +
            this.$refs.userNameAndEmailInputRef.firstName + ' ' + this.$refs.userNameAndEmailInputRef.lastName +
            ' andmed on edukalt muudetud'
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    sendLoginRequestAndLogin() {
      this.$http.get("/login", {
            params: {
              email: this.profileInfo.email,
              password: this.profileInfo.password
            },
          }
      ).then(response => {
        this.loginResponse = response.data
        this.handleLogin();
      }).catch(error => {
            const errorResponseBody = error.response.data
          }
      )
    },

    handleLogin() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      this.$emit('event-update-nav-menu', Number(this.loginResponse.userId))
      router.push({name: 'allLocationsRoute'});
    },

    resetErrorAlerts() {
      this.errorMessage = ''
      this.successMessage = ''
    },


    getAndSetProfileInfo() {
      if (this.isAddUser) {
        this.profileInfo.roleId = this.$refs.userRoleSelectionRef.roleId;
      }
      this.profileInfo.firstName = this.$refs.userNameAndEmailInputRef.firstName
      this.profileInfo.lastName = this.$refs.userNameAndEmailInputRef.lastName
      this.profileInfo.email = this.$refs.userNameAndEmailInputRef.email
      this.profileInfo.password = this.$refs.passwordInputRef.password
    },

    profileInfoIsFilledAsRequired() {
      return this.profileInfo.firstName.length > 0 &&
          this.profileInfo.lastName.length > 0 &&
          this.profileInfo.email.length > 0 &&
          this.profileInfo.password.length > 0 &&
          this.profileInfo.roleId > 1
    },

    handleRequiredFieldsError() {
      this.errorMessage = 'Täida kõik väljad'
    },

    passwordFieldsMatch() {
      return this.$refs.passwordInputRef.password === this.$refs.passwordInputRef.passwordCheck
    },

    handlePasswordMismatchError: function () {
      this.errorMessage = 'Paroolid ei tohi erineda'
    },

    postNewProfileInfoAndLogin() {
      this.$http.post("/register", this.profileInfo
      ).then(response => {
        this.successMessage = 'Uus kasutaja "' + this.profileInfo.firstName + ' ' + this.profileInfo.lastName + '" on registreeritud! '
        setTimeout(() => {this.sendLoginRequestAndLogin();},3000)
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

  },
  mounted() {
    this.handleIsAddOrUpdateUser()
    this.resetErrorAlerts()
  }
}
</script>

