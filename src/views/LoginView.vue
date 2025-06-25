<template>
  <div class="section">
    <div class="container">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevent="handleLogin" class="box">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" v-model="data.email" type="email" placeholder="Email" />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" v-model="data.password" type="password" placeholder="Password" />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Login</button>
            </div>
          </div>

          <p v-if="auth.error" class="has-text-danger">{{ auth.error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const data = reactive({
  email: import.meta.env.VITE_LOGIN || '',
  password: import.meta.env.VITE_PASSWORD || '',
})

async function handleLogin() {
  const success = await auth.login(data.email, data.password)
  if (success) {
    const redirectTo = route.query.redirect || '/'
    router.push(redirectTo)
  }
}
</script>

