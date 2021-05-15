function loadDate(hostname, timeUnit = 'day') {
  return new Date(localStorage.getObject(`${hostname}_${timeUnit}_date`) || 0)
}

function setDate(hostname, timeUnit, value) {
  localStorage.setObject(`${hostname}_${timeUnit}_date`, value)
}

function loadESPData(hostname = 'esp0') {
  const storedDict = localStorage.getObject(hostname) || {
    day: [],
    hour: [],
    week: [],
  }

  // this makes sure we still have Date object
  for (const [name, data] of Object.entries(storedDict)) {
    storedDict[name] = data.map((a) => {
      a.date = new Date(a.date)
      return a
    })
  }
  return storedDict
}

function setESPData(datapoints, hostname) {
  localStorage.setObject(hostname, datapoints)
}

function setESPSelect(hostname) {
  localStorage.setItem('esp-select', hostname)
}

function getESPSelect() {
  return localStorage.getItem('esp-select') || 'esp0'
}

function deleteLocalStorage() {
  localStorage.clear()
}

export default function _localStorage(context, inject) {
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value))
  }

  Storage.prototype.getObject = function (key) {
    const value = this.getItem(key)
    return value && JSON.parse(value)
  }

  inject('localStorage', {
    loadDate,
    loadESPData,
    setESPSelect,
    getESPSelect,
    setESPData,
    setDate,
    deleteLocalStorage,
  })
}
