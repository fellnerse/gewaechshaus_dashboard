<template>
  <v-container justify="center">
    <v-row align="center" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pt-0">
        <v-select
          v-model="espHostname"
          :items="hostnames"
          style="max-width: 75px"
          @change="switchEsp"
        >
        </v-select>
      </v-col>
      <v-col cols="auto" class="pt-0">
        <v-btn elevation="0" :disabled="updating" @click="getDataWrapper"
          ><v-icon>mdi-reload</v-icon></v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <Graphs
      :datapoints="datapoints[espHostname]"
      :initial-loading="initialLoading"
      :updating="updating"
    />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      initialLoading: true,
      datapoints: { esp0: {} },
      updateInterval: 300000,
      updating: false,
      espHostname: 'esp0',
      hostnames: [],
    }
  },

  async mounted() {
    this.hostnames = await this.$utils.getHostnamesFromFirebase()

    for (const hostname of this.hostnames) {
      this.datapoints[hostname] = this.$localStorage.loadESPData(hostname)
    }
    this.espHostname = this.$localStorage.getESPSelect()
    this.getDataWrapper()
  },

  methods: {
    switchEsp() {
      this.$localStorage.setESPSelect(this.espHostname)
      this.getDataWrapper()
    },
    getDataWrapper() {
      if (this.updating) return
      this.updating = true
      this.$utils
        .getData({
          dates: this.$utils.getStartDates(this.espHostname),
          hostname: this.espHostname,
          datapoints: this.datapoints[this.espHostname],
        })
        .then(() => {
          this.initialLoading = false
          this.updating = false
        })
    },
  },
}
</script>
