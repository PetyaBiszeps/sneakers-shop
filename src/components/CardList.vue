<script setup>
import Card from "@/components/Card.vue";

defineProps({
  items: Array,
  isFavourite: Boolean,
});

const emit = defineEmits(['addToFavourite', 'addToCart']);
</script>

<template>
  <div v-auto-animate class="grid-sm2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    <card
        v-for="item in items"
        :id="item.id"
        :key="item.id"
        :image-url="item.imageUrl"
        :is-added="false"
        :is-favourite="item.isFavourite"
        :isAdded="item.isAdded"
        :on-click-add="() => emit('addToCart', item)"
        :on-click-favourite="isFavourite ? null : () => emit('addToFavourite', item)"
        :price="item.price"
        :title="item.title"
    />
  </div>
</template>

<style>
@media screen and (min-width: 335px) and (max-width: 639px) {
  .grid-sm2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>