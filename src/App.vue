<script setup>
import {watch, ref, provide, computed} from "vue";
import axios from "axios";

import Header from "@/components/Header.vue";
import Drawer from "@/components/Drawer.vue";

import Home from "@/pages/home.vue";

const cart = ref([]);

const cartOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));

const closeCart = () => {
  cartOpen.value = false;
};

const openCart = () => {
  cartOpen.value = true;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};

watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
}, {deep: true});

provide('cart', {
  cart,
  openCart,
  closeCart,
  addToCart,
  removeFromCart
});
</script>

<template>
  <Drawer v-if="cartOpen" :CartButtonDisabled="CartButtonDisabled" :totalPrice="totalPrice"/>

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :totalPrice="totalPrice" @openCart="openCart"/>

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>

</style>