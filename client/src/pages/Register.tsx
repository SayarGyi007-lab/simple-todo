import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as z from "zod"
import { registerSchmea } from '../schema/RegisterSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '../slices/userApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type FormInputs = z.infer<typeof registerSchmea>

const Register = () => {

    const {register, handleSubmit, formState:{errors,isSubmitting},reset} = useForm<FormInputs>({
        resolver: zodResolver(registerSchmea)
    })

    const [registerMutation,{isLoading}] = useRegisterMutation()
    const navigate = useNavigate()

    const submit: SubmitHandler<FormInputs> = async (data)=>{
        try {
            await registerMutation(data)
            reset()
            toast.success("Registeration successful")
            navigate('/login')
        } catch (err:any) {
            toast.error(err?.data?.message || err.error)
        }
        
    }


  return (
    <div className='max-w-lg mx-auto' >
        <h2 className='text-3xl font-bold mb-2 mt-20'>Register</h2>
         <form className='flex flex-col space-y-2' onSubmit={handleSubmit(submit)}>
           <div>
           <label htmlFor="name" className='block mb-1 text-sm text-gray-500'>
                Name
            </label>
                <input type='text' className='form' {...register("name")}/>
                {errors.name && <span className='text-red-600 text-sm font-medium'>{errors.name.message}</span>}
           </div>
            <div>
            <label htmlFor="email" className='block mb-1 text-sm text-gray-500'>
                Email
            </label>
                <input type='email' className='form' {...register("email")}/>
                {errors.email && <span className='text-red-600 text-sm font-medium'>{errors.email.message}</span>}
            </div>
           <div>
           <label htmlFor="password" className='block mb-1 text-sm text-gray-500'>
                Password
            </label>
                <input type='password' className='form' {...register("password")}/>
                {errors.password && <span className='text-red-600 text-sm font-medium'>{errors.password.message}</span>}
           </div>
           <button type="submit" className='text-white bg-black py-2 px-4 rounded-md' disabled={isSubmitting || isLoading}>Register</button>
        </form>
    </div>
  )
}

export default Register