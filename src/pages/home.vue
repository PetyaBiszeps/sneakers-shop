<script setup>
import {inject, onMounted, reactive, ref, watch} from "vue";
import axios from "axios";

import CardList from "@/components/CardList.vue";

const {cart, addToCart, removeFromCart} = inject('cart');
const items = ref([]);
const filters = reactive({sortBy: 'title', searchQuery: ''});


// Main Page functions

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};

const onClickAddCart = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const fetchItems = async () => {
  try {
    const params = {sortBy: filters.sortBy};

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const {data} = await axios.get(`https://b4cabae473d9d7e2.mokky.dev/items`, {params});
    items.value = data.map(obj => ({
      ...obj,

      isFavourite: false,
      isAdded: false,

      favouriteId: null
    }));
  } catch (e) {
    console.log(e);
  }
};

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {parentId: item.id, item};
      item.isFavourite = true;

      const {data} = await axios.post('https://b4cabae473d9d7e2.mokky.dev/favourites', obj);
      item.favouriteId = data.id;
    } else {
      item.isFavourite = false;

      await axios.delete(`https://b4cabae473d9d7e2.mokky.dev/favourites/${item.favouriteId}`);
      item.favouriteId = null;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchFavourites = async () => {
  try {
    const {data: favourites} = await axios.get(`https://b4cabae473d9d7e2.mokky.dev/favourites`);
    items.value = items.value.map(item => {
      const favourite = favourites.find((favourite) => favourite.parentId === item.id);

      if (!favourite) {
        return item;
      }

      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id,
      }
    });
  } catch (e) {
    console.log(e);
  }
};

watch(filters, fetchItems);

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }));
});

onMounted(async () => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavourites();

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
});
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Sneakers List</h2>

    <div class="flex gap-4">
      <select id="" class="py-2 px-3 border rounded-md outline-none" name="" @change="onChangeSelect">
        <option value="name">By Name</option>
        <option value="price">By Lowest Price</option>
        <option value="-price">By Highest Price</option>
      </select>
      <div class="relative">
        <img alt="SearchIcon" class="absolute left-4 top-3" src="/search.svg">
        <input class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" placeholder="Search..." type="text"
               @input="onChangeSearchInput">
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @addToCart="onClickAddCart" @addToFavourite="addToFavourite"/>
  </div>
</template>

<style scoped>

</style>