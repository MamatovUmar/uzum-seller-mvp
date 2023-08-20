<script setup lang="ts">
import ChartJs from 'chart.js/auto'
import { OrderType } from '~/types'
import { computed } from '#imports'

const myLineChart = ref<HTMLCanvasElement>()

const { data } = defineProps<{
  data: OrderType[]
}>()

const orders = computed(() => {
  return data.filter((el) => el.amount !== 0)
})

const labels = computed(() => orders.value.map(el => el.date))
const profits = computed(() => orders.value.map(el => el.profit))
const commissions = computed(() => orders.value.map(el => el.commission))

function setChart() {
  if(myLineChart.value) {
    new ChartJs(myLineChart.value, {
      type: 'line',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: 'Прибыль',
            backgroundColor: '#0094FA',
            data: profits.value,
            borderWidth: 2,
            borderColor: '#0094FA',
            pointRadius: 5
          },
          {
            label: 'Комиссия',
            backgroundColor: '#51E7A2',
            data: commissions.value,
            borderWidth: 2,
            borderColor: '#51E7A2',
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
    })
  }
}

onMounted(() => {
  setChart()
})

</script>

<template>
  <n-card title="Статистика дохода">
    <canvas ref="myLineChart" height="300px"></canvas>
  </n-card>
</template>

<style scoped lang="scss">

</style>
