import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import api from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEndpoint } from "@/stores/useEndpoint";

type TPaginatedResponse = {
    isLoading: boolean,
    items: any[],
    meta: {
        total: number,
        currentPage: number,
        totalPages: number,
        hasPreviousPage: boolean,
        hasNextPage: boolean,
        limit: number
    },
    onPreviousPage: () => void,
    onNextPage: () => void,
    onPage: (page: number) => void,
    setLimit: (limit: number) => void
}

type TPaginatedOptions = {
    queryKey: string | string[];
    path: string;
    defaultLimit?: number;
    requiredAuth?: boolean;
}

export default function usePaginatedData({queryKey, path, defaultLimit = 10, requiredAuth = false }: TPaginatedOptions): TPaginatedResponse {
    const session = useSession()
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(defaultLimit)
    const endpoint = useEndpoint(state => state.endpoint)

    if (requiredAuth && !session.data) throw new Error('Authenticated wrapper required')


    const qs = `limit=${limit}&skip=${(currentPage - 1) * limit}`

    const fetchData = () => {
        return api.get(`${endpoint}${path}?${qs}`, {
            headers: {
                Authorization: `Bearer ${session.data?.authorization?.token}`
            }
        }).then(res => res.data.data)
    }

    const queryString = Array.isArray(queryKey) ? queryKey : [queryKey]

    const {isLoading, data} = useQuery([...queryString, { limit, page: currentPage }], fetchData, {
        keepPreviousData: true,
        staleTime: Infinity,
    })

    const totalPages = Math.ceil((data?.count || 0) / limit);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    const onPreviousPage = () => {
        if (!hasPreviousPage) return;
        setCurrentPage((prev) => prev - 1)
    }

    const onNextPage = () => {
        if (!hasNextPage) return;
        setCurrentPage((prev) => prev + 1)
    }

    const onPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page)
    }

    return {
        isLoading,
        items: data?.items ?? [],
        meta: {
            total: data?.count ?? 0,
            currentPage,
            totalPages,
            hasPreviousPage,
            hasNextPage,
            limit
        },
        onPreviousPage,
        onNextPage,
        onPage,
        setLimit
    }
}
