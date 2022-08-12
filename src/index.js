const crypto = require('crypto');
var { graphql, buildSchema } = require('graphql');

let nodeString = 'Man oh man do I love node!'
let song= 'mama! just feel the pain'

let hashed= crypto
  .createHash('sha256')
  .update(nodeString)
  .digest('hex');

  //console.log(hashed)

  let hashNode = '7abd6dc579bdea1a74bed7beac1a770d13a88d8bcc44fadf509b8d5400fe1333'
  let hashNode2 = '7abd6dc579bdea1a74bed7beac1a770d13a88d8bcc44fadf509b8d5400fe1333'

  if (hashNode2 === hashNode){
    console.log('yey')
  }

//GraphQL

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: '{ hello }',
  rootValue
}).then((response) => {
  console.log("yo, graphql respondo en base a promises",response);
});