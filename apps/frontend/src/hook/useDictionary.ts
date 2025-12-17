import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

export const useDictionary = (word: string | null) => {
  return useQuery({
    // Use a stable key and only enable the query when `word` is present
    queryKey: [keys.dictionary, word],
    queryFn: () => apiService.dictionary.lookup(word as string),
    enabled: Boolean(word),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: false,
  });
};
