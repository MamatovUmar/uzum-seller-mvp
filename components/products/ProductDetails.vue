<script setup lang="ts">
import { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

</script>

<template>
  <div>
    {{ props.product.title }}
    {{ props.product.price }}
  </div>
</template>

<style scoped lang="scss">

</style>