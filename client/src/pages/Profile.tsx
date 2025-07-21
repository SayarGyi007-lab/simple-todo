import * as z from "zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store"
import { useUpdateProfileMutation } from "../slices/userApi"
import { toast } from "react-toastify"
import { setUserInfo } from "../slices/auth"
import { updateSchmea } from "../schema/Update"

type FormInputs = z.infer<typeof updateSchmea>

const Profile = () => {

    const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    const [updateProfile,{isLoading}] = useUpdateProfileMutation()

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>({
        resolver: zodResolver(updateSchmea),
        defaultValues:{
            name: userInfo?.name,
            email: userInfo?.email,
            password:""
        }

    })

    

    const submit: SubmitHandler<FormInputs> = async (data) => {
        try {
            const res = await updateProfile(data)
            console.log(res);
            
            dispatch(setUserInfo(res.data))
            toast.success("Updated Successfully")
         
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)

        }
    }

    return (
        <main className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 mt-20">Profile</h2>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit(submit)}>
                <div>
                    <label htmlFor="name" className="block mb-1 text-sm text-gray-500"> Name</label>
                    <input type="text" className="form" {...register("name")} />
                    {errors.name && <span className='text-red-600 text-sm font-medium'>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm text-gray-500"> Email</label>
                    <input type="email" className="form" {...register("email")} />
                    {errors.email && <span className='text-red-600 text-sm font-medium'>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1 text-sm text-gray-500"> Password</label>
                    <input type="password" className="form" {...register("password")} />
                    {errors.password && <span className='text-red-600 text-sm font-medium'>{errors.password.message}</span>}
                </div>
                <button type="submit" className='text-white bg-black py-2 px-4 rounded-md' disabled={isSubmitting || isLoading}>Update Profile</button>


            </form>
        </main>
    )
}

export default Profile