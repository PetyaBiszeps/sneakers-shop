<script setup>
import Card from "@/components/Card.vue";

defineProps({
  items: Array,
});

const emit = defineEmits(['addToFavourite', 'addToCart']);
</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5">
    <card
        v-for="item in items"
        :id="item.id"
        :key="item.id"
        :image-url="item.imageUrl"
        :is-added="false"
        :is-favourite="item.isFavourite"
        :isAdded="item.isAdded"
        :on-click-add="() => emit('addToCart', item)"
        :on-click-favourite="() => emit('addToFavourite', item)"
        :price="item.price"
        :title="item.title"
    />
  </div>
</template>