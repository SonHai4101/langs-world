import prisma from "../db";
import { normalizeWord } from "../utils/normalizeWord";

const fetchEnglishDictionary = async (word: string) => {
  const res = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  // Print full response (pretty JSON) so nested objects/arrays aren't shown as [Object ...]
  console.log("data", JSON.stringify(data, null, 2));

  return {
    // API returns `meanings` (plural) and `phonetics` (plural)
    meaning: data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition,
    ipa: data?.[0]?.phonetics?.find((p:any) => typeof p.text === 'string' && p.text.length > 0)?.text,
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
