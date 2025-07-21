import { apiSlice } from "./api";

interface loginInputs{
    email: string,
    password: string
}

interface registerInputs extends loginInputs{
    name: string
}

interface updateInputs{
    email?: string,
    name?: string,
    password?: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data: loginInputs)=>({
                url: "login",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        logout: builder.mutation({
            query:()=>({
                url: "logout",
                method: "DELETE",
                credentials: "include"
            })
        }),
        register: builder.mutation({
            query:(data: registerInputs)=>({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        updateProfile: builder.mutation({
            query:(data:updateInputs)=>({
                url:"profile",
                method:"PUT",
                body:data,
                credentials:"include"
            })
        })
    }),
    
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation} = userApiSlice