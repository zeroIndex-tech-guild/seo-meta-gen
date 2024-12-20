import { useMutation } from '@tanstack/react-query'
import { GenerateSecretKeyResponse } from '~/types/webhook'
import { ErrorResponse } from '#sharedTypes/server-response'
import { axiosInstance } from '~/components/providers/axios-provider'

export const useGenerateSecretKey = () => {
  const mutate = useMutation<GenerateSecretKeyResponse, ErrorResponse, null>({
    mutationKey: ['generateSecretKey'],
    mutationFn: async (fodder: null) => await axiosInstance.post('/webhook/secrets'),
  })

  return {
    mutate,
    isGeneratingSecretKey: mutate.isPending,
    generateSecretKey: mutate.mutateAsync,
  }
}
