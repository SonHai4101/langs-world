import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";

export const useDictionary = (word: string | null) => {
  return useQuery({
    queryKey: [keys.dicitonary, word],
    queryFn: () => apiService.dictionary.lookup(word!),
    enabled: !word,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
};
