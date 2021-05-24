<script src="../api/index.js"></script>
<template>
  <div>
    <v-btn @click="addDevice">add device</v-btn>
    <v-btn @click="addPost">add post</v-btn>
    <div v-for="d in data" :key="d.hostname">{{ d }}</div>
  </div>
</template>

<script>
export default {
  name: 'Sqlite',
  data() {
    return {
      data: [],
    }
  },
  async fetch() {
    this.data = (await this.$axios.get('/device/mine2')).data
  },
  mounted() {},
  methods: {
    addDevice() {
      this.$axios
        .post('/device', { name: 'rando', hostname: 'mine2' + Math.random() })
        .then((a) => this.data.push(a.data))
    },
    addPost() {
      this.$axios.$post('/datapoint', {
        hostname: 'mine2',
        humidity: 1,
        light: 1,
        temperature: 1,
      })
    },
  },
}
</script>
