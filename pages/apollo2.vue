<template>
  <div>{{ hello }}</div>
</template>

<script>
// import gql from 'graphql-tag'

import gql from 'graphql-tag'

export default {
  data() {
    return {
      // Initialize your apollo data
      hello: '',
    }
  },
  mounted() {
    console.log(
      this.$apollo.query({
        query: gql`
          {
            books {
              title
            }
          }
        `,
      })
    )
  },
  // apollo: {
  //   // Simple query that will update the 'hello' vue property
  //   hello: gql`
  //     {
  //       hello
  //     }
  //   `,
  // },
}
</script>
