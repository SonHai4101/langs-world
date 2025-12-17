import Elysia from "elysia";
import prisma from "../db";
import { Language } from "../generated/prisma/enums";
import { normalizeWord } from "../utils/normalizeWord";
import { fetchEnglishDictionary } from "./dictionaryService";
import { detectLanguage } from "../utils/detectLanguge";

export const wordService = new Elysia().derive(
  { as: "scoped" },
  ({ status }) => {
    const createSavedWord = async (
      userId: string,
      rawValue: string
    ) => {
      const normalized = normalizeWord(rawValue)
      const language = detectLanguage(normalized)
      const dict = fetchEnglishDictionary(normalized, language)
      const word = await prisma.word.upsert({
        where: { text_language: { text, language } },
        create: { text, language },
        update: {},
      });

      return prisma.userWord.upsert({
        where: {
          userId_wordId: {
            userId,
            wordId: word.id,
          }
        },
        create: { userId, wordId: word.id, level: 0},
        update: {}
      })
    };

    const listSavedWord = async (userId: string) => {
      //         const { page = 1, limit = 20 } = params;
      // const skip = (page - 1) * limit;
      // const where = { userId };
      // const [userWord, total] = await Promise.all([
      //           prisma.word.findMany({
      //             where,
      //             skip,
      //             take: limit,
      //             orderBy: {
      //               createdAt: "desc",
      //             },
      //           }),
      //           prisma.userText.count({ where }),
      //         ]);
      //         const totalPages = Math.ceil(total / limit);

      // return {
      //   data: userWord,
      //   pagination: {
      //     page,
      //     limit,
      //     total,
      //     totalPages,
      //   },
      // };

      return prisma.userWord.findMany({
        where: { userId },
        include: { word: true },
      });
    };

    return {
      createSavedWord,
      listSavedWord,
    };
  }
);
