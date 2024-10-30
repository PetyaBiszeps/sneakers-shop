<script setup>
import {inject, onMounted, ref} from "vue";
import axios from "axios";

import CardList from "@/components/CardList.vue";

const {addToCart, removeFromCart} = inject('cart');

const favourites = ref([]);

const ItemCartStatus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

onMounted(async () => {
  try {
    const {data} = await axios.get('https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites');
    favourites.value = data.map(obj => obj.item);
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <h1 class="mb-5 text-center sm:text-left text-xl font-bold">My Favourites</h1>
  <CardList :items="favourites" is-favourite @addToCart="ItemCartStatus"/>
</template>

<style scoped>

</style>