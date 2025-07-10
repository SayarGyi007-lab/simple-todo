import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, getNote, updateTask } from '../services/note'
import type { Note } from '../types/note'

const NoteList = () => {
  const [notes, setNote] = useState<Note[]>([])
  const [msg, setMsg] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editModeId, setEditModeId] = useState("")

  const makeRefresh = ()=>{
    setRefresh(!refresh)
  }

  useEffect(()=>{
    const fetchData = async()=>{
      const data = await getNote()
      setNote(data)
    }
    fetchData()
  },[refresh])

  const taskChangeHandler = async(e: React.FormEvent)=>{
    e.preventDefault()
    if(msg.trim().length===0){
      return
    }
    try {

      if(editMode){
        await updateTask(editModeId, msg)
        setEditMode(false)
      }
      else{
        await createTask(msg)
      }
      setMsg("")
      makeRefresh()
    } catch (error) {
      throw new Error("Failed to add notd")
    }
  }

  const deleteNote = async(title: string)=>{
    try {
      await deleteTask(title)
      makeRefresh()
    } catch (error) {
      throw new Error("Failed to delete notd")
    }
  }

  const modeChangeHandler= (title: string, id: string)=>{
    setEditMode(true)
    setMsg(title)
    setEditModeId(id)
  }

  return (
    <div>
      <h2 className='text-xl font-bold py-4 mb-6'>Shares</h2>
      <ul>
        {notes.map((note,index)=>
          <li key={index} className='flex items-center gap-2 mb-2'>
            <p className=' font-semibold'>{note.title}</p>
            <button type='button' onClick={()=>deleteNote(note.title)} className='text-red-600 underline font-medium'>Delete</button>
            <button type='button' onClick={()=>modeChangeHandler(note.title,note._id)} className='underline font-medium'>Update</button>
          </li>
        )}
      </ul>
      <form onSubmit={taskChangeHandler} >
        <input type='text' value={msg} onChange={(e)=>setMsg(e.target.value)} className='border p-2 text-sm mr-2'/>
        <button className='text-white bg-black py-2 px-4 rounded-md text-sm '>{editMode? "Update" : "Create"}</button>
      </form>
    </div>
  )
}

export default NoteList