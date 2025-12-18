import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiService } from "@/services/apiService";
import { keys } from "@/constants/keys";

export const useLookupWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { word: string }) =>
      apiService.word.lookup(params.word),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.word, keys.userWord] });
    },
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
