import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { LoginSchema } from '../schema/LoginSchema'
import * as z from 'zod'
import { useLoginMutation } from '../slices/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../slices/auth'
import {  toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import type { RootState } from '../store'

type FormInputs = z.infer<typeof LoginSchema>


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const {register, handleSubmit, formState:{errors,isSubmitting},reset} = useForm<FormInputs>({
        resolver: zodResolver(LoginSchema)
        
    })

    const [login, {isLoading}] = useLoginMutation()
    const userInfo = useSelector((state: RootState)=>state.auth.userInfo)

    const submint: SubmitHandler<FormInputs>=async (data)=>{
        try {
            const res = await login(data).unwrap()
            dispatch(setUserInfo(res))
            reset()
            navigate("/")
        } catch (err: any) {
            toast.error(err?.data?.message||err.message);
            
        }
    }

    useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    },[navigate,userInfo])

  return (

    <div className='max-w-lg mx-auto'>
        <h2 className='text-3xl font-bold mb-2 mt-20'>Login</h2>
    <form className='flex flex-col space-y-2' onSubmit={handleSubmit(submint)}>
        <div>
            <label  htmlFor="email" className='block mb-1 text-sm'>Email</label>
            <input type="email" className='form' {...register("email")} />
            {errors.email && <span className='text-red-600 text-sm font-medium'>{errors.email.message}</span>} 
        </div>
        <div>
            <label htmlFor="password" className='block mb-1 text-sm'>Password</label>
            <input type="password" className='form' {...register("password")} />
            {errors.password && <span className='text-red-600 text-sm font-medium'>{errors.password.message}</span>}
        </div>
        <button type="submit" className='text-white bg-black py-2 px-4 rounded-md' disabled={isSubmitting || isLoading}>Login</button>
    </form>
    </div>
  )
}

export default Login