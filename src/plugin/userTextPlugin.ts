import Elysia, { t } from "elysia";
import { authService } from "../services/authService";
import { userTextService } from "../services/userTextService";
import { UserTextPlainInputCreate } from "../../generated/prismabox/UserText";

export const userTextPlugin = new Elysia({
  name: "Plugin.UserText",
  prefix: "/user-text",
  tags: ["UserText"],
})
  .use(authService)
  .use(userTextService)
  .guard({ isSignIn: true })
  .get(
    "/",
    async ({ query, getAllUserText, bearer, accessToken, status }) => {
      if (!bearer) throw status(401, "Unauthorized");

      const payload = await accessToken.verify(bearer);
      if (!payload) throw status(401, "Invalid or expired token");

      const userId = payload.sub as string;

      return getAllUserText(userId, {
        page: query.page ?? 1,
        limit: query.limit ?? 20,
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ default: 1, minimum: 1 })),
        limit: t.Optional(t.Numeric({ default: 20, minimum: 1, maximum: 100 })),
      }),
    }
  )
  .post(
    "/",
    async ({ body, createNewUserText, bearer, accessToken, status }) => {
      // Extract user ID from JWT token
      if (!bearer) throw status(401, "Unauthorized");

      const payload = await accessToken.verify(bearer);
      if (!payload) throw status(401, "Invalid or expired token");

      const userId = payload.sub as string;

      return createNewUserText(body, userId);
    },
    {
      body: UserTextPlainInputCreate,
    }
  );
