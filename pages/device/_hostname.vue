<template>
  <div>
    <div v-if="device.text" class="text-h4 font-weight-bold text-center mb-2">
      {{ device.text }}
    </div>
    <v-skeleton-loader v-else type="heading" class="mx-auto mb-2" width="400px">
    </v-skeleton-loader>
    <Graphs
      :datapoints="datapoints"
      :initial-loading="initialLoading || !datapoints"
      :updating="updating"
      :small="true"
    />
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    const hostname = params.hostname // When calling /abc the slug will be "abc"
    return { hostname }
  },
  data() {
    return {
      initialLoading: true,
      datapoints: {},
      updating: false,
      device: {},
    }
  },

  mounted() {
    this.datapoints = this.$localStorage.loadESPData(this.hostname)
    this.$utils
      .getHostnameFromFirebase(this.hostname)
      .then((device) => (this.device = device))
    this.getDataWrapper()
  },

  methods: {
    getDataWrapper() {
      if (this.updating) return
      this.updating = true
      this.$utils
        .getData({
          dates: this.$utils.getStartDates(this.hostname),
          hostname: this.hostname,
          datapoints: this.datapoints,
        })
        .then(() => {
          this.initialLoading = false
          this.updating = false
          // make sure vue registers change
          for (const data of Object.values(this.datapoints)) {
            data.reverse().reverse()
          }
        })
    },
  },
}
</script>
