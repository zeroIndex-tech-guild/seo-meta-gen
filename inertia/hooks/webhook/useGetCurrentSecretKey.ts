import { ErrorResponse } from '#sharedTypes/server-response'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { GetCurrentSecretKeyResponse } from '~/types/webhook'

export const useGetCurrentSecretKey = () => {
  const { data, isLoading } = useQuery<GetCurrentSecretKeyResponse, ErrorResponse>({
    queryKey: ['currentSecretKey'],
    queryFn: async () =>
      await axiosInstance({
        url: '/webhook/secrets',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
  })

  return {
    currentSecretKey: data,
    isFetchingCurrentSecretKey: isLoading,
  }
}
