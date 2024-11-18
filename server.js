import express from "express"
// var createHandler  = require("graphql-http/lib/use/express")
import { ruruHTML } from "ruru/server"
import dotenv from 'dotenv'


import { createSchema, createYoga } from 'graphql-yoga'
import { schema } from "./src/graphql/index.js"
import { setUpDatabase } from "./src/db/dbConnection.js"

dotenv.config()
const yoga = createYoga({
  schema,
})

const app = express()
setUpDatabase()
// Create and use the GraphQL handler.
app.all("/graphql", yoga )
// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})


app.listen(4000);

console.log(`
Api Running a GraphQL API server at http://localhost:4000/graphql`)


