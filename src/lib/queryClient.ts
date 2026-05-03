import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min: datos frescos, evita refetch innecesario
      gcTime: 10 * 60 * 1000,   // 10 min: mantiene en cache tras desuso
      refetchOnWindowFocus: false, // no refetch al cambiar de pestaña
    },
  },
})
