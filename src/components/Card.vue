<script setup>
defineProps({

  // Define Card(s)
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,

  // Define Buttons
  isFavourite: Boolean,
  isAdded: Boolean,

  // Define actions
  onClickAdd: Function,
  onClickFavourite: Function
});
</script>

<template>
  <div
      class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition flex flex-col justify-between">
    <div>
      <img v-if="onClickFavourite" :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'" alt="Like Empty" class="absolute top-8 left-8" @click="onClickFavourite">
      <img :src="imageUrl" alt="Sneaker" class="m-auto">
    </div>

    <div class="mt-8">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-5">
        <div class="flex flex-col">
          <span class="text-slate-400">Price:</span>
          <b> {{ price }}$</b>
        </div>
        <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="PlusButton" @click="onClickAdd">
      </div>
    </div>
  </div>
</template>