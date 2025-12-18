import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { authPlugin } from "./plugin/authPlugin";
import { userTextPlugin } from "./plugin/userTextPlugin";
import { wordPlugin } from "./plugin/wordPlugin";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      provider: "swagger-ui",
      documentation: {
        info: {
          title: "Langs World",
          description: "The Beautiful of Languages",
          version: "1.0",
          contact: {
            name: "Me",
            email: "mshai040101@gmail.com",
          },
        },
        tags: [
          {
            name: "Health",
            description: "Health Checkpoint",
          },
          {
            name: "Auth",
            description: "Authentication endpoints",
          },
          {
            name: "UserText",
            description: "User's Text endpoints",
          },
        ],
        components: {
          securitySchemes: {
            basicAuth: {
              type: "http",
              scheme: "Bearer",
              description: "Bearer token authentication",
            },
          },
        },
        security: [
          {
            basicAuth: [],
          },
        ],
      },
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  )
  .get("/health", () => "OK, working gud!", {
    tags: ["Health"],
  })
  .group("/api", (app) =>
    app.use(authPlugin).use(userTextPlugin).use(wordPlugin)
  )
  .listen(8888);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
