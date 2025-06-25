<template>
  <div class="container">
    <h1 class="title">Personnes</h1>

    <form @submit.prevent="save" class="box mb-5">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" v-model="form.name" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" type="submit">
            {{ form.id ? 'Update' : 'Add' }}
          </button>
          <button v-if="form.id" class="button ml-2" type="button" @click="reset">Cancel</button>
        </div>
      </div>
    </form>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.personnes" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>
            <button class="button is-small mr-2" @click="edit(p)">Edit</button>
            <button class="button is-small is-danger" @click="remove(p.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="store.error" class="has-text-danger">{{ store.error }}</p>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { usePersonneStore } from '../stores/personne'

const store = usePersonneStore()

const form = reactive({
  id: null,
  name: '',
})

onMounted(() => {
  store.fetch()
})

function edit(p) {
  form.id = p.id
  form.name = p.name
}

function reset() {
  form.id = null
  form.name = ''
}

async function save() {
  if (form.id) {
    await store.update(form.id, { name: form.name })
  } else {
    await store.create({ name: form.name })
  }
  reset()
}

function remove(id) {
  store.remove(id)
}
</script>
