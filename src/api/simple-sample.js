var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  input MessageInput {
    content: String
    author: String
  }
  type Message {
    id: ID!
    content: String
    author: String
  }
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
    getMessage(id: ID!): Message
  }
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

// The root provides a resolver function for each API endpoint
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: function (args) {
     var output = [];
     for (var i = 0; i < args.numDice; i++) {
       output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
     }
     return output;
   },
   getDie: function ({numSides}) {
     return new RandomDie(numSides || 6);
   },
   getMessage: function ({id}) {
   if (!fakeDatabase[id]) {
     throw new Error('no message exists with id ' + id);
   }
   return new Message(id, fakeDatabase[id]);
 },
 createMessage: function ({input}) {
   // Create a random id for our "database".
   var id = require('crypto').randomBytes(10).toString('hex');

   fakeDatabase[id] = input;
   return new Message(id, input);
 },
 updateMessage: function ({id, input}) {
   if (!fakeDatabase[id]) {
     throw new Error('no message exists with id ' + id);
   }
   // This replaces all old data, but some apps might want partial update.
   fakeDatabase[id] = input;
   return new Message(id, input);
 },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
