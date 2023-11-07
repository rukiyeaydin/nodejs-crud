import React, { useEffect, useState } from "react";
import "./app.css";
import List from "./components/List";
import axios from "axios";
import {baseURL} from './utils/constants'

function App() {
  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState([])
  const [updateUI, setUpdateUI] = useState(false)
  const [updateId, setUpdateId] = useState(null)

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data)
      setTasks(res.data)
    })
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, {task: input})
    .then((res) => {
      console.log(res.data)
      setInput("")
      setUpdateUI((prevState) => !prevState)
    })
  }

  const updateMode = (id, text) => {
    console.log(text)
    setInput(text)
    setUpdateId(id)
  }

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInput("");
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  }

  return (
    <main className="app">
      <h1 className="title">CRUD OPERATIONS</h1>
      <div className="input_holder">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update task" : "Add task"}
        </button>
      </div>
      <ul className="listul">
        {tasks.map(task => 
          <List 
            key={task._id} 
            id={task._id} 
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        )}
      </ul>
    </main>
  );
}

export default App;
