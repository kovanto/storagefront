<template>
  <LogOutModal ref="logOutModalRef" @event-execute-logout="executeLogOut"/>
  <div class="content">
  <MyStoragesView :user-id="userId"></MyStoragesView>

  <nav>
    <router-link to="/" v-if="!isLoggedIn" class="me-3">Avaleht</router-link>
    <router-link to="/alllocations" class="me-3">Vaata pakkumisi</router-link>
    <router-link v-if="isLoggedIn&&isSeller" to="/mystorages" class="me-3">Minu laod</router-link>
    <router-link v-if="isLoggedIn&&!isSeller" to="/myorders" class="me-3">Minu broneeringud</router-link>
    <router-link v-if="!isLoggedIn" to="/profile" class="me-3">Registreeri uus kasutaja</router-link>
    <router-link v-if="!isLoggedIn" to="/login" class="me-3">Logi sisse</router-link>
    <a v-if="isLoggedIn" href="#" class="link-underline-opacity-100-hover cursor-pointer" @click="handleLogOut">Logi
      välja</a>
    <div v-if="isLoggedIn" class="float-end" >
      <router-link :to="{path: '/profile', query: {isEdit: true}}" style="font-size: small">
        <font-awesome-icon :icon="['far', 'user']" /> Minu profiil</router-link>
    </div>
  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
  </div>
</template>

<script>

import LogOutModal from "@/components/modal/LogOutModal.vue";
import router from "@/router";

export default {
  components: {LogOutModal},

  data() {
    return {
      isLoggedIn: false,
      isSeller: false,
      userId: 0
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
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}

nav {
  padding: 10px;
  position: fixed;
  width: 100%;
  z-index: 1030;
  top: 0;
  backdrop-filter: blur(10px);
}

nav a {
  font-weight: bold;
  color: #444444;
}

nav a.router-link-exact-active {
  color: #008080;
}

.content {
  padding-top: 50px;
  font-family: 'Lato', sans-serif;
  background: linear-gradient(to bottom, #a6a6a6 0%, #bfbfbf 20%, #d9d9d9 45%, #e6e6e6 70%, #ffffff 100%);
  color: #333333;

}

. {
background-color: #008080;
color: #fff;
 }

.modal .modal-content {
  background-color: #f5f5f5;
  color: #333333;
  position: fixed;
  top: 30%;
  left: 50%;
  width: 30%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}


.modal .modal-footer .btn {
  background-color: #008080;
  color: #fff;
}

.modal-open .content {
  filter: blur(100px);
}

#about {
  font-family: 'Blinker', sans-serif;
  font-size: 20px;
  color: #000000;
  backdrop-filter: blur(10px);
  padding: 10px;

}
.home {
  background-image: url('assets/happyfamily.jpeg');
  background-size: cover;
  background-position: center;
  min-height: 95vh;
}

.custom-button {
  /* Define your preferred button styles */
  padding: 10px 20px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Adding transition for smooth color change */
}
</style>

