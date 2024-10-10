<script setup>
defineProps({totalPrice: Number});

const emit = defineEmits(['openCart']);
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">

    <router-link to="/">
      <div class="flex items-center gap-4">
        <img alt="Logo" class="w-10" src="/logo.png"/>
        <div>
          <h2 class="text-xl font-bold uppercase">Sneakers Shop</h2>
          <p class="text-slate-400">Best sneakers shop</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
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