import {defineStore} from "pinia";
import {ref, computed, onMounted, watch} from "vue";
import axios from "axios";

import {usePopupMenuStore} from "@/stores/popupMenuStore.js";

export const useCartStore = defineStore('cartId', () => {
    const popupMenuStore = usePopupMenuStore();

    const cart = ref([]);
    const cartOpen = ref(false);

    const cartIsEmpty = computed(() => cart.value.length === 0);
    const ButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value);

    const isCreating = ref(false);
    const orderId = ref(null);

    const totalPrice = computed(() => parseFloat(cart.value.reduce((acc, item) => acc + item.price, 0).toFixed(2)));

    const openCart = () => {
        cartOpen.value = true;

        if (cartOpen.value === true) {
            popupMenuStore.closePopupMenu();
        }
    };
    const closeCart = () => (cartOpen.value = false);

    const toggleToCart = (item) => {
        if (!item.isAdded) {
            cart.value.push(item);
            item.isAdded = true;
        } else {
            cart.value = cart.value.filter((cartItem) => cartItem.id !== item.id);
            item.isAdded = false;
        }
    }

    const createOrder = async () => {
        try {
            isCreating.value = true;
            const {data} = await axios.post(`https://b4cabae473d9d7e2.mokky.dev/orders`, {items: cart.value, totalPrice: totalPrice.value});
            cart.value = [];
            orderId.value = data.id;
        } catch (e) {
            console.log('Error while creating order', e);
        } finally {
            isCreating.value = false;
        }
    }

    onMounted(() => {
        const localCart = localStorage.getItem('cart');
        cart.value = localCart ? JSON.parse(localCart) : [];
    });

    watch(cart, () => {
        localStorage.setItem('cart', JSON.stringify(cart.value));
    }, {deep: true});

    return {cart, cartOpen, cartIsEmpty, ButtonDisabled, isCreating, orderId, totalPrice, toggleToCart, openCart, closeCart, createOrder};
});