<script setup>
import {useCartStore} from "@/stores/cartStore.js";
import {useOrderStore} from "@/stores/orderStore.js";

import DrawerHeader from "@/components/DrawerHeader.vue";
import CartList from "@/components/CartList.vue";
import Info from "@/components/Info.vue";

const cartStore = useCartStore();
const orderStore = useOrderStore();

defineProps({
  totalPrice: Number
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70" @click="cartStore.closeCart"></div>

  <div class="flex flex-col bg-white h-lvh fixed top-0 right-0 z-20 p-8 max-sm:w-full sm:w-72 lg:w-96 overflow-auto">
    <DrawerHeader/>

    <div v-if="cartStore.cartIsEmpty || orderStore.orderId" class="flex h-full items-center">
      <Info v-if="cartStore.cartIsEmpty && !orderStore.orderId" description="Add at least one product to make an order." image-url="/package-icon.png"
            title="Cart is empty"/>
      <Info v-if="orderStore.orderId" :description="`your order #${orderStore.orderId} will be courier-delivered soon.`" image-url="/order-success-icon.png"
            title="Done!"/>
    </div>
    <div v-else>
      <CartList/>

      <div class="flex flex-col gap-8 mt-7">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ cartStore.totalPrice }}$</b>
        </div>
        <button :disabled="orderStore.ButtonDisabled"
                class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 transition cursor-pointer"
                @click="orderStore.createOrder"> Checkout
        </button>
      </div>
    </div>
  </div>
</template>