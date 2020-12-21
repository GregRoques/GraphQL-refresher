**Benefits:** Allows you to get all the information you need from a server in one call, as opposed to potentially multiple with REST.

### Project Dependencies

- npm i express express-graphql graphql

### Set-up User Test Interface

The "npm i express-graphql" has a function called "graphiql"; import this from "express-graphql" and set it to "true" within your GraphQL end point and you can access and trouble shoot your api via the browser similar to Postman.

**ex:**

```
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
```

![graphiql](./readMePic/graphiql.png)

### NonNull middleware

- imported from "npm i graphql", this ensures a type will not return an empty or invalid value.

**ex:**

- As seen below, the GraphQLNonNull Object ensure the integer (GraphQLInt) and string (GraphQLString) types do not return an invalid value.

```
const albumType = new GraphQLObjectType({
  name: album,
  description: "This represents an album composed by an artist",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
  }),
});
```

### making tables extendable from each other

You reference another "GraphQLObjectType" from within a field to create a reference to another table.

As seen where I call the resolve within the "artist" object, I pass the "parent" objectType as variable name album (or name it whatever you want) so that I can create a reference to return the fields I want.

```
const AlbumType = new GraphQLObjectType({
  name: "Album",
  description: "This represents an album composed by an artist",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    artistId: { type: GraphQLNonNull(GraphQLInt) },
    artist: {
      type: ArtistType,
      resolve: (album) => {
        return artists.find((artist) => artist.id === album.artistId);
      },
    },
  }),
});
```
