<script setup>
const emit = defineEmits(['onClickRemove']);

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
});
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img :alt="title" :src="imageUrl" class="w-16 h-16">

    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }}$</b>
        <img alt="CloseButton" class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" @click="emit('onClickRemove')">
      </div>
    </div>
  </div>
</template>