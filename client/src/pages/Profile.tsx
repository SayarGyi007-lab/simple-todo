import * as z from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { useUpdateProfileMutation } from "../slices/userApi"
import { toast } from "react-toastify"
import { setUserInfo } from "../slices/auth"
import { updateSchmea } from "../schema/Update"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

type FormInputs = z.infer<typeof updateSchmea>

const Profile = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(updateSchmea),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      password: "",
    },
  })

  const submit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await updateProfile(data).unwrap()
      dispatch(setUserInfo(res))
      toast.success("Profile updated successfully ✨")
    } catch (err: any) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Profile
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Update your account details below.
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
              {...register("name")}
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
              {...register("email")}
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
            {isSubmitting || isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
