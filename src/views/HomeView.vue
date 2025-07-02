<template>
  <NavBar></NavBar>
  <SideBar></SideBar>
  <div class="container">
    <h1 class="title">Welcome</h1>
    <p class="subtitle">You are logged in as {{ user.name }}!</p>
    <router-view v-if="user" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'

const auth = useAuthStore()
const user = computed(() => auth.user)
</script>
