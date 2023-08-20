<script setup lang="ts">
import { ThemeConfig} from "@bg-dev/nuxt-naiveui"

const themeConfig: ThemeConfig = {
  shared: {}, // Common theme options
  mobileOrTablet: {}, // Theme options applied on mobile and tablet
  mobile: {}, // Theme options applied on mobile only
  light: {}, // Theme options applied on light mode
  dark: {}, // Theme options applied on dark mode
}
</script>

<template>
  <NaiveConfig :theme-config="themeConfig">
    <n-message-provider>
      <slot />
    </n-message-provider>
  </NaiveConfig>
</template>

<style scoped lang="scss">

</style>