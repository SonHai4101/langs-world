import type { Pagination, Text, Word } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

export const apiService = {
  word: {
    lookup: (word: string): Promise<Word> =>
      axiosInstance.get(`/word/lookup/${word}`).then((res) => res.data),
  },
  text: {
    postNewText: (body: { content: string }) =>
      axiosInstance.post("/user-text/", body),
    getText: (): Promise<{
      data: Text[];
      pagination: Pagination;
    }> => axiosInstance.get(`/user-text/`).then((res) => res.data),
  },
  dictionary: {
    lookup(word: string) {
      return axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => res.data);
    },
    // lookupFromBe: ():Promise<> => axiosInstance.get()
  },
};
