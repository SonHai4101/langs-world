import { keys } from "@/constants/keys";
import { apiService } from "@/services/apiService";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const usePostText = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: {
            language: string,
            title?: string,
            content: string
        }) => apiService.text.postNewText(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [keys.text]})
        }
    })
}