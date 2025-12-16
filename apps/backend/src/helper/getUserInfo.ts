import Elysia from "elysia";
import db from "../db";
import { authService } from "../services/authService";

export const getUserInfo = new Elysia({ name: "Helper.getUserInfo" })
  .use(authService)
  .guard({
    isSignIn: true,
  })
  .resolve({ as: "scoped" }, async ({ accessToken, bearer, status }) => {
    const getUser = async () => {
      if (!bearer) {
        throw status(401, {
          success: false,
          message: "Authorization is missing",
        });
      }
      const payload = await accessToken.verify(bearer);
      if (!payload) {
        throw status(401, {
          success: false,
          message: "Invalid or expired token",
        });
      }
    //   const userId = payload.sub as string 
      const user = await db.user.findUnique({
        where: {
          id: (payload.sub),
        },
      });
      if (!user) {
        throw status(404, {
          success: false,
          message: "User not found",
        });
      }
      return user;
    };
    const user = await getUser();
    return { user };
  });
