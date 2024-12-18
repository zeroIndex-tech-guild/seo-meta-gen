import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { GetCurrentWebhookUrlResponse } from '~/types/webhook'
import { ErrorResponse } from '#sharedTypes/server-response'

export const useGetCurrentWebhook = () => {
  const { data, isLoading } = useQuery<GetCurrentWebhookUrlResponse, ErrorResponse>({
    queryKey: ['currentWebhook'],
    queryFn: async () =>
      await axiosInstance({
        url: '/webhook/urls',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
  })
  return {
    currentWebhookUrl: data,
    isFetchingCurrentWebhook: isLoading,
  }
}
