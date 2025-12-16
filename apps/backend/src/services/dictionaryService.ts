import prisma from "../db";
import { normalizeWord } from "../utils/normalizeWord";

const fetchEnglishDictionary = async (word: string) => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (!res.ok) return null;
  const data = await res.json();

  return {
    meaning: data[0]?.meaning[0]?.definitions[0]?.definition,
    ipa: data[0]?.phonetics[0]?.text,
  };
};

export const dictionaryService = {
  lookup: async (
    text: string,
    language: "en" | "vi" | "jp" | "zh" | "kr" | "fr" | "de" | "es"
  ) => {
    const normalized = normalizeWord(text);

    const existing = await prisma.word.findFirst({
      where: { normalized, language },
    });

    if (existing) return existing;

    let result: any = null;

    if (language === "en") {
      result = await fetchEnglishDictionary(text);
    }

    if (!result) return null;

    return prisma.word.create({
      data: {
        text,
        normalized,
        language,
        meaning: result.meaning,
        ipa: result.ipa,
      },
    });
  },
};
