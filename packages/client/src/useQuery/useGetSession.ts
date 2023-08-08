import { dbsessions } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetSession = (id: string) => {

    const query = useQuery(['sessions'], async (): Promise<dbsessions> => {
        const response = await fetch(`/api/session${id}`)

        return response.json()
    })

    return query;
}

