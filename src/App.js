import { useEffect, useState } from "react";
import TodoComp from "./components/todoComp";
import { addToDo, getAllToDo, updateTodo, deleteTodo} from "./utils/handleAPI";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoID, setTodoID] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setTodoID(_id);
    setText(text);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <div className="top">
          <input 
          type="text" 
          placeholder="Add TODOs"
          value={text}
          onChange={(e) => setText(e.target.value)} />
          <div 
          className="add" 
          onClick={isUpdating ? 
            ()=> updateTodo(todoID, text, setText, setToDo, setIsUpdating) 
          : () => addToDo(text, setText, setToDo)}>
            {isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {toDo.map((item) => 
            <TodoComp 
            key={item._id} 
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)} 
            deleteTodo={() => deleteTodo(item._id, setToDo)}/>
           )}

        </div>
      </div>
    </div>
  );
}

export default App;
