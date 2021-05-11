<template>
  <v-card class="mb-3">
    <v-skeleton-loader v-if="initialLoading" class="mx-auto" type="card">
    </v-skeleton-loader>

    <LineGraph
      v-else
      :chart-data="chartData"
      :title="title"
      :timeunit="timeunit"
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
        labels: this.lines.map((line) => line[0]),
        datasets: [
          {
            data: this.lines.map((line) => line[1]),
            label: 'Luftfeuchte in %',
            borderColor: 'black',
            fill: false,
            pointRadius: 1,
          },
          {
            data: this.lines.map((line) => line[2]),
            label: 'Temperatur in °C',
            borderColor: 'black',
            borderDash: [10, 5],
            fill: false,
            pointRadius: 1,
          },
          {
            data: this.lines.map((line) => line[3]),
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
  padding-left: -35px;
  padding-top: -35px;
}
</style>
