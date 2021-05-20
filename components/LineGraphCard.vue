<template>
  <v-card class="mb-3">
    <v-skeleton-loader v-if="initialLoading" type="card"> </v-skeleton-loader>
    <LineGraph
      v-else
      :chart-data="chartData"
      :title="title"
      :timeunit="timeunit"
      style="height: 100%"
    />
    <v-progress-circular
      v-if="updating && !initialLoading"
      indeterminate
      color="purple"
      :size="70"
      :width="7"
      class="center-absolute"
    ></v-progress-circular>
  </v-card>
</template>
<script>
export default {
  name: 'LineGraphCard',
  props: {
    initialLoading: { type: Boolean },
    lines: { type: Array, default: () => [] },
    updating: { type: Boolean },
    title: { type: String, default: '' },
    timeunit: { type: String, default: '' },
  },
  data() {
    return {
      chartData: {},
    }
  },
  watch: {
    lines: function a() {
      this.chartData = {
        labels: this.lines.map((line) => line.date),
        datasets: [
          {
            data: this.lines.map((line) => line.humidity),
            label: 'Luftfeuchte in %',
            borderColor: 'black',
            fill: false,
            pointRadius: 1,
          },
          {
            data: this.lines.map((line) => line.temperature),
            label: 'Temperatur in °C',
            borderColor: 'black',
            borderDash: [10, 5],
            fill: false,
            pointRadius: 1,
          },
          {
            data: this.lines.map((line) => line.light),
            label: 'Light in 💡',
            borderColor: 'black',
            borderDash: [5, 5],
            fill: false,
            pointRadius: 1,
          },
        ],
      }
    },
  },
}
</script>
<style>
.center-absolute {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -35px;
  margin-top: -35px;
}
</style>
