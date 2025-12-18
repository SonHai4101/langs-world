import Elysia from "elysia";
import prisma from "../db";
import { Language } from "../generated/prisma/enums";
import { normalizeWord } from "../utils/normalizeWord";
import { fetchEnglishDictionary } from "./dictionaryService";
import { detectLanguage } from "../utils/detectLanguge";

export const wordService = new Elysia().derive(
  { as: "scoped" },
  ({ status }) => {
    const listSavedWord = async (
      userId: string,
      params: {
        page: number;
        limit: number;
      }
    ) => {
      const { page = 1, limit = 20 } = params;
      const skip = (page - 1) * limit;
      const where = { userId };

      const [userWord, total] = await Promise.all([
        prisma.userWord.findMany({
          where,
          skip,
          take: limit,
          include: {
            word: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.userWord.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: userWord,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };

      // return prisma.userWord.findMany({
      //   where: { userId },
      //   include: { word: true },
      // });
    };

    return {
      listSavedWord,
    };
  }
);
