<script setup lang="ts">
import ChartJs from 'chart.js/auto';
import { OrderStats } from '~/types'

const { data } = defineProps<{
  data: OrderStats
}>()

const myChart = ref<HTMLCanvasElement>()

const withdraw = computed(() => data.withdraw.map(el => el.withdraw).reduce((accumulator, currentValue) => accumulator + currentValue))
const commission = computed(() => data.withdraw.map(el => el.commission).reduce((accumulator, currentValue) => accumulator + currentValue))
const profit = computed(() => data.withdraw.map(el => el.profit).reduce((accumulator, currentValue) => accumulator + currentValue))

function setChart() {
  if(myChart.value) {
    new ChartJs(myChart.value, {
      type: 'doughnut',
      data: {
        labels: ['В процессе', 'Продано', 'Возврат'],
        datasets: [
          {
            data: [
              withdraw.value,
              commission.value,
              profit.value
            ],
            backgroundColor: [
              '#F45B0F',
              '#6D81F5',
              '#20DEFF'
            ],
            hoverOffset: 4
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
  <n-card title="Статус заказов">
    <canvas ref="myChart" height="300px"></canvas>
  </n-card>
</template>

<style scoped lang="scss">

</style>
