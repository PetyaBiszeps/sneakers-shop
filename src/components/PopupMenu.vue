<script setup>
import {useItemStore} from "@/stores/itemStore.js";
import {useCartStore} from "@/stores/cartStore.js";
import {usePopupMenuStore} from "@/stores/popupMenuStore.js";

const itemStore = useItemStore();
const cartStore = useCartStore();
const popupMenuStore = usePopupMenuStore();
</script>

<template>
  <div class="fixed bg-white w-full rounded-xl shadow-xl py-8 z-50 sm:w-4/5 mt-6">
    <ul class="flex flex-col gap-8 px-2 sm:px-8">

      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer" @click="cartStore.openCart">
        <img alt="Cart" src="/cart.svg">
        <b>{{ cartStore.totalPrice }}$</b>
      </li>

      <router-link to="/favourites">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer" @click="popupMenuStore.togglePopupMenu">
          <img alt="Favourites" src="/heart.svg">
          <span>Favourites</span>
        </li>
      </router-link>

      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer" @click="popupMenuStore.togglePopupMenu">
        <img alt="Profile" src="/profile.svg">
        <span>Profile</span>
      </li>

      <li class="relative sm:hidden">
        <img alt="SearchIcon" class="absolute left-4 top-3" src="/search.svg">
        <input class="w-full py-2 pl-11 pr-4 border rounded-md outline-none focus:border-gray-400" placeholder="Search..." type="search"
               @input="itemStore.onChangeSearchInput">
      </li>

    </ul>
  </div>
</template>

<style scoped>

</style>