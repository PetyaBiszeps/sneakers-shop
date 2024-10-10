<script setup>
import {inject} from "vue";

import CartItem from "@/components/CartItem.vue";

const {cart, removeFromCart} = inject('cart');
</script>

<template>
  <div v-auto-animate class="flex flex-col flex-1 gap-4">
    <CartItem v-for="item in cart" :key="item.id" :image-url="item.imageUrl" :price="item.price" :title="item.title"
              @onClickRemove="() => removeFromCart(item)"/>
  </div>
</template>