<script setup lang="ts">
import { useRootStore } from '~/store/root'
import { renderIcon } from '~/utils/render'
import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'
import { DropdownMixedOption } from 'naive-ui/lib/dropdown/src/interface'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#imports'

const root = useRootStore()
const auth = useAuth()
const router = useRouter()

const userInitial = computed(() => root.user.login.slice(0, 1).toUpperCase())

function handleSelect(e: string) {
  if (e === 'logout') {
    auth.logout()
  } else {
    router.push(e)
  }
}

const options: DropdownMixedOption[] = [
  {
    label: 'Профиль',
    key: '/profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: 'Выйти',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]
</script>

<template>
  <header class="header">
    <div></div>
<!--    <n-dropdown :options="options" size="medium" :on-select="handleSelect">-->
<!--      <n-space align="center" class="pointer">-->
<!--        <span class="username">Hi, {{ root.user.login }}</span>-->
<!--        <n-avatar>{{ userInitial }}</n-avatar>-->
<!--      </n-space>-->
<!--    </n-dropdown>-->

  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/colors' as *;
.header {
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  padding: 0 32px;
  border-bottom: solid 1px $border-color;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $nav-background;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .username {
    text-transform: capitalize;
  }
}
</style>
