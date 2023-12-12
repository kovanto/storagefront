import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ErrorView from "@/views/ErrorView.vue";
import StorageDetailsView from "@/views/StorageDetailsView.vue";
import AllLocationsView from "@/views/AllLocationsView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },
  {
    path: '/login',
    name: 'loginRoute',
    component: LoginView

  },
  {
    path: '/profile',
    name: 'profileRoute',
    component: ProfileView

  },
  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView

  },
  {
    path: '/alllocations',
    name: 'alllocationsRoute',
    component: AllLocationsView

  },
  {
    path: '/storage',
    name: 'storageDetailsRoute',
    component: StorageDetailsView,

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

