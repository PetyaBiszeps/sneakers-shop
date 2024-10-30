<script setup>
import CardList from "@/components/CardList.vue";

import {useFavouriteStore} from "@/stores/favouriteStore.js";
import {useCartStore} from "@/stores/cartStore.js";

const favouriteStore = useFavouriteStore();
const cartStore = useCartStore();
</script>

<template>
  <h1 class="mb-5 text-center sm:text-left text-xl font-bold">My Favourites</h1>
  <CardList :items="favouriteStore.favourites" @addToCart="cartStore.toggleToCart" @addToFavourite="favouriteStore.toggleFavourites"/>
</template>

<style scoped>

</style>