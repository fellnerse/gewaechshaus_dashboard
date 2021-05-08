<template>
  <v-container justify="center">
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints.hour"
      :updating="updating"
      timeunit="minute"
      title="Letze Stunde"
    />
    <v-spacer />
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints.day"
      :updating="updating"
      timeunit="hour"
      title="Letze 24h"
    />
    <v-spacer />
    <!--    <LineGraphCard-->
    <!--      :initial-loading="initialLoading"-->
    <!--      :lines="lines"-->
    <!--      :updating="updating"-->
    <!--      timeunit="day"-->
    <!--      title="Alle Daten"-->
    <!--    />-->
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
              {{ line[0] }}
            </div>
            <div class="text-body2">{{ line[1].toFixed(2) }}%</div>
            <div class="text-body2">{{ line[2].toFixed(2) }}°C</div>
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
      initialLoading: false,
      datapoints: {},
      hourlyData: [],
      updateInterval: 300000,
      updating: false,
    }
  },

  mounted() {
    this.setupLocalStorage()

    this.datapoints = {
      hour: localStorage.getObject('hour') || [],
      day: localStorage.getObject('day') || [],
    }
    console.log(this.datapoints)

    this.datapoints.hour.map((a) => {
      a[0] = new Date(a[0])
      return a
    })
    this.datapoints.day.map((a) => {
      a[0] = new Date(a[0])
      return a
    })
    this.datapoints.hour.reverse().reverse()
    this.datapoints.day.reverse().reverse()
    console.log('mounted', this.datapoints)
    // this.updating = false
    // this.initialLoading = false
    this.getData()
  },

  methods: {
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
      const dayLoad = new Date(localStorage.getObject('day_date') || 0)
      dates.day = {
        start: dayStart,
        load: this.biggerDate(dayStart, dayLoad),
      }

      const hourStart = new Date(new Date() - 3600 * 1000)
      const hourLoad = new Date(localStorage.getObject('hour_date') || 0)

      dates.hour = {
        start: hourStart,
        load: this.biggerDate(hourStart, hourLoad),
      }
      // const oneDayAgo = new Date()
      // go two hours into future (as current data has an issue with this)
      // oneDayAgo.setTime(oneDayAgo.getTime() + 2 * 3600 * 1000 - 6 * 30 * 1000)
      return dates
    },
    addDatapoint(datapoint, key) {
      const constructedArr = [
        datapoint.date.toDate(),
        datapoint.humidity,
        datapoint.temperature,
      ]
      this.datapoints[key].push(constructedArr)
    },

    filterDatapoints(key, startDate) {
      this.datapoints[key] = this.datapoints[key].filter((data) => {
        return data[0] > startDate
      })

      localStorage.setObject(key, this.datapoints[key])

      console.log(key + '_date', this.datapoints[key].slice(-1)[0][0])
      localStorage.setObject(
        key + '_date',
        this.datapoints[key].slice(-1)[0][0]
      )
    },
    getData() {
      const dates = this.getStartDates()
      console.log('dates', dates)
      for (const [name, date] of Object.entries(dates)) {
        this.$fire.firestore
          .collection('datapoints/esp1/data')
          .orderBy('date', 'desc')
          .endBefore(date.load)
          .limit(2000)
          .get()
          .then((snapshot) => {
            snapshot.docs.reverse().forEach((doc) => {
              const data = doc.data()
              this.addDatapoint(data, name)
            })
            console.log('loaded num docs', name, snapshot.docs.length)
            this.filterDatapoints(name, date.start)
            // this.initialLoading = false
          })
      }
    },
  },
}
</script>
