<script setup>
import {ref, inject, computed} from "vue";
import axios from "axios";

import DrawerHeader from "@/components/DrawerHeader.vue";
import CartList from "@/components/CartList.vue";
import Info from "@/components/Info.vue";

const props = defineProps({totalPrice: Number, ButtonDisabled: Boolean});

const {cart, closeCart} = inject('cart');
const isCreating = ref(false);
const orderId = ref(null);

const cartIsEmpty = computed(() => cart.value.length === 0);
const ButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const {data} = await axios.post(`https://b4cabae473d9d7e2.mokky.dev/orders`, {items: cart.value, totalPrice: props.totalPrice.value});
    cart.value = [];

    orderId.value = data.id;
  } catch (e) {
    console.log(e);
  } finally {
    isCreating.value = false;
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70" @click="closeCart"></div>
  <div class="flex flex-col bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
    <DrawerHeader/>

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <Info v-if="!totalPrice && !orderId" description="Add at least one product to make an order." image-url="/package-icon.png" title="Cart is empty"/>
      <Info v-if="orderId" :description="`your order #${orderId} will be courier-delivered soon.`" image-url="/order-success-icon.png" title="Done!"/>
    </div>
    <div v-else>
      <CartList/>

      <div v-if="totalPrice" class="flex flex-col gap-8 mt-7">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }}$</b>
        </div>
        <button :disabled="ButtonDisabled"
                class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-400 transition cursor-pointer"
                @click="createOrder"> Checkout
        </button>
      </div>
    </div>
  </div>
</template>