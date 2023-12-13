<template>
  <div class="container text-center">
    <SuccessAlert :success-message="successMessage"/>
    <ErrorAlert :error-message="errorMessage"/>
    <div v-if="!isEdit">
      <UserRoleSelection ref="userRoleSelectionRef"/>
    </div>
    <div>
      <UserNameAndEmailInput ref="userNameAndEmailInputRef"/>
    </div>
    <PasswordInput ref="passwordInputRef"/>
    <div class="row justify-content-center">
      <div class="col col-6">
        <button v-if="!isEdit" @click="createNewUser" type="submit" class="btn btn-outline-dark">Registreeri uus
          kasutaja
        </button>
        <button v-if="isEdit" @click="updateUserProfile" type="submit" class="btn btn-outline-dark">Uuenda andmeid
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
      isEdit: useRoute().query.isEdit,
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

    getAndSetUserInfo() {
      this.profileInfo.roleId = this.$refs.userRoleSelectionRef.roleId
      this.profileInfo.firstName = this.$refs.userNameAndEmailInputRef.firstName
      this.profileInfo.lastName = this.$refs.userNameAndEmailInputRef.lastName
      this.profileInfo.email = this.$refs.userNameAndEmailInputRef.email
      this.profileInfo.password = this.$refs.passwordInputRef.password
    },

    validatePasswordMatch() {
      if (this.$refs.passwordInputRef.password === this.$refs.passwordInputRef.passwordCheck) {
        this.postNewUserInfo();
      } else {
        this.errorMessage = 'Paroolid ei tohi erineda'
      }
    },

    postNewUserInfo() {
      this.$http.post("/register", this.profileInfo
      ).then(response => {
        this.successMessage = 'Uus kasutaja "' + this.profileInfo.firstName + ' ' + this.profileInfo.lastName + '" on registreeritud!'
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
      return this.profileInfo.firstName.length > 0 &&
          this.profileInfo.lastName.length > 0 &&
          this.profileInfo.email.length > 0 &&
          this.profileInfo.password.length > 0 &&
          this.profileInfo.roleId > 1
    },

    handleRequiredFieldsError() {
      this.errorMessage = 'Täida kõik väljad'
    },

    resetErrorAlerts() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    handleIsEdit() {
      if (this.isEdit === 'true') {
        this.isEdit = true;
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

    updateUserProfile() {
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

    fillAllFieldsFromProfileInfo() {
      this.$refs.userNameAndEmailInputRef.firstName = this.profileInfo.firstName
      this.$refs.userNameAndEmailInputRef.lastName = this.profileInfo.lastName
      this.$refs.userNameAndEmailInputRef.email = this.profileInfo.email
    },

  },
  mounted() {
    this.handleIsEdit()
    this.resetErrorAlerts()
  }


}
</script>

