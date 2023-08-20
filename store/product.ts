import { defineStore } from 'pinia'
import { GetProductParams, Product, ProductResponse, ProductStat } from '~/types/product'
import { useCustomFetch } from '~/composables/useFetch'
import { Response, UserInterface } from '~/types'

export const useProductStore = defineStore('product', {
  state: (): ProductStore => ({
    products: [],
    quantity: 0,
    statisticsData: []
  }),

  actions: {
    async getProducts(params: GetProductParams) {
      try {
        const { data } = await useCustomFetch<Response<ProductResponse>>('/parser/products', {
          params
        })

        if (data.value?.status) {
          this.products = data.value.data.productList
          this.quantity = data.value.data.totalProductsAmount
        }
      } catch (e) {
        console.log(e)
      }
    },

    async getProductsStat() {
      try {
        const { data } = await useCustomFetch<Response<ProductStat[]>>('/parser/products/stat')

        if (data.value?.status) {
          this.statisticsData = data.value.data.sort((a, b) => a.date - b.date)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})

interface ProductStore {
  products: Product[]
  quantity: number
  statisticsData: ProductStat[]
}
