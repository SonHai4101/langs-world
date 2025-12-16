import Elysia from "elysia";
import prisma from "../db";
import { Prisma } from "../generated/prisma/client";
import { detecLanguage } from "../utils/detectLanguge";

type UserTextPlainInput = {
  language: "en" | "vi" | "jp" | "zh" | "kr" | "fr" | "de" | "es";
  // title?: string | null;
  content: string;
};

export const userTextService = new Elysia().derive(
  { as: "scoped" },
  ({ status }) => {
    const createNewUserText = async (
      body: UserTextPlainInput,
      userId: string
    ) => {
      try {
        const language = detecLanguage(body.content);
        const userText = await prisma.userText.create({
          data: {
            content: body.content,
            language,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return userText;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle specific Prisma errors
          if (error.code === "P2025") {
            throw status(404, "User not found");
          }
          if (error.code === "P2002") {
            throw status(409, "Duplicate entry");
          }
        }
        // Handle unexpected errors
        console.error("Error creating user text:", error);
        throw status(500, "Failed to create user text");
      }
    };

    const getAllUserText = async (
      userId: string,
      params: {
        page: number;
        limit: number;
      }
    ) => {
      try {
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
      } catch (error) {
        // Handle unexpected errors
        console.error("Error fetching user texts:", error);
        throw status(500, "Failed to fetch user texts");
      }
    };

    return {
      createNewUserText,
      getAllUserText,
    };
  }
);
