<script setup lang="ts">
import AppHeader from '~/components/common/AppHeader.vue'
import PageContent from '~/components/common/PageContent.vue'
import ThemeLayout from '~/components/common/ThemeLayout.vue'
import { useRootStore } from '~/store/root'

const root = useRootStore()

const loading = ref(true)

onMounted(async () => {
  await root.fetchUser()
  loading.value = false
})

</script>

<template>
  <ThemeLayout>
    <div v-if="loading" class="base-loader">
      <n-spin :size="50" />
    </div>
    <main>
      <AppHeader />
      <PageContent>
        <slot />
      </PageContent>
    </main>
  </ThemeLayout>
</template>

<style scoped lang="scss">

.base-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
