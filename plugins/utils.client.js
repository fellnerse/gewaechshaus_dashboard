import gql from 'graphql-tag'

function biggerDate(a, b) {
  return a > b ? a : b
}

function getStartDates(hostname, { $localStorage }) {
  const dates = {}

  const weekStart = new Date(new Date() - 7 * 24 * 3600 * 1000)
  const weekLoad = $localStorage.loadDate(hostname, 'week')

  dates.week = {
    start: weekStart,
    load: biggerDate(weekStart, weekLoad),
    minuteRestriction: (query) => query.where('minute', 'in', [0]),
  }

  const dayStart = new Date(new Date() - 24 * 3600 * 1000)
  const dayLoad = $localStorage.loadDate(hostname, 'day')

  dates.day = {
    start: dayStart,
    load: biggerDate(dayStart, dayLoad),
    minuteRestriction: (query) => query.where('minute', 'in', [0, 15, 30, 45]),
  }

  const hourStart = new Date(new Date() - 3600 * 1000)
  const hourLoad = $localStorage.loadDate(hostname, 'hour')

  dates.hour = {
    start: hourStart,
    load: biggerDate(hourStart, hourLoad),
    minuteRestriction: (_) => _,
  }

  return dates
}

function getData({ dates, hostname, datapoints }, { app, $localStorage }) {
  const promises = []
  for (const [name, date] of Object.entries(dates)) {
    const query = app.apolloProvider.defaultClient
      .query({
        query: gql`
          query datapoint($start: DateTime!, $hostname: String!) {
            datapoint(
              filter: { start: $start, hostname: $hostname }
              orderBy: { uploadedAt: asc }
            ) {
              temperature
              humidity
              light
              uploadedAt
            }
          }
        `,
        variables: {
          start: date.load,
          hostname,
        },
      })
      .then((queryResult) => {
        queryResult.data.datapoint.forEach((datapoint) => {
          datapoint.date = new Date(datapoint.uploadedAt)
          datapoints[name].push(datapoint)
        })

        const loadedItems = queryResult.data.datapoint.length
        console.log(hostname + ' added ' + name + ': ' + loadedItems)

        // remove data that is too old -> so the graph does not grow,
        // but "slides"
        if (loadedItems) {
          datapoints[name] = datapoints[name].filter((d) => {
            return d.date > date.start
          })
          return { hostname, name, date: datapoints[name].slice(-1)[0].date }
        }
      })

    promises.push(query)
  }
  return Promise.all(promises).then((dates) => {
    /* try {
      $localStorage.setESPData(datapoints, hostname)
      for (const x of dates) {
        const { hostname, name, date } = x
        $localStorage.setDate(hostname, name, date)
      }
    } catch (e) {
      console.log('No Space left')
    } */
  })
}

function getHostnamesFromFirebase({ app }) {
  return app.apolloProvider.defaultClient
    .query({
      query: gql`
        query {
          device {
            text: name
            value: hostname
          }
        }
      `,
    })
    .then((data) => data.data.device)
}

function getHostnameFromFirebase(hostname, { app }) {
  return app.apolloProvider.defaultClient
    .query({
      query: gql`
        query device($hostname: String!) {
          device(hostname: $hostname) {
            text: name
            value: hostname
          }
        }
      `,
      variables: {
        hostname,
      },
    })
    .then((data) => data.data.device)
}

export default function utilsClient(context, inject) {
  inject('utils', {
    getStartDates: (_) => getStartDates(_, context),
    getHostnamesFromFirebase: () => getHostnamesFromFirebase(context),
    getHostnameFromFirebase: (_) => getHostnameFromFirebase(_, context),
    getData: (_) => getData(_, context),
  })
}
