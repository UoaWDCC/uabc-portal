import { dbsessions } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useSessions = () => {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery(['sessions'], async (): Promise<dbsessions[]> => {
        const response = await fetch(`/api/session`)

        return response.json()
    })

    // // Mutations
    // const mutation = useMutation({
    //     mutationFn: () => "somethin",
    //     onSuccess: () => {
    //       // Invalidate and refetch
    //       queryClient.invalidateQueries({ queryKey: ['todos'] })
    //     },
    //   })

    return {query}
}

