import { dbsessions } from "@prisma/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useGetSessions = () => {

    const query = useQuery(['sessions'], async (): Promise<dbsessions[]> => {
        const response = await fetch(`/api/session`)

        return response.json()
    })

    return query
}

