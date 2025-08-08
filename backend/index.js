import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { db } from "./src/db.js";
import { typeDefs } from "./src/schema/schema.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Query } from "./src/resolvers/Query.js";
import { Mutation } from "./src/resolvers/Mutation.js";
import { User } from "./src/resolvers/User.js";
import { Course } from "./src/resolvers/Course.js";
import { Lesson } from "./src/resolvers/Lesson.js";
import { Enrollment } from "./src/resolvers/Enrollment.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    User,
    Course,
    Lesson,
    Enrollment,
  },
  context: () => {
    db;
  },
});
await server.start();

app.use((req, res, next) => {
  if (!req.body && process.env.NODE_ENG !== "production") {
    req.body = {};
  }
  next();
});
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authHeaders = (await req.headers.authorization) || "";
      const token = authHeaders.startsWith("Bearer ")
        ? authHeaders.split(" ")[1]
        : authHeaders;
      let user = null;

      if (token) {
        try {
          user = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
          console.log("JWT Error : ", error.message);
        }
      }
      return { user, db };
    },
  })
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
});
