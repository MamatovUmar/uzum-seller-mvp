<script setup lang="ts">
import ChartJs from 'chart.js/auto';
import { PieData } from '~/types'

const { data } = defineProps<{
  data: PieData
}>()


const myChart = ref<HTMLCanvasElement>()

function setChart() {
  if(myChart.value) {

    new ChartJs(myChart.value, {
      type: 'doughnut',
      data: {
        labels: ['В процессе', 'Продано', 'Возврат'],
        datasets: [
          {
            data: [
                data.PROCESSING,
                data.TO_WITHDRAW,
                data.CANCELED
            ],
            backgroundColor: [
              '#0094FA',
              '#51E7A2',
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
