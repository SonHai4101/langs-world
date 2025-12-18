import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { keys } from "@/constants/keys";
import type { Pagination, UserWord, Word } from "@/constants/types";

export const useLookupWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { word: string }) =>
      apiService.word.lookup(params.word),
    onSuccess: (savedWord) => {
      queryClient.setQueryData(
        [keys.userWord, { page: 1, limit: 9999 }],
        (old: { data: UserWord[]; pagination: Pagination } | undefined) => {
          if (!old?.data) return old;
          const alreadyExists = old.data.some(
            (uw) => uw.word.normalized === savedWord.normalized
          );
          if (alreadyExists) return old;

          return {
            ...old,
            data: [
              {
                id: crypto.randomUUID(), // temp id
                level: 0,
                word: savedWord,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              ...old.data,
            ],
          };
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [keys.userWord] });
    },
  });
};

export const useListUserSaveWord = (query: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [keys.userWord],
    queryFn: () => apiService.word.listUserSaveWord(query),
  });
};

// export const useLookupWord = () => {
//     const queryClient = useQueryClient();

//     const mutation = useMutation({
//         mutationFn: (params: LookupWordParams) => apiService.word.lookup(params),
//         onSuccess: (data) => {
//             // Cache the result
//             queryClient.setQueryData([keys.word, data.text, data.language], data);
//         },
//     });

//     return {
//         word: mutation.data,
//         isLoading: mutation.isPending,
//         error: mutation.error,
//         lookupWord: mutation.mutate,
//         lookupWordAsync: mutation.mutateAsync,
//         reset: mutation.reset,
//     };
// };

// Alternative hook using useQuery for cached lookups
// export const useWord = (
//   word: string,
//   language: string,
//   enabled: boolean = false
// ) => {
//   const query = useQuery({
//     queryKey: [keys.word, word, language],
//     queryFn: () => apiService.word.lookup({ word, language }),
//     enabled: enabled && !!word && !!language,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

//   return {
//     word: query.data,
//     isLoading: query.isLoading,
//     error: query.error,
//     refetch: query.refetch,
//   };
// };
