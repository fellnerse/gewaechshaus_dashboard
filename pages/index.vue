<template>
  <v-container justify="center">
    <v-row align="center" justify="center">
      <v-col cols="auto" class="pt-0">
        <v-select
          v-model="espHostname"
          :items="devices"
          style="max-width: 200px"
          @change="switchEsp"
        >
        </v-select>
      </v-col>
      <v-col cols="auto" class="pt-0">
        <v-btn icon color="green" :disabled="updating" @click="getDataWrapper"
          ><v-icon>mdi-reload</v-icon></v-btn
        >
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto" class="pt-0">
        <v-btn icon color="red" @click="deleteLocalStorage"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <LineGraphCard :lines="liveData" timeunit="second" title="Live" />
    <Graphs
      :datapoints="datapoints[espHostname]"
      :initial-loading="initialLoading"
      :updating="updating"
    />
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
// const SUBSCRIPTION_ONLINE_USERS =
export default {
  data() {
    return {
      initialLoading: true,
      datapoints: {},
      updateInterval: 300000,
      updating: false,
      espHostname: '',
      devices: [],
      hostNames: [],
      liveData: [],
    }
  },

  async mounted() {
    this.devices = await this.$utils.getHostnamesFromFirebase()
    this.hostNames = this.devices.map((device) => device.value)

    for (const hostname of this.hostNames) {
      this.datapoints[hostname] = this.$localStorage.loadESPData(hostname)
    }
    this.espHostname =
      this.$localStorage.getESPSelect() || this.hostNames[0] || ''
    this.$localStorage.setESPSelect(this.espHostname)

    this.getDataWrapper()
    this.subscribe(this.espHostname)
  },

  methods: {
    switchEsp() {
      this.$localStorage.setESPSelect(this.espHostname)
      this.getDataWrapper()
      this.liveData = []
      this.subscribe(this.espHostname)
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
    deleteLocalStorage() {
      this.$localStorage.deleteLocalStorage()
    },
    subscribe(hostname) {
      const subscription = this.$apollo.subscribe({
        query: gql`
          subscription datapoint($hostname: String!) {
            datapoint(hostname: $hostname) {
              humidity
              temperature
              light
              uploadedAt
            }
          }
        `,
        variables: {
          hostname,
        },
      })
      subscription.subscribe({
        next: ({ data }) => {
          data.datapoint.date = new Date(data.datapoint.uploadedAt)
          this.liveData.push(data.datapoint)
        },
      })
    },
  },
}
</script>
