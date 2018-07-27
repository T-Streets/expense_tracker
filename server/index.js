const { GraphQLServer } =  require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/xpense_tracker")

const Expense = mongoose.model('Expense', {
    type: String,
    name: String,
    amount: String

})

/**
 * Sets Schema for DB
 * creates a type for db = expense
 * mutation is set on how to manipulate data
 */
const typeDefs = `
  type Query {
    hello(name: String): String!
    expenses: [Expense]
  }
  type Expense {
      id: ID!,
      type: String!,
      name: String!,
      amount: String!
  }
  type User {
      id: ID!,
      email: String!,
      password: String!,
      username: String!
  }
  type Mutation {
      createExpense(type: String!, name: String!, amount: String!): Expense
      createUser(email: String!, password: String!, username: String!): User
  }
`
/**
 * Creates new instance of Expense type
 * if successful, saves new data to DB
 */
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    expenses: () => Expense.find()
  },
  Mutation: {
      createExpense: async (_, { type, name, amount }) => {
        const expense = new Expense({ type, name, amount});
        await expense.save();
        return expense
      },
      createUser: async (_, { email, password, username }) => {
          const user = new User({ email, password, username});
          await expense.save();
          return user
      }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

/**
 * Connects to DB then runs GraphQL server
 */
mongoose.connection.once('open', () => {
    server.start(() => console.log('Server is running on localhost:4000'))
})
