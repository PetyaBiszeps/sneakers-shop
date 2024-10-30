<script setup>
import {useCartStore} from "@/stores/cartStore.js";

const cartStore = useCartStore();
</script>

<template>
  <div class="flex items-center gap-5 mb-8">
    <svg class="opacity-30 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1" fill="none" height="14" viewBox="0 0 16 14"
         width="16" xmlns="http://www.w3.org/2000/svg"
         @click="cartStore.closeCart">
      <path d="M1 7H14.7143" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
      <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    </svg>
    <h2 class="text-2xl font-bold">Cart</h2>
  </div>
</template>