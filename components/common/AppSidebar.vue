<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { Catalog  } from '@vicons/carbon'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useRoute } from '#imports'

const route = useRoute()

const collapsed = ref(false)

console.log(route)
function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>h(RouterLink, { to: '/' }, { default: () =>  'Главная' }),
    key: 'index',
    icon: renderIcon(Catalog)
  },
  {
    label: () =>h(RouterLink, { to: '/products' }, { default: () =>  'Продукты' }),
    key: 'products',
    icon: renderIcon(Catalog)
  }
]
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :default-value="route.name as string"
    />
  </n-layout-sider>
</template>

<style scoped lang="scss">

</style>
