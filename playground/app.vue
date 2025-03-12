<template>
  <div>
    <div v-for="{ state, key } of stores" :key="key">
      <div class="buttons">
        <b>{{ state.count }}</b>
        <button @click="state.count++">+</button>
        <button @click="state.count--">-</button>
        <button @click="state.count = 0">Reset</button>
      </div>
    </div>
    <pre>{{ user }}</pre>
    <input type="text" v-model="user.name" />

    <Test />
  </div>
</template>

<script setup>
const user = await useUserStore();

const stores = [];
</script>

<style scoped>
.buttons {
  display: flex;
  gap: 10px;
}
</style>