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
