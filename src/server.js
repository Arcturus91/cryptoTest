var express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require("./database");
const User = require("../models/Users");

Tasks = [{
    _id:0,
    title:'do homwork',
    description: 'lorem ipsum',
    number:100
},
{
    _id:1,
    title:'done homwork',
    description: 'lorem ipsum',
    number:100
},
{
    _id:2,
    title:'run',
    description: 'lorem ipsum',
    number:100
}]


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    greet(name: String!): String
    tasks:[Task]
    Users:[User]
  }

type Task {
    _id:ID
    title: String!
    description: String!
    number:Int
}

type User {
    _id:ID
    firstname:String!
    lastname: String!
    age:Int
}

type Mutation {
    createTask(input:TaskInput) : Task
    createUser(input:UserInput) : User
}

input TaskInput {
    title:String!
description:String!
number:Int
}

input UserInput {
    firstname:String!
    lastname:String
    age:Int
}

`);

app.get('/',(req, res, next) =>{

    res.json({
        'message':'hello world'
    })
})
//EL RESOLVER, el resolver es como tu controlador.
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  greet:({name},context)=>{
    console.log(context)
    return `hello ${name}`
  },
tasks:()=>{
return Tasks;    
},

createTask:(({input})=>{
    input._id = Tasks.length;
Tasks.push(input)
return input
}),

async createUser({input}){
   const newUser = new User(input)
   await newUser.save()
   return newUser
},

async Users(){
    const users = await User.find()
    return users}


};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
  context:{
    messageId:'test'
  }
}));


app.listen(4000,()=>console.log('Server on port 4000'));
console.log('Running a GraphQL API server at localhost:4000/graphql');