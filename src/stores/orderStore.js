import {defineStore} from "pinia";
import {ref, computed} from "vue";
import axios from "axios";

import {useCartStore} from "@/stores/cartStore.js";

export const useOrderStore = defineStore('orderId', () => {
    const cartStore = useCartStore();

    const orderId = ref(null);
    const isCreating = ref(false);
    const ButtonDisabled = computed(() => isCreating.value || cartStore.cartIsEmpty.value);

    const createOrder = async () => {
        try {
            isCreating.value = true;
            const {data} = await axios.post(`https://b4cabae473d9d7e2.mokky.dev/orders`, {items: cartStore.cart.value, totalPrice: cartStore.totalPrice.value});
            cartStore.cart.value = [];
            orderId.value = data.id;

            clearAfterOrder();
        } catch (e) {
            console.log('Error while creating order', e);
        } finally {
            isCreating.value = false;
        }
    };

    const clearAfterOrder = () => {
        cartStore.cart.value = [];
    }

    return {orderId, isCreating, ButtonDisabled, createOrder};
});