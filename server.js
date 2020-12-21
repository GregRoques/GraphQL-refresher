const express = require("express");
const app = express();

const { artists, albums } = require("./pseudoDataBase");

const expressGraphQL = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const albumType = new GraphQLObjectType({
  name: "Album",
  description: "This represents an album composed by an artist",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    albums: {
      type: new graphQLList(albumType),
      description: "List of Great Listens.",
      resolve: () => albums,
    },
  }),
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("Port 5,000");
});
