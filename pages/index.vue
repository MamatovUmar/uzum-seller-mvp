<script setup>
import { useCustomFetch } from '#imports'
import ChartJs from 'chart.js/auto';
import LineChart from '~/components/charts/LineChart.vue'
import PieChart from '~/components/charts/PieChart.vue'
import AmountPieChart from '~/components/charts/AmountPieChart.vue'

definePageMeta({
  colorMode: 'dark',
  // middleware: ['auth-required']
})

const myChart = ref()
const info = ref()

async function getStats() {
  try {
    const { data } = await useCustomFetch('https://seller.play-dev.uz/api/parser/orders')
    console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

function setChart(data) {
  if(myChart.value) {
    new ChartJs(myChart.value, {
      title: 'asdasd',
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'В процессе',
            backgroundColor: '#0094FA',
            data: data.processing.map(el => el.quantity)
          },
          {
            label: 'Продано',
            backgroundColor: '#51E7A2',
            data: data.withdraw.map(el => el.quantity)
          },
          {
            label: 'Возврат',
            backgroundColor: '#EC034A',
            data: data.canceled.map(el => el.quantity)
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

onMounted(async () => {
  const res = await getStats()
  info.value = res.value.data
  setChart(res.value.data)
})

</script>

<template>
  <div>
    <n-grid :x-gap="20" :y-gap="20">
      <n-grid-item :span="12">
        <pie-chart v-if="info" :data="info.pie" />
      </n-grid-item>

      <n-grid-item :span="12">
        <OrdersInfo v-if="info" :data="info" />
      </n-grid-item>

      <n-grid-item :span="24">
        <line-chart v-if="info" :data="info.withdraw" />
      </n-grid-item>

      <n-grid-item :span="24">
        <n-card title="Статистика продаж">
          <canvas ref="myChart" height="300px"></canvas>
        </n-card>
      </n-grid-item>
    </n-grid>

    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<style scoped>

</style>
