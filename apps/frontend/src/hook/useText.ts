import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePostText = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => apiService.text.postNewText({ content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.text] });
    },
  });
};

export const useGetText = () => {
  return useQuery({
    queryKey: [keys.text],
    queryFn: () => apiService.text.getText(),
  });
};
