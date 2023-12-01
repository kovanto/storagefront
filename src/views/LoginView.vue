<template>
  <div>
    <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping">E-maili aadress</span>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username"
             aria-describedby="addon-wrapping">
    </div>
    <label for="inputPassword5" class="form-label">Password</label>
    <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
    <div id="passwordHelpBlock" class="form-text">
      Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView.vue"
}
</script>