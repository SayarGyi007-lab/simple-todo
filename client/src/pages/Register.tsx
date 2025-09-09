import { useForm, type SubmitHandler } from 'react-hook-form'
import * as z from 'zod'
import { registerSchmea } from '../schema/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '../slices/userApi'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormInputs = z.infer<typeof registerSchmea>

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(registerSchmea),
  })

  const [registerMutation, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await registerMutation(data).unwrap()
      reset()
      toast.success('Registration successful')
      navigate('/login')
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Register
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Create your account to get started.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(submit)}>
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register('name')}
            />
            {errors.name && (
              <span className="text-red-600 text-sm font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-red-600 text-sm font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register('password')}
            />
            {errors.password && (
              <span className="text-red-600 text-sm font-medium">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4 rounded-lg shadow-md transition"
          >
            {isSubmitting || isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
