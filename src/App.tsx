import { useState } from "react"
import { v4 as uuid } from "uuid"
import "./App.css"

const App = () => {
  const [description, setDescription] = useState<string>("")
  const [TodoList, setTodoList] = useState<
    { id: string; description: string; status: "Done" | "Pending" }[]
  >([])

  const deleteTodoHandler = (index: number) => {
    const newList = TodoList.map((item) => ({ ...item }))
    newList.splice(index, 1)
    setTodoList(newList)
  }

  const setStatus = (status: "Done" | "Pending", index: number) => {
    const newList = TodoList.map((item) => ({ ...item }))
    newList[index].status = status
    setTodoList(newList)
  }

  const addTodoHandler = () => {
    if (!description.trim()) return
    const newList = TodoList.map((item) => ({ ...item }))
    newList.push({ description, status: "Pending", id: uuid() })
    setDescription("")
    setTodoList(newList)
  }
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-9/12">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:bg-teal"
              onClick={() => addTodoHandler()}
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {TodoList.map(({ id, description, status }, index) => (
            <div className="flex mb-4 items-center" key={id}>
              <p className="w-full text-grey-darkest">
                {description} ({status === "Pending" ? "Pending" : "Done"})
              </p>
              <button
                className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded border-green hover:bg-green"
                onClick={() => {
                  setStatus(status === "Pending" ? "Done" : "Pending", index)
                }}
              >
                {status === "Pending" ? "Mark Done" : "Mark Not Done"}
              </button>
              <button
                className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:bg-red"
                onClick={() => deleteTodoHandler(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
