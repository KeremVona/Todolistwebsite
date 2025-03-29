import { useState, useEffect } from 'react'
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
      setId(prevId => prevId + 1);
      const todoPackage = {
        id: Date.now(), text: inputValue, color: "bg-red-50"
      };
      const newTodo = [...todo, todoPackage];
      setTodo(newTodo);
      setInputValue("");
    }

    const checkButton = (id) => {
      setTodo(
        todo.map((todo) => 
          todo.id === id
            ? {
                ...todo,
                color: todo.color === "bg-red-50" ? "bg-green-100" : "bg-red-50"
            }
            : todo
        )
      );
    };

    const deleteButton = (id) => {
      const updatedTodo = todo.filter((todo) => todo.id !== id);
      setTodo(updatedTodo);
      localStorage.setItem("todo", JSON.stringify(updatedTodo));
    }

    const clearAll = () => {
      setTodo([]);
      localStorage.removeItem("todo");
    }

  return (
    <>
      <h1 className=''>To-Do List Website</h1>
      <div className='flex flex-row bg-red-100 p-15 mb-2'>
        <input type="text" id="input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='basis-128 bg-red-50 mr-100 ml-100 h-12 pl-2' placeholder='Add tasks' />
        <button onClick={addButton} className='basis-64 bg-red-50 mr-2'>Add</button>
        <button onClick={clearAll} className='basis-64 bg-red-50'>Clear All</button>
      </div>
      <div id="to-do" className='flex flex-col bg-red-200 p-15'>
        {todo.map((todo, index) => (
          <div key={todo.id} className='flex flex-row'>
            <p className={`basis-128 ${todo.color} mr-100 ml-100 h-12 pl-2 mb-4`}>{todo.text}</p>
            <button onClick={() => checkButton(todo.id)} className='basis-64 bg-red-50 mb-4 mr-2'>Check</button>
            <button onClick={() => deleteButton(todo.id)} className='basis-64 bg-red-50 mb-4'>Delete</button>
          </div>
          ))}
      </div>
    </>
  )
}

export default App
