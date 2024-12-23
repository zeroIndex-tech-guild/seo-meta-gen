import { useMutation } from '@tanstack/react-query'
import { GenerateSecretKeyResponse } from '~/types/webhook'
import { ErrorResponse } from '#sharedTypes/server-response'
import { axiosInstance } from '~/components/providers/axios-provider'

export const useGenerateSecretKey = () => {
  const mutate = useMutation<GenerateSecretKeyResponse, ErrorResponse, { appId: string }>({
    mutationKey: ['generateSecretKey'],
    mutationFn: async ({ appId }) =>
      await axiosInstance.post(`/webhooks/user-apps/${appId}/secrets`),
  })

  return {
    mutate,
    isGeneratingSecretKey: mutate.isPending,
    generateSecretKey: mutate.mutateAsync,
  }
}
