<template>
  <nav>
    <div class="float-end" >
    <router-link to="/profile" style="font-size: small">
      <font-awesome-icon :icon="['far', 'user']" /> Minu profiil</router-link>

    </div>
    <br>

    <router-link to="/">Avaleht</router-link>
    |
    <router-link to="/alllocations">Vaata pakkumisi</router-link>
    |
    <router-link to="/profile">Registreeri uus kasutaja</router-link>
    |
    <router-link to="/login">Logi sisse</router-link>

  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script setup>
</script>