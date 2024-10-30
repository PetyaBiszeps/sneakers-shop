<script setup>
import {inject, onMounted, provide, reactive, ref, watch} from "vue";
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
      params.title = `${filters.searchQuery}`;
    }

    const {data} = await axios.get(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/items`, {params});
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

      const {data} = await axios.post('https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites', obj);
      item.favouriteId = data.id;
    } else {
      item.isFavourite = false;

      await axios.delete(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites/${item.favouriteId}`);
      item.favouriteId = null;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchFavourites = async () => {
  try {
    const {data: favourites} = await axios.get(`https://670cff85073307b4ee41e8c8.mockapi.io/API/v1/favourites`);
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

provide('searchInput', {
  onChangeSearchInput,
})
</script>

<template>
  <div class="items-center sm:flex sm:justify-between sm:flex-col md:flex-row sm:gap-5">
    <h2 class="hidden font-bold sm:text-3xl sm:block">Sneakers List</h2>

    <div class="sm:w-full sm:flex sm:gap-5 md:w-auto">
      <select class="py-2 px-3 border rounded-md outline-none max-sm:w-full md:w-auto" @change="onChangeSelect">
        <option value="name">By Name</option>
        <option value="price">By Lowest Price</option>
        <option value="-price">By Highest Price</option>
      </select>

      <div class="hidden relative sm:block sm:w-full md:w-auto">
        <img alt="SearchIcon" class="absolute left-4 top-3" src="/search.svg">
        <input class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400 sm:w-full" placeholder="Search..." type="search"
               @input="onChangeSearchInput">
      </div>
    </div>
  </div>

  <div class="mt-5 sm:mt-10">
    <!--  -->
    <CardList :items="items" @addToCart="onClickAddCart" @addToFavourite="addToFavourite"/>
  </div>
</template>

<style scoped>

</style>