import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '~/components/providers/axios-provider'
import { LoginResponse, SignupFormValues } from '~/types/auth'

export const useSignup = () => {
  const mutate = useMutation<LoginResponse, Error, SignupFormValues>({
    mutationKey: ['signup'],
    mutationFn: async (formData) => await axiosInstance.post('/auth/signup', formData),
  })

  return {
    signup: mutate.mutateAsync,
    isSigningUp: mutate.isPending,
    signupError: mutate.error,
    mutate,
  }
}
