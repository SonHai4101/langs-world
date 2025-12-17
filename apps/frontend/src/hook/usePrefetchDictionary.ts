import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useQueryClient } from "@tanstack/react-query"


export const usePrefetchDictionary = () => {
    const queryClient = useQueryClient();

    return (word: string) => {
    queryClient.prefetchQuery({
      queryKey: [keys.dictionary, word.toLowerCase()],
      queryFn: () => apiService.dictionary.lookup(word),
      staleTime: 1000 * 60 * 60,
    });
  };
}