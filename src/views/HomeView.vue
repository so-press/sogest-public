<template>
  <div class="container">
    <h1 class="title">Mes informations</h1>
    <p v-if="personne.error" class="has-text-danger">{{ personne.error }}</p>
    <div v-if="data.loading">Chargement...</div>
    <form v-else @submit.prevent="save">
      <div v-for="(value, key) in data.form" :key="key" class="field">
        <label class="label">{{ key }}</label>
        <div class="control">
          <input class="input" v-model="data.form[key]" :placeholder="key" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">Enregistrer</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { usePersonneStore } from '../stores/personne'
import http from '../http'

const personne = usePersonneStore()
const data = reactive({ loading: false, form: {} })

onMounted(async () => {
  data.loading = true
  if (!Object.keys(personne.data).length) {
    await personne.fetch()
  }
  Object.assign(data.form, personne.data)
  data.loading = false
})

async function save() {
  try {
    const res = await http.put('/personne', data.form)
    personne.data = res.data
  } catch (err) {
    console.log(err)
  }
}
</script>
