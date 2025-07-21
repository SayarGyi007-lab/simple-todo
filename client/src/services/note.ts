import type { Note } from "../types/note";
import axios from "axios";

let API_URL=""
if(import.meta.env.VITE_MODE==="development"){
    API_URL = import.meta.env.VITE_LOCAL_API_URL
}
if(import.meta.env.VITE_MODE==="production"){
    API_URL = import.meta.env.VITE_API_URL!
}
console.log("api: ", API_URL);

axios.defaults.withCredentials=true

// export const getNote =  async (): Promise<Note[]>=>{
//     const response = await fetch(`${API_URL}/get`)
//     const data = await response.json()
//     return data.tasks
// }

export const getNote =  async (): Promise<Note[]>=>{
    const {data} = await axios.get(`${API_URL}/get`)
    return data.tasks
}

// export const createTask = async(title:string): Promise<Note> =>{
//     const response = await fetch(`${API_URL}/create`,{
//         method: "POST",
//         headers:{
//             "Content-Type" : "application/json"
//         },
//         body:JSON.stringify({title})
//     })
//     const data = await response.json()
//     return data.tasks
// }

export const createTask = async(title:string)=>{
   await axios.post(`${API_URL}/create`, {title},{withCredentials: true})
}

// export const deleteTask = async(title: string)=>{
//     await fetch(`${API_URL}/delete/${title}`,{
//         method: "DELETE"
//     })
// }
export const deleteTask = async(id: string)=>{
    await axios.delete(`${API_URL}/delete/${id}`,{withCredentials:true})
}

// export const updateTask = async(id: string, title: string)=>{
//     await fetch(`${API_URL}/update/${id}`,{
//         method: "PUT",
//         headers:{
//             "Content-Type" : "application/json"
//         },
//         body:JSON.stringify({title})
//     })
// }

export const updateTask = async(id: string, title: string)=>{
    await axios.put(`${API_URL}/update/${id}`,{title},{withCredentials:true})
}