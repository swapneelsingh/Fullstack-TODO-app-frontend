import axios from "axios";

// const baseUrl = "http://localhost:5000/api/v1/users"; // ✅ Corrected
// const baseUrl = "http://localhost:5000";
const baseUrl = "https://fullstack-todo-app-backend-gfkq.onrender.com"; // ✅ Corrected

const getAllToDo = (setToDo) => {
  axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log("data ---> ", data);
      setToDo(data.data);
    })
    .catch((err) => {
      console.error("Error fetching TODOs:", err);
    });
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then(({ data }) => {
      console.log("data ---> ", data);
      //   setToDo((prev) => [...prev, data]);
      setText("");
      getAllToDo(setToDo); // Refresh the TODO list after adding a new one
    })
    .catch((err) => {
      console.error("Error adding TODO:", err);
    });
};

const updateTodo = (todoID, text, setText, setToDo, setIsUpdating) => {
  axios
    .post(`${baseUrl}/update`, { _id: todoID, text })
    .then(({ data }) => {
      console.log("data ---> ", data);
      //   setToDo((prev) => [...prev, data]);
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo); // Refresh the TODO list after adding a new one
    })
    .catch((err) => {
      console.error("Error adding TODO:", err);
    });
};

const deleteTodo = (_id, setToDo) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then(({ data }) => {
      console.log("data ---> ", data);
      getAllToDo(setToDo);
    })
    .catch((err) => {
      console.error("Error adding TODO:", err);
    });
};

export { getAllToDo, addToDo, updateTodo, deleteTodo };
