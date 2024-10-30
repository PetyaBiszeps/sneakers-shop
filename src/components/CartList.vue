<script setup>
import {useCartStore} from "@/stores/cartStore.js";

import CartItem from "@/components/CartItem.vue";

const cartStore = useCartStore();
</script>

<template>
  <div v-auto-animate class="flex flex-col flex-1 gap-4">
    <CartItem v-for="item in cartStore.cart" :key="item.id" :image-url="item.imageUrl" :price="item.price" :title="item.title"
              @onClickRemove="() => cartStore.toggleToCart(item)"/>
  </div>
</template>