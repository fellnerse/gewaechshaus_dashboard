<template>
  <div>
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
    }
  },

  mounted() {
    this.datapoints = this.$localStorage.loadESPData(this.hostname)

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
