<template>
  <div>
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints.hour"
      :updating="updating"
      timeunit="minute"
      title="Letze Stunde"
      :class="{ kindle: small }"
    />
    <v-spacer />
    <LineGraphCard
      :initial-loading="initialLoading"
      :lines="datapoints.day"
      :updating="updating"
      timeunit="hour"
      title="Letze 24h"
      :class="{ kindle: small }"
    />
    <v-spacer />
    <LineGraphCard
      v-if="datapoints.week"
      :initial-loading="initialLoading"
      :lines="datapoints.week"
      :updating="updating"
      timeunit="hour"
      title="Letze 24h"
      :class="{ kindle: small }"
    />
  </div>
</template>
<script>
export default {
  name: 'Graphs',
  props: {
    datapoints: { type: Object, default: () => {} },
    initialLoading: { type: Boolean, default: true },
    updating: { type: Boolean, default: true },
    small: { type: Boolean, default: false },
  },
}
</script>

<style scoped>
.kindle {
  height: 200px;
}
</style>
