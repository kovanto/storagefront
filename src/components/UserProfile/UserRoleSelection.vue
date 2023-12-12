<template>
  <div class="row justify-content-center mb-3">
    <div class="col col-2">
      <div class="form-check">
        <input v-model="roleId" class="form-check-input" type="radio" name="customer" id="customer" v-bind:value="2">
        <label class="form-check-label" for="customer">
          Rendin lao
        </label>
      </div>
    </div>
    <div class="col col-2">
      <div class="form-check">
        <input v-model="roleId" class="form-check-input" type="radio" name="seller" id="seller" v-bind:value="3">
        <label class="form-check-label" for="seller">
          Annan rendile
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserRoleSelection",
  data() {
    return {
      roleId: 0,
    }
  }
}
</script>

