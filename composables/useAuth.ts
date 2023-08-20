import { AuthForm } from '~/types/auth'
import { useCookie, useRouter, computed } from '#imports'
import { Response } from '~/types'
import { useCustomFetch } from '@/composables/useFetch'
import { useRootStore } from '~/store/root'

export const useAuth = () => {
  const router = useRouter()
  const root = useRootStore()
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24
  })

  const isAuthed = computed(() => !!(token.value && root.account))

  const login = async (form: AuthForm) => {
    const { data } = await useCustomFetch<Response<{token: string}>>('/login', {
      method: 'POST',
      body: form
    })
    if(data.value?.status) {
      token.value = data.value.data.token
    }
  }

  const logout = async () => {
    token.value = null
    root.account = null
    await router.push('/login')
  }

  return {
    login,
    logout,
    token,
    isAuthed
  }

}