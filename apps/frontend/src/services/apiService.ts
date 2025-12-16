import type { Audio, Pagination, Song, Text, Word } from "@/constants/types";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";

export const apiService = {
  word: {
    lookup: (body: { word: string; language: string }): Promise<Word> =>
      axiosInstance
        .get("/word/lookup", { params: body })
        .then((res) => res.data),
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
      return axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
    },
  },
  song: {
    getAllSongs: (): Promise<{
      data: Song[];
      pagination: Pagination;
    }> => axiosInstance.get("/song").then((res) => res.data),
    getSongById: (id: string): Promise<Song> =>
      axiosInstance.get(`/song/${id}`).then((res) => res.data),
    createSong: (body: {
      title: string;
      artist?: string | null;
      album?: string | null;
      albumCover?: string | null;
      duration?: number | null;
      audioId: string;
    }) => axiosInstance.post("/song", body),
    deleteSongById: (id: string) => axiosInstance.delete(`/song/${id}`),
  },
  audio: {
    getAudioByKey: (key: string): Promise<Audio> =>
      axiosInstance.get(`/audio/key/${key}`).then((res) => res.data),
    deleteAudio: (id: string) => axiosInstance.delete(`/audio/delete/${id}`),
  },
};
