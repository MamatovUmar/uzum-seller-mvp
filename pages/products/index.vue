<script setup lang="ts">
import { computed, reactive, useRouter, h } from '#imports'
import { useProductStore } from '~/store/product'
import type { DataTableColumns } from 'naive-ui'
import { NImage } from 'naive-ui'
import { GetProductParams, Product, SortType } from '~/types/product'
import ProductDetails from '~/components/products/ProductDetails.vue'
import moment from 'moment'
import ChartJs from 'chart.js/auto';

definePageMeta({
  colorMode: 'dark'
})

const productStore = useProductStore()
const router = useRouter()

const loading = ref(false)
const chartLoading = ref(true)
const pagination = reactive({
  pageSize: 5,
  page: 0
})
const sortOptions = reactive<Sorter>({
  order: 'ascend',
  columnKey: 'quantityActive',
  sorter: true
})
const myChart = ref<HTMLCanvasElement>()
const columns = computed<DataTableColumns<Product>>(() => [
  {
    type: 'expand',
    key: 'productId',
    renderExpand: (rowData) => {
      return h(ProductDetails, {
        product: rowData
      })
    }
  },
  {
    title: '',
    key: 'title',
    width: 60,
    render (row, index) {
      return h(NImage, {
        src: row.image,
        width: 30,
        height: 30
      })
    }
  },
  {
    title: 'Товар',
    key: 'title'
  },
  {
    title: 'Цена',
    key: 'price',
    width: 150,
    sorter: true,
    sortOrder: false
  },
  {
    title: 'Продано',
    key: 'quantitySold',
    width: 120,
    sorter: true,
    sortOrder: false
  },
  {
    title: 'На складе',
    key: 'quantityActive',
    width: 120,
    sorter: true,
    sortOrder: false
  },
  {
    title: 'К отправке',
    key: 'quantityCreated',
    width: 120,
    sorter: true,
    sortOrder: false
  },
  {
    title: 'Модерация',
    key: 'moderationStatus.title'
  },

])

async function handleSorterChange (sorter: Sorter) {
  if (!loading.value) {
    sortOptions.columnKey = sorter.columnKey
    sortOptions.order = sorter.order
    sortOptions.sorter = sorter.sorter
    await query()
  }
}

function setLineChart() {
  if(myChart.value) {
    const labels = productStore.statisticsData.map(el => moment(el.createdAt).format('DD.MM.YYYY'))
    const quantity = productStore.statisticsData.map(el => el.quantityActive)
    const sold = productStore.statisticsData.map(el => el.quantitySold)
    const returned = productStore.statisticsData.map(el => el.quantityReturned)

    new ChartJs(myChart.value, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'На складе',
            backgroundColor: '#0094FA',
            data: quantity,
            borderWidth: 2,
            borderColor: '#0094FA',
            pointRadius: 5
          },
          {
            label: 'Продано',
            backgroundColor: '#51E7A2',
            data: sold,
            borderWidth: 2,
            borderColor: '#51E7A2',
            pointRadius: 5
          },
          {
            label: 'Возврат',
            backgroundColor: '#EC034A',
            data: returned,
            borderWidth: 2,
            borderColor: '#EC034A',
            pointRadius: 5
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

async function query() {
  try {
    const params: GetProductParams = {
      searchQuery: '',
      filter: 'all',
      sortBy: sortOptions.columnKey,
      order: sortOptions.order + 'ing',
      size: 300,
      page: pagination.page
    }
    loading.value = true
    await productStore.getProducts(params)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await query()
  chartLoading.value = true
  await productStore.getProductsStat()
  chartLoading.value = false
  setLineChart()
})

interface Sorter {
  columnKey: string
  order: SortType
  sorter: boolean
}


</script>

<template>
  <div class="products">
    <n-page-header
      title="Продукты"
      subtitle="A podcast to improve designs"
      @back="router.go(-1)"
    />

    <div class="chart">
      <n-card>
        <canvas ref="myChart" height="300px"></canvas>
      </n-card>
    </div>



    <n-data-table
      remote
      class="products__table"
      :columns="columns"
      :loading="loading"
      :data="productStore.products"
      :pagination="pagination"
      :max-height="800"
      :row-key="(rowData: object) => (rowData.productId)"
      @update:sorter="handleSorterChange"
    />
  </div>
</template>

<style scoped lang="scss">
.products {
  &__table {
    margin-top: 30px;
  }
  .chart {
    margin-top: 50px;
    margin-bottom: 50px;
  }
}
</style>
