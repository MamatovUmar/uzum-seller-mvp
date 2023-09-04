import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

export function useCustomFetch<T> (url: string, options: UseFetchOptions<T> = {}) {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.baseURL,
    key: url,
    headers: token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {},

    onResponse (ctx) {
      if (ctx.response._data.status) {
        // @ts-ignore
        console.log(`%c Response: ${ctx.options?.key} `, 'background: green', ctx.response._data)
      }
    },

    onResponseError (ctx) {
      if (ctx.response.status === 401) {
        token.value = null
        navigateTo('/login')
      }
      // @ts-ignore
      console.log(`%c Error: ${ctx.options?.method} ${ctx.options?.key} `, 'background: red', ctx.response._data)
    }
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
