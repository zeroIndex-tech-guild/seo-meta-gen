import { ErrorResponse } from '#sharedTypes/server-response'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LoginFormValues, LoginResponse } from '~/types/auth'

export const useLogin = () => {
  const mutate = useMutation<LoginResponse, ErrorResponse, LoginFormValues>({
    mutationKey: ['login'],
    mutationFn: async (formData) => await axiosInstance.post('/auth/login', formData),
  })

  return {
    login: mutate.mutateAsync,
    isLoggingIn: mutate.isPending,
    loginError: mutate.error,
    mutate,
  }
}
