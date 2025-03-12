<template>
  <div>
    <!-- <pre>{{ store1.state }}</pre>
    <pre>{{ store2.state }}</pre>
    <pre>{{ store3.state }}</pre> -->
    <pre>{{ test }}</pre>

    <input type="text" v-model="test.name" />

    <pre>{{ user }}</pre>
  </div>
</template>

<script lang="ts" setup>
const test = await useTestStore();
const user = useUserStore();

// const store1 = await useTestStore("1");
// const store2 = await useTestStore("2");
// const store3 = await useTestStore("3");
</script>

<style>
</style>