<template>
  <div class="row justify-content-center mb-3">
    <div class="col col-4">
      <div class="input-group flex-nowrap mb-3">
        <span class="input-group-text">Eesnimi</span>
        <input v-model="firstName" type="text" class="form-control">
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Perekonnanimi</span>
          <input v-model="lastName" type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">E-maili aadress</span>
          <input v-model="email" type="text" class="form-control">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserNameAndEmailInput",
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
    }
  },
}
</script>