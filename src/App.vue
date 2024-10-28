<script setup>
import {watch, ref, provide, computed} from "vue";

import Header from "@/components/Header.vue";
import Drawer from "@/components/Drawer.vue";

// import Home from "@/pages/Home.vue";
// import Popup from "@/components/Popup.vue";

const cart = ref([]);

const cartOpen = ref(false);

const totalPrice = computed(() => parseFloat(cart.value.reduce((acc, item) => acc + item.price, 0).toFixed(2)));

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
  <Drawer v-if="cartOpen" :totalPrice="totalPrice"/>

  <!-- <popup/> -->

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14">
    <Header :totalPrice="totalPrice" @openCart="openCart"/>

    <div v-if="closeCart" class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>

</style>