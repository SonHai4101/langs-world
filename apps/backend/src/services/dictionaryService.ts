import prisma from "../db";
import { detectLanguage } from "../utils/detectLanguge";
import { normalizeWord } from "../utils/normalizeWord";

export const fetchEnglishDictionary = async (word: string) => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  // Print full response (pretty JSON) so nested objects/arrays aren't shown as [Object ...]
  // console.log("data", JSON.stringify(data, null, 2));

  return {
    // API returns `meanings` (plural) and `phonetics` (plural)
    meaning: data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition,
    ipa: data?.[0]?.phonetics?.find(
      (p: any) => typeof p.text === "string" && p.text.length > 0
    )?.text,
    sound: data?.[0]?.phonetics?.find(
      (p: any) => typeof p.audio === "string" && p.audio.length > 0
    )?.audio,
  };
};

export const dictionaryService = {
  lookup: async (text: string, userId: string) => {
    const normalized = normalizeWord(text);
    if (!normalized) return null;

    const language = detectLanguage(normalized);

    return prisma.$transaction(async (tx) => {
      let word = await tx.word.findUnique({
        where: {
          normalized_language: {
            normalized,
            language,
          },
        },
      });
      if (!word) {
        let result: { meaning?: string; ipa?: string; sound?: string } | null =
          null;
        if (language === "en") {
          result = await fetchEnglishDictionary(normalized);
        }

        if (!result) return null;

        word = await tx.word.create({
          data: {
            text: normalized,
            normalized,
            language,
            meaning: result.meaning,
            ipa: result.ipa,
            sound: result.sound,
          },
        });
      }
      await tx.userWord.upsert({
        where: {
          userId_wordId: {
            userId,
            wordId: word.id,
          },
        },
        create: {
          userId,
          wordId: word.id,
          level: 0,
        },
        update: {},
      });

      return word;
    });
  },
};
