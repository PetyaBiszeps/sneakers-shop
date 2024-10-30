<script setup>
defineProps({
  totalPrice: Number,
  popupIconStatus: Boolean,
});

const emit = defineEmits(['openCart', 'popupMenuStatus', 'popupMenuClose']);
</script>

<template>
  <header class="flex justify-between px-4 border-b border-slate-200 sm:p-8 bg-white drop-shadow-md">

    <router-link to="/">
      <div class="flex items-center gap-4" @click="() => emit('popupMenuClose')">
        <img alt="Logo" class="w-10" src="/logo.png"/>
        <div>
          <h2 class="text-xl font-bold uppercase">Sneakers Shop</h2>
          <p class="text-slate-400 text-wrap">Best sneakers shop</p>
        </div>
      </div>
    </router-link>

    <div class="hidden w-5 max-md:flex">
      <img :src="popupIconStatus ? '/xmark.svg' : '/bars.svg'" alt="bars" class="cursor-pointer" src="/bars.svg"
           @click="() => emit('popupMenuStatus')">
    </div>

    <ul class="hidden flex-col items-center sm:flex-row sm:gap-10 md:flex">
      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer" @click="() => emit('openCart')">
        <img alt="Cart" src="/cart.svg">
        <b>{{ totalPrice }}$</b>
      </li>
      <router-link to="/favourites">
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img alt="Favourites" src="/heart.svg">
          <span>Favourites</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
        <img alt="Profile" src="/profile.svg">
        <span>Profile</span>
      </li>
    </ul>

  </header>
</template>