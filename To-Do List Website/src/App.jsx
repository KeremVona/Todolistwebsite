import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // TODO
  /*
  ✅ Basic Features
    Add tasks

    Mark tasks as completed

    Delete tasks

    Store tasks in local storage (so they persist after refresh)
  */

    const [todo, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [color, setColor] = useState("bg-red-50");
    const [id, setId] = useState(1);

    useEffect(() => {
      const savedTodo = JSON.parse(localStorage.getItem("todo"));
      if (savedTodo) {
        setTodo(savedTodo);
      }
    }, []);

    useEffect(() => {
      if (todo.length > 0) {
        localStorage.setItem("todo", JSON.stringify(todo));
      }
      console.log("Saved to localStorage:", localStorage.getItem("todo"));
    }, [todo]);

    const addButton = () => {
      if (inputValue == "") {
        alert("Enter something!");
        return;
      }
      setId(id + 1);
      const todoPackage = {
        id: id, text: inputValue, color: bg-red-50
      };
      const newTodo = [...todo, todoPackage];
      setTodo(newTodo);
      setInputValue("");
    }

    const checkButton = () => {
      setColor("bg-green-50");
    }

  return (
    <>
      <h1 className=''>To-Do List Website</h1>
      <div className='flex flex-row bg-red-100 p-15 mb-2'>
        <input type="text" id="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='basis-128 bg-red-50 mr-100 ml-100 h-12 pl-2' placeholder='Add tasks' />
        <button onClick={addButton} className='basis-64 bg-red-50'>Add</button>
      </div>
      <div id="to-do" className='flex flex-col bg-red-200 p-15'>
        {todo.map((todo, index) => (
          <div key={index} className='flex flex-row'>
            <p className={`basis-128 ${color} mr-100 ml-100 h-12 pl-2 mb-4`}>{todo}</p>
            <button onClick={checkButton} className='basis-64 bg-red-50 mb-4 mr-2'>Check</button>
            <button className='basis-64 bg-red-50 mb-4'>Delete</button>
          </div>
          ))}
      </div>
    </>
  )
}

export default App
