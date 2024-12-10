import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Head, Link, router } from '@inertiajs/react'
import { useSignup } from '~/hooks/auth/useSignup'

export default function SignupPage(props) {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  console.log(props)

  const [error, setError] = useState('')

  const { signup, isSigningUp } = useSignup()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { password, confirmPassword } = formState

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    signup(formState, {
      onSuccess: (response) => {
        toast.success(response.message)
        router.get('/login')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <>
      <div className="h-screen w-screen  relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md relative z-30">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

            <div className="mb-4">
              <Label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                value={formState.fullName}
                onChange={handleChange}
                className="shadow-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="shadow-sm"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                className="shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleChange}
                className="shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                <AlertCircle className="mr-2" size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button
                disabled={isSigningUp}
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </Button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
