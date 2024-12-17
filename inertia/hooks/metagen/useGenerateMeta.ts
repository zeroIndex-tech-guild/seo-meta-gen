import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { GenerateMetaResponse } from '~/types/metagen'

export const useGenerateMeta = () => {
  const mutate = useMutation<GenerateMetaResponse, Error, string>({
    mutationKey: ['generateMeta'],
    mutationFn: async (content: string) => {
      return axiosInstance({
        url: '/metagen',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          content,
        },
      })
    },
  })

  return {
    mutate,
    isGeneratingMeta: mutate.isPending,
    generateMeta: mutate.mutateAsync,
  }
}
