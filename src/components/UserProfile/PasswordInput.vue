<template>
  <div>
    <ErrorAlert :error-message="errorMessage"/>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Parool</span>
          <input v-model="password" type="password" class="form-control" id="password1">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Korda parooli</span>
          <input v-model="passwordCheck" type="password" class="form-control" id="password2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorAlert from "@/components/alert/ErrorAlert.vue";

export default {
  name: "PasswordInput",
  components: {ErrorAlert},
  data() {
    return {
      password: '',
      passwordCheck: '',
      errorMessage: ''
    }
  },

  methods: {
    validatePassword() {
      if (this.password === this.passwordCheck) {

      } else {
        this.errorMessage = 'Paroolid ei tohi erineda'
      }
    },
  }
}
</script>

