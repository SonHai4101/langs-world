import Elysia from "elysia";
import prisma from "../db";

export const wordService = new Elysia().derive(
  { as: "scoped" },
  ({ status }) => {
    const createSavedWord = async (userId: string, wordId: string) => {
      return prisma.userWord.upsert({
        where: { userId_wordId: { userId, wordId } },
        create: { userId, wordId, level: 0 },
        update: {},
      });
    };

    const listSavedWord = async (userId: string) => {
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
