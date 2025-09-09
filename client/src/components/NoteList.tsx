import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PencilIcon, TrashIcon, PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { createTask, deleteTask, getNote, updateTask } from "../services/note"
import type { Note } from "../types/note"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { Link } from "react-router-dom"

const NoteList= () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [newTitle, setNewTitle] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState("")

  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const fetchNotes = async () => {
    const data = await getNote()
    setNotes(data)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleAddNote = async () => {
    if (!newTitle.trim()) return
    await createTask(newTitle)
    setNewTitle("")
    fetchNotes()
  }

  const handleDelete = async (id: string) => {
    await deleteTask(id)
    fetchNotes()
  }

  const startEdit = (note: Note) => {
    setEditingId(note._id)
    setEditingTitle(note.title)
  }

  const saveEdit = async (id: string) => {
    if (!editingTitle.trim()) return
    await updateTask(id, editingTitle)
    setEditingId(null)
    setEditingTitle("")
    fetchNotes()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingTitle("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-50 flex flex-col items-center p-6 rounded-4xl">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 drop-shadow-lg">
          My Notes
        </h1>

        {userInfo ? (
          <div className="flex mb-6 shadow-xl rounded-xl overflow-hidden bg-white border border-indigo-200">
            <input
              type="text"
              className="flex-1 px-4 py-2 border-none focus:ring-0 outline-none text-gray-800 placeholder-gray-400"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Write a new note..."
            />
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 flex items-center transition-all duration-300 transform hover:scale-105"
              onClick={handleAddNote}
            >
              <PlusIcon className="w-5 h-5 mr-1" />
              Add
            </button>
          </div>
        ) : (
          <p className="border-2 border-dashed rounded-xl px-4 py-3 text-center text-gray-600 mb-6 bg-indigo-50">
            Please{" "}
            <Link to="/login" className="font-bold text-indigo-600 underline">
              Login
            </Link>{" "}
            to add notes.
          </p>
        )}

        <ul className="space-y-4">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.li
                key={note._id}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <motion.span
                      className="text-gray-800 font-medium break-words"
                      layout
                    >
                      {note.title}
                    </motion.span>
                  </div>

                  {note.userId === userInfo?._id && (
                    <div className="flex items-center space-x-2">
                      {editingId !== note._id && (
                        <>
                          <button
                            onClick={() => startEdit(note)}
                            className="text-indigo-500 hover:text-indigo-600 flex items-center transition-all duration-300 transform hover:scale-110"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </button>
                          <motion.button
                            onClick={() => handleDelete(note._id)}
                            className="text-red-500 hover:text-red-600 flex items-center transition-all duration-300 transform hover:scale-110"
                            whileTap={{ scale: 0.9 }}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {editingId === note._id && (
                  <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="flex-1 border border-indigo-300 px-3 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <button
                      onClick={() => saveEdit(note._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                    >
                      <CheckIcon className="w-4 h-4 mr-1" /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                    >
                      <XMarkIcon className="w-4 h-4 mr-1" /> Cancel
                    </button>
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  )
}

export default NoteList
