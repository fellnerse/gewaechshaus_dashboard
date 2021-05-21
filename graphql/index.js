import express from 'express'
import { gql, ApolloServer } from 'apollo-server-express'

const PORT = 3001

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
//
//   schema {
//     query: Query
//   }
// `

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()

app.use(express.json())
export default {
  path: '/gewaechshaus_dashboard/graphql',
  handler: app,
}

server.applyMiddleware({ app })

app
  .listen({ port: PORT }, () => {
    console.log(
      `GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  })
  .on('error', (e) => {
    // if (e.code === 'EADDRINUSE') {
    //   console.log('Address in use, retrying...');
    // }
  })

console.log('this', this)
