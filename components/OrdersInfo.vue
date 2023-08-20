<script setup lang="ts">

import { OrderStats } from '~/types'

const { data } = defineProps<{
  data: OrderStats
}>()

const withdraw = computed(() => data.withdraw.map(el => el.withdraw).reduce((accumulator, currentValue) => accumulator + currentValue))
const commission = computed(() => data.withdraw.map(el => el.commission).reduce((accumulator, currentValue) => accumulator + currentValue))
const profit = computed(() => data.withdraw.map(el => el.profit).reduce((accumulator, currentValue) => accumulator + currentValue))

</script>

<template>
  <n-card title="Общая информация">
    <n-list bordered>
      <n-list-item>
        Общая количество заказов: {{ data.pie.PROCESSING + data.pie.TO_WITHDRAW + data.pie.CANCELED }} шт.
      </n-list-item>
      <n-list-item>
        Закрытые: {{ data.pie.TO_WITHDRAW }} шт.
      </n-list-item>
      <n-list-item>
        Возврат: {{ data.pie.CANCELED }} шт.
      </n-list-item>
      <n-list-item>
        Заказы в процессе: {{ data.pie.PROCESSING }} шт.
      </n-list-item>
      <n-list-item>
        Доход за все время: {{ new Intl.NumberFormat().format(profit) }} UZS
      </n-list-item>
      <n-list-item>
        Выведено: {{ new Intl.NumberFormat().format(withdraw) }} UZS
      </n-list-item>
      <n-list-item>
        Выплачено комиссия: {{ new Intl.NumberFormat().format(commission) }} UZS
      </n-list-item>
      <n-list-item>
        Доступно к выводу: 0 UZS
      </n-list-item>
    </n-list>
  </n-card>
</template>

<style scoped lang="scss">

</style>
