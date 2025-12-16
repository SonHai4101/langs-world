import { franc } from "franc";
import { Language } from "../generated/prisma/enums";
// import { Language}

export const detectLanguage = (text: string): Language => {
  const lang = franc(text, { minLength: 10 });

  const map: Record<string, Language> = {
    eng: Language.en,
    vie: Language.vi,
    jpn: Language.jp,
    cmn: Language.zh,
    kor: Language.kr,
    fra: Language.fr,
    deu: Language.de,
    spa: Language.es,
  };

  if (lang === "und") return Language.en; // fallback

  return map[lang] ?? Language.en;
};
