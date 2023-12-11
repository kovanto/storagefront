<template>
  <LogOutModal ref="logOutModalRef" @event-execute-logout="executeLogOut"/>
  <MyStoragesView :user-id="userId"></MyStoragesView>
  <div v-if="isLoggedIn" class="float-end" >
    <router-link to="/myprofile" style="font-size: small">
      <font-awesome-icon :icon="['far', 'user']" /> Minu profiil</router-link>
  </div>
  <nav>
    <router-link to="/" class="me-3">Avaleht</router-link>
    <router-link to="/alllocations" class="me-3">Vaata pakkumisi</router-link>
    <router-link v-if="isLoggedIn&&isSeller" to="/mystorages" class="me-3">Minu laod</router-link>
    <router-link v-if="isLoggedIn&&!isSeller" to="/myorders" class="me-3">Minu broneeringud</router-link>
    <router-link v-if="!isLoggedIn" to="/profile" class="me-3">Registreeri uus kasutaja</router-link>
    <router-link v-if="!isLoggedIn" to="/login" class="me-3">Logi sisse</router-link>
    <a v-if="isLoggedIn" href="#" class="link-underline-opacity-100-hover cursor-pointer" @click="handleLogOut">Logi välja</a>
  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>

<script>

import LogOutModal from "@/components/modal/LogOutModal.vue";
import router from "@/router";

export default {
  components: {LogOutModal},

  data() {
    return {
      isLoggedIn: false,
      isSeller: false
    }
  },

  methods: {

    handleLogOut() {
      this.$refs.logOutModalRef.openModal()
    },

    executeLogOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      router.push({name: 'homeRoute'})
    },

    updateNavMenu() {
      const userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
      const roleName = sessionStorage.getItem('roleName')
      this.isSeller = roleName === 'seller'
    },
  },

  mounted() {
    this.updateNavMenu()
  }
}
</script>


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

