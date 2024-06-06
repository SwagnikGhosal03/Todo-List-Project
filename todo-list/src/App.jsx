import { useState,useEffect } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true)
  const togglevent=(e)=>{
      setshowfinished(!showfinished)
  }
  useEffect(() => {
  let todostring=localStorage.getItem("todos")
  if (todostring) {
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
  }, []);
  const SavetoLS =() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  const HandleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    SavetoLS()
  };
  const HandleDelete = (e,id) => {
    let newtodos=todos.filter(item=>{
     return item.id!=id
    })
    settodos(newtodos)
    SavetoLS()
  };
  const HandleEdit = (e,id) => {
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!=id
     })
     settodos(newtodos)
     SavetoLS()
  };
  
  const HandleChange = (e) => {
    settodo(e.target.value);
  };
  const HandleCheckbox=(e) => {
    let id=e.target.name
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
SavetoLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto w-9/12 my-5 bg-violet-200 rounded-xl p-3 min-h-[80vh]">
        <div className="addtodo flex flex-col items-center my-2">
          <h1 className="text-center font-bold text-4xl my-2">Your Todo Manager</h1>
          <h2 className="text-lg font-bold my-2">Add a Todo</h2>
          <input
            type="text"
            className="w-11/12"
            onChange={HandleChange}
            value={todo}
          />
          <button
            className="bg-violet-700 hover:bg-violet-900 text-white rounded-md p-1 px-2 mx-5 cursor-pointer w-1/12 mt-3"
            onClick={HandleAdd} 
          >
            Add
          </button>
        </div>
        <input type="checkbox" name="" id="" checked={showfinished} onChange={togglevent}/>  Show Finished
        <h2 className="text-lg font-bold text-center">Your Todos</h2>
        <div className="todos">

          {todos.length===0 && <div className="text-center">No Todos to display</div>}
          {todos.map((item) => {
            return(showfinished || !item.isCompleted) && (
              <div className="todo flex w-full my-3 justify-between" key={item.id}>
                <input type="checkbox" onChange={HandleCheckbox} checked={item.isCompleted} name={item.id} id=""/>
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                <div className="buttons flex gap-3">
                  <button
                    className="bg-violet-700 hover:bg-violet-900 text-white rounded-md p-1 px-2 mx-2 cursor-pointer"
                    onClick={(e)=>{HandleEdit(e,item.id)}}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-violet-700 hover:bg-violet-900 text-white rounded-md p-1 px-2 mx-2 cursor-pointer"
                    onClick={(e)=>{HandleDelete(e,item.id)}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
