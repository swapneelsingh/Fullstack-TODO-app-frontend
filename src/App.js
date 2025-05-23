import { useEffect, useState } from "react";
import TodoComp from "./components/todoComp";
import { addToDo, getAllToDo, updateTodo, deleteTodo } from "./utils/handleAPI";

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
        <h1 className="title">
          <span className="hindi">कार्य</span>
          <span className="english">KRAM</span>
        </h1>
        <div className="top">
          <input
            type="text"
            placeholder=" ADD TODOs "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateTodo(todoID, text, setText, setToDo, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "UPDATE" : "ADD"}
          </div>
        </div>

        <div className="list">
          {toDo.map((item) => (
            <TodoComp
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => deleteTodo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
