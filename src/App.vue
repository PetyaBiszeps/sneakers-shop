<script setup>
import {useCartStore} from "@/stores/cartStore.js";
import {usePopupMenuStore} from "@/stores/popupMenuStore.js";

import Header from "@/components/Header.vue";
import PopupMenu from "@/components/PopupMenu.vue";
import Drawer from "@/components/Drawer.vue";

// import Home from "@/pages/Home.vue";
// import Popup from "@/components/Popup.vue";

const cartStore = useCartStore();
const popupMenuStore = usePopupMenuStore();

defineProps({
  totalPrice: Number,
})
</script>

<template>
  <Drawer v-if="cartStore.cartOpen" :totalPrice="cartStore.totalPrice"/>

  <!-- <popup/> -->

  <div class="m-auto rounded-xl shadow-xl mt-5 sm:w-4/5 sm:mt-14">
    <Header :totalPrice="cartStore.totalPrice" @openCart="cartStore.openCart"
            @popupMenuClose="popupMenuStore.closePopupMenu" @popupMenuStatus="popupMenuStore.togglePopupMenu"/>

    <PopupMenu v-if="popupMenuStore.popupMenu" :total-price="cartStore.totalPrice" @openCart="cartStore.openCart"
               @popupMenuStatus="popupMenuStore.togglePopupMenu"/>

    <div v-if="cartStore.closeCart" class="bg-white p-4 sm:p-10 mt-4 shadow-inner">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>

</style>