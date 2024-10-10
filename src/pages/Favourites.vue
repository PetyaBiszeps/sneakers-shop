<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

import CardList from "@/components/CardList.vue";

const favourites = ref([]);

onMounted(async () => {
  try {
    const {data} = await axios.get('https://b4cabae473d9d7e2.mokky.dev/favourites');
    favourites.value = data.map(obj => obj.item);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <h1>My Favourites</h1>
  <CardList :items="favourites"/>
</template>

<style scoped>

</style>