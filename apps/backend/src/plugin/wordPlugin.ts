import Elysia, { t } from "elysia";
import { authService } from "../services/authService";
import { wordService } from "../services/wordService";
import { getUserInfo } from "../helper/getUserInfo";
import { dictionaryService } from "../services/dictionaryService";

export const wordPlugin = new Elysia({
  name: "Plugin.Word",
  prefix: "/word",
  tags: ["Word"],
})
  .use(authService)
  .use(getUserInfo)
  .use(wordService)
  .guard({ isSignIn: true })
  .get("/", async ({ listSavedWord }) => {
    return listSavedWord;
  })
  .post(
    "/",
    async ({ createSavedWord, user, body }) => {
      return createSavedWord(user.id, body.wordId);
    },
    {
      body: t.Object({
        wordId: t.String(),
      }),
    }
  )
  .get(
    `/lookup`,
    async ({ query }) => {
      return dictionaryService.lookup(query.word, query.language);
    },
    {
      query: t.Object({
        word: t.String(),
        language: t.Union([
          t.Literal("en"),
          t.Literal("vi"),
          t.Literal("jp"),
          t.Literal("zh"),
          t.Literal("kr"),
          t.Literal("fr"),
          t.Literal("de"),
          t.Literal("es"),
        ]),
      }),
    }
  );
