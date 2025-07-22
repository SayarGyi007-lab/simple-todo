import React, { useEffect, useState } from 'react'
import { createTask, deleteTask, getNote, updateTask } from '../services/note'
import type { Note } from '../types/note'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { Link } from 'react-router-dom'

const NoteList = () => {
  const [notes, setNote] = useState<Note[]>([])
  const [msg, setMsg] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editModeId, setEditModeId] = useState("")

  const userInfo = useSelector((state:RootState)=>state.auth.userInfo)

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
      console.error("Error creating/updating task:", error);

      throw new Error("Failed to add note")
    }
  }

  const deleteNote = async(id: string)=>{
    try {
      await deleteTask(id)
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
            {
              note.userId === userInfo?._id && 
              <>
                <button type='button' onClick={()=>deleteNote(note._id)} className='text-red-600 underline font-medium'>Delete</button>
                <button type='button' onClick={()=>modeChangeHandler(note.title,note._id)} className='underline font-medium'>Update</button>
              </>
            }
          </li>
        )}
      </ul>
      <>
        {userInfo? (
          <form onSubmit={taskChangeHandler} >
          <input type='text' value={msg} onChange={(e)=>setMsg(e.target.value)} className='border p-2 text-sm mr-2'/>
          <button className='text-white bg-black py-2 px-4 rounded-md text-sm '>{editMode? "Update" : "Create"}</button>
        </form>
        ): (
          <p className='border-2 px-4 py-2 w-fit'>
           Please <Link to={"/login"} className='font-bold underline'>Login</Link>
          </p>
        )}
      </>
    </div>
  )
}

export default NoteList