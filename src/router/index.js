import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ErrorView from "@/views/ErrorView.vue";
import StorageDetailsView from "@/views/StorageDetailsView.vue";
import AllLocationsView from "@/views/AllLocationsView.vue";
import MyOrdersView from "@/views/MyOrdersView.vue";
import MyStoragesView from "@/views/MyStoragesView.vue";

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
    name: 'allLocationsRoute',
    component: AllLocationsView

  },
  {
    path: '/storage',
    name: 'storageDetailsRoute',
    component: StorageDetailsView,

  },
  {
    path: '/mystorages',
    name: 'myStoragesRoute',
    component: MyStoragesView
  },
  {
    path: '/myorders',
    name: 'myOrdersRoute',
    component: MyOrdersView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

