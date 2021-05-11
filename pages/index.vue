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
      <v-col cols="auto" class="pt-0" @click="getData">
        <v-btn elevation="0"><v-icon>mdi-reload</v-icon></v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints[espHostname].hour"
      :updating="updating"
      timeunit="minute"
      title="Letze Stunde"
    />
    <v-spacer />
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints[espHostname].day"
      :updating="updating"
      timeunit="hour"
      title="Letze 24h"
    />
    <v-spacer />
    <v-spacer />
    <v-container>
      <v-row v-if="initialLoading">
        <v-col v-for="a in 16" :key="a">
          <v-skeleton-loader
            v-if="initialLoading"
            class="mx-auto"
            max-height="100"
            type="card"
            width="150"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(line, idx) in datapoints.hour" :key="idx">
          <v-card>
            <div class="text-h5">
              {{ line.date }}
            </div>
            <div class="text-body2">{{ line.humidity.toFixed(2) }}%</div>
            <div class="text-body2">{{ line.temperature.toFixed(2) }}°C</div>
            <div class="text-body2">{{ line.light.toFixed(2) }}°C</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      initialLoading: true,
      datapoints: { esp0: [] },
      updateInterval: 300000,
      updating: false,
      espHostname: 'esp0',
      hostnames: [],
    }
  },

  async mounted() {
    await this.loadHostnames()
    this.setupLocalStorage()

    for (const hostname of this.hostnames) {
      this.datapoints[hostname] = localStorage.getObject(hostname) || {
        day: [],
        hour: [],
      }
      this.rehydrateDates(this.datapoints[hostname])
    }
    this.espHostname = localStorage.getItem('esp-select') || this.espHostname
    this.getData()
  },

  methods: {
    async loadHostnames() {
      await this.$fire.firestore
        .collection('/datapoints')
        .get()
        .then((snapshot) =>
          snapshot.forEach((snap) => this.hostnames.push(snap.id))
        )
    },
    rehydrateDates(storedDict) {
      storedDict.hour.map((a) => {
        a.date = new Date(a.date)
        return a
      })
      storedDict.day.map((a) => {
        a.date = new Date(a.date)
        return a
      })
    },
    setupLocalStorage() {
      Storage.prototype.setObject = function (key, value) {
        this.setItem(key, JSON.stringify(value))
      }

      Storage.prototype.getObject = function (key) {
        const value = this.getItem(key)
        return value && JSON.parse(value)
      }
    },
    biggerDate(a, b) {
      return a > b ? a : b
    },
    getStartDates() {
      const dates = {}
      const dayStart = new Date(new Date() - 24 * 3600 * 1000)
      const dayLoad = new Date(
        localStorage.getObject(this.espHostname + '_day_date') || 0
      )
      dates.day = {
        start: dayStart,
        load: this.biggerDate(dayStart, dayLoad),
        minuteRestriction: (query) =>
          query.where('minute', 'in', [0, 15, 30, 45]),
      }

      const hourStart = new Date(new Date() - 3600 * 1000)
      const hourLoad = new Date(
        localStorage.getObject(this.espHostname + '_hour_date') || 0
      )

      dates.hour = {
        start: hourStart,
        load: this.biggerDate(hourStart, hourLoad),
        minuteRestriction: (_) => _,
      }
      return dates
    },
    addDatapoint(datapoint, key) {
      datapoint.date = datapoint.date.toDate()

      this.datapoints[datapoint.hostname][key].push(datapoint)
    },

    filterDatapoints(key, startDate) {
      this.datapoints[this.espHostname][key] = this.datapoints[
        this.espHostname
      ][key].filter((data) => {
        return data.date > startDate
      })
      localStorage.setObject(
        this.espHostname + '_' + key + '_date',
        this.datapoints[this.espHostname][key].slice(-1)[0].date
      )
    },
    switchEsp() {
      localStorage.setItem('esp-select', this.espHostname)
      this.getData()
    },
    async getData() {
      const dates = this.getStartDates()
      this.updating = true
      for (const [name, date] of Object.entries(dates)) {
        let query = this.$fire.firestore
          .collection('datapoints/' + this.espHostname + '/data')
          .orderBy('date', 'desc')
          .endBefore(date.load)

        query = date.minuteRestriction(query)

        await query
          .limit(3000)
          .get()
          .then((snapshot) => {
            snapshot.docs.reverse().forEach((doc) => {
              const data = doc.data()
              this.addDatapoint(data, name)
            })
            console.log(
              this.espHostname + ' added ' + name + ': ' + snapshot.docs.length
            )
            if (snapshot.docs.length) this.filterDatapoints(name, date.start)
          })
      }
      this.initialLoading = false
      this.updating = false

      localStorage.setObject(
        this.espHostname,
        this.datapoints[this.espHostname]
      )
    },
  },
}
</script>
