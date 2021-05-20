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

function getData({ dates, hostname, datapoints }, { $fire, $localStorage }) {
  const promises = []
  for (const [name, date] of Object.entries(dates)) {
    let query = $fire.firestore
      .collection('datapoints/' + hostname + '/data')
      .orderBy('date', 'desc')
      .endBefore(date.load)
      .startAt(new Date())

    query = date.minuteRestriction(query)

    query = query
      .limit(3000)
      .get()
      .then((snapshot) => {
        snapshot.docs.reverse().forEach((doc) => {
          // add datapoint to correct list
          const data = doc.data()
          data.date = data.date.toDate()
          datapoints[name].push(data)
        })
        console.log(hostname + ' added ' + name + ': ' + snapshot.docs.length)
        // remove data that is too old -> so the graph does not grow,
        // but "slides"

        if (snapshot.docs.length) {
          datapoints[name] = datapoints[name].filter((d) => {
            return d.date > date.start
          })
          $localStorage.setDate(
            hostname,
            name,
            datapoints[name].slice(-1)[0].date
          )
        }
      })

    promises.push(query)
  }
  return Promise.all(promises).then(() =>
    $localStorage.setESPData(datapoints, hostname)
  )
}

function getHostnamesFromFirebase({ $fire }) {
  return $fire.firestore
    .collection('/datapoints')
    .get()
    .then((snapshot) =>
      snapshot.docs.map((snap) => {
        return {
          text: snap.data().name,
          value: snap.id,
        }
      })
    )
}

function getHostnameFromFirebase(name, { $fire }) {
  return $fire.firestore
    .collection('/datapoints')
    .doc(name)
    .get()
    .then((snapshot) => {
      return {
        text: snapshot.data().name,
        value: snapshot.id,
      }
    })
}

export default function utilsClient(context, inject) {
  inject('utils', {
    getStartDates: (_) => getStartDates(_, context),
    getHostnamesFromFirebase: () => getHostnamesFromFirebase(context),
    getHostnameFromFirebase: (_) => getHostnameFromFirebase(_, context),
    getData: (_) => getData(_, context),
  })
}
