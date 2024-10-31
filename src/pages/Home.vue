<script setup>
import {useItemStore} from "@/stores/itemStore.js";
import {useCartStore} from "@/stores/cartStore.js";
import {useFavouriteStore} from "@/stores/favouriteStore.js";

import CardList from "@/components/CardList.vue";

const itemStore = useItemStore();
const cartStore = useCartStore();
const favouriteStore = useFavouriteStore();

defineProps({
  price: Number
})
</script>

<template>
  <div class="items-center sm:flex sm:justify-between sm:flex-col md:flex-row sm:gap-5">
    <h2 class="hidden font-bold sm:text-3xl sm:block">Sneakers List</h2>

    <div class="sm:w-full sm:flex sm:gap-5 md:w-auto">
      <select class="py-2 px-3 border rounded-md outline-none max-sm:w-full md:w-auto" @change="e => itemStore.onChangeSelect(e.target.value)">
        <option value="title">By Name</option>
        <option value="price">By Lowest Price</option>
        <option value="-price">By Highest Price</option>
      </select>

      <div class="hidden relative sm:block sm:w-full md:w-auto">
        <img alt="SearchIcon" class="absolute left-4 top-3" src="/search.svg">
        <input class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 sm:w-full" placeholder="Search..." type="search"
               @input="e => itemStore.onChangeSearchInput(e.target.value)">
      </div>
    </div>
  </div>

  <div class="mt-5 sm:mt-10">
    <!--  -->
    <CardList :items="itemStore.items" @addToCart="cartStore.toggleToCart" @addToFavourite="favouriteStore.toggleFavourites"/>
  </div>
</template>

<style scoped>

</style>