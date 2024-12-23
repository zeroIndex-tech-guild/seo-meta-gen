import { ErrorResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { CreateAppResponse } from '~/types/user-app'

export const useCreateUserApp = () => {
  const mutate = useMutation<CreateAppResponse, ErrorResponse, { name: string }>({
    mutationKey: ['create-app'],
    mutationFn: async ({ name }) => {
      return axiosInstance.post('webhooks/user-apps', {
        name,
      })
    },
  })

  return {
    mutate,
    createUserApp: mutate.mutateAsync,
    isCreatingUserApp: mutate.isPending,
  }
}
