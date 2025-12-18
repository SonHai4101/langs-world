import Elysia, { t } from "elysia";
import { authService } from "../services/authService";
import { wordService } from "../services/wordService";
import { getUserInfo } from "../helper/getUserInfo";
import { dictionaryService } from "../services/dictionaryService";
import { detectLanguage } from "../utils/detectLanguge";

export const wordPlugin = new Elysia({
  name: "Plugin.Word",
  prefix: "/word",
  tags: ["Word"],
})
  .use(authService)
  .use(getUserInfo)
  .use(wordService)
  .guard({ isSignIn: true })
  .get(
    "/",
    async ({ listSavedWord, user, query }) => {
      const userId = user.id;
      return listSavedWord(userId, {
        page: query.page ?? 1,
        limit: query.limit ?? 20,
      });
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ default: 1 })),
        limit: t.Optional(t.Numeric({ default: 20 })),
      }),
    }
  )
  .post(
    "/",
    async ({ createSavedWord, user, body }) => {
      const language = detectLanguage(body.text);
      return createSavedWord(user.id, body.text, language);
    },
    {
      body: t.Object({
        text: t.String(),
      }),
    }
  )
  .get(
    `/lookup/:word`,
    async ({ params, user }) => {
      const userId = user.id;
      return dictionaryService.lookup(params.word, userId);
    },
    {
      params: t.Object({
        word: t.String(),
      }),
    }
  );
