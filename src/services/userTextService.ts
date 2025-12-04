import Elysia from "elysia";
import prisma from "../db";
import { Prisma } from "../generated/prisma/client";

type UserTextPlainInput = {
  language: "en" | "vi" | "jp" | "zh" | "kr" | "fr" | "de" | "es";
  title?: string | null;
  content: string;
};

export const userTextService = new Elysia().derive(
  { as: "scoped" },
  ({ status }) => {
    const createNewUserText = async (
      body: UserTextPlainInput,
      userId: string
    ) => {
      const userText = await prisma.userText.create({
        data: {
          ...body,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      return userText;
    };

    const getAllUserText = async (
      userId: string,
      params: {
        page: number;
        limit: number;
      }
    ) => {
      const { page = 1, limit = 20 } = params;
      const skip = (page - 1) * limit;

      const where = { userId };

      const [userTexts, total] = await Promise.all([
        prisma.userText.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.userText.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: userTexts,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    };

    return {
      createNewUserText,
      getAllUserText,
    };
  }
);
