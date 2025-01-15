import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { AddWebhookUrlResponse } from '~/types/webhook'

export const useAddWebhookUrl = () => {
  const mutate = useMutation<AddWebhookUrlResponse, Error, { url: string; appId: string }>({
    mutationKey: ['addWebhookUrl'],
    mutationFn: async ({ appId, url }) => {
      return axiosInstance({
        url: '/webhooks/user-apps/' + appId + '/webhook-urls',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          url,
        },
      })
    },
  })

  return {
    mutate,
    isAddingWebhookUrl: mutate.isPending,
    addWebhookUrl: mutate.mutateAsync,
  }
}
