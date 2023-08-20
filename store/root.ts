import { defineStore } from 'pinia'
import { UserInterface, Response, UzumAccount } from '~/types'
import { useCustomFetch } from '~/composables/useFetch'

export const useRootStore = defineStore('root', {

  state: (): RootState => ({
    account: null
  }),

  getters: {
    user: (state) => state.account as UserInterface
  },

  actions: {
    async fetchUser() {
      try {
        if (this.account) return
        const { data } = await useCustomFetch<Response<UserInterface>>('/user')
        if(data.value?.status) this.account = data.value.data
      } catch (e) {
        console.log(e)
      }
    },

    async updateAccount(form: UzumAccount) {
      try {
        const { data } = await useCustomFetch<Response<UserInterface>>('/user/account', {
          method: 'POST',
          body: form
        })
        if(data.value?.status) this.account = data.value.data
      } catch (e) {
        console.log(e)
      }
    }
  }
})

interface RootState {
  account: UserInterface | null
}