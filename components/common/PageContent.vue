<script setup lang="ts">
import AppSidebar from '~/components/common/AppSidebar.vue'
</script>

<template>
  <n-layout has-sider class="page">
    <AppSidebar />
    <n-layout>
      <div class="page__content">
        <slot></slot>
      </div>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
.page {
  padding-top: 64px;
  height: 100vh;
  &__content {
    padding: 30px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>