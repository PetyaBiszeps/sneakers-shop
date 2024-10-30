<script setup>
import {watch, ref, provide, computed} from "vue";

import Header from "@/components/Header.vue";
import PopupMenu from "@/components/PopupMenu.vue";
import Drawer from "@/components/Drawer.vue";

// import Home from "@/pages/Home.vue";
// import Popup from "@/components/Popup.vue";

const cart = ref([]);
const cartOpen = ref(false);
const totalPrice = computed(() => parseFloat(cart.value.reduce((acc, item) => acc + item.price, 0).toFixed(2)));


// Cart functions
const closeCart = () => {
  cartOpen.value = false;
};

const openCart = () => {
  cartOpen.value = true;

  popupIcon.value = false;
  popupMenu.value = false;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1);
  item.isAdded = false;
};


// Popup Menu functions
const popupIcon = ref(false); // ---> Popup Icon Status
const popupMenu = ref(false);

const popupMenuStatus = () => {
  popupIcon.value = !popupIcon.value;
  popupMenu.value = !popupMenu.value;
}

const popupMenuClose = () => {
  popupIcon.value = false;
  popupMenu.value = false;
}

// Watch and Export (provide)
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

provide('popupMenuStatus', {
  popupIcon,
  popupMenu,
  popupMenuStatus,
  popupMenuClose,
})
</script>

<template>
  <Drawer v-if="cartOpen" :totalPrice="totalPrice"/>

  <!-- <popup/> -->

  <div class="m-auto rounded-xl shadow-xl mt-5 sm:w-4/5 sm:mt-14">
    <Header :popupIconStatus="popupIcon" :totalPrice="totalPrice" @openCart="openCart" @popupMenuClose="popupMenuClose" @popupMenuStatus="popupMenuStatus"/>

    <PopupMenu v-if="popupMenu" :total-price="totalPrice" @openCart="openCart" @popupMenuStatus="popupMenuStatus"/>

    <div v-if="closeCart" class="bg-white p-4 sm:p-10 mt-4 shadow-inner">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>

</style>