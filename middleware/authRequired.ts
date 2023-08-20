import { useAuth } from '~/composables/useAuth'
import { useRootStore } from '~/store/root'
import { useCookie } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  const token = useCookie('token')
  const root = useRootStore()

  if (token.value && !root.account) {
    await root.fetchUser()
  }

  if (!auth.isAuthed.value) {
    return navigateTo('/login')
  }
})