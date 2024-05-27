import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Todo from "./Components/Todo";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
const App = () => {
  const getCurrentDate = () => {
    let currentDate = new Date();
    let options = { day: "numeric", month: "short", year: "numeric" };
    let todayDate = currentDate.toLocaleDateString("en-US", options);
    return todayDate;
  };
  const [addTodoOpt, setAddTodoOpt] = useState(false);
  const toggleAddTodoOpt = () => {
    setAddTodoOpt(!addTodoOpt);
  };
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const markAsDone = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const saveTodo = () => {
    const name = document.getElementById("todo_name").value.trim();
    if (!name) {
      alert("Please Enter a valid todo name ");
      return;
    }
    const todo = {
      name: name,
      date: getCurrentDate(),
      isComplete: false,
    };
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos.sort((a, b) => new Date(b.date) - new Date(a.date)));
    saveTodoToLocalStorage(updatedTodos);
    document.getElementById("todo_name").value = "";
    toggleAddTodoOpt();
  };

  const saveTodoToLocalStorage = (todo) => {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const ariaLabel = { "aria-label": "description" };
  return (
    <div className="   bg-[#09432d]  min-h-[500px] min-w-[400px]">
      <div className=" border-[#e2af7f] border-4   pt-3 min-h-[500px]">
        <div className=" px-12">
          <span className=" text-5xl text-white  text-center pt-2 cursor-pointer font-Fredericka pb-2 flex justify-center">
            DoTask
          </span>
          <hr className=" font-bold" />
          <div className=" text-center text-white font-normal text-xl flex justify-between mt-2">
            <span className=" text-2xl">todos</span>
            <span className=" cursor-pointer" onClick={toggleAddTodoOpt}>
              {addTodoOpt === false ? (
                <AddIcon fontSize="large" />
              ) : (
                <CloseIcon />
              )}
            </span>
          </div>
          <div className=" flex justify-center text-white mt-3">
            {addTodoOpt && (
              <div className=" flex  items-center justify-between gap-16">
                <span>
                  <Box
                    sx={{
                      "& > :not(style)": { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    {" "}
                    <Input
                      placeholder="Name"
                      inputProps={ariaLabel}
                      sx={{
                        colorScheme: "normal",
                        backgroundColor: "transparent", // Change this to your desired background color
                        color: "white", // Text color
                        "&::placeholder": {
                          color: "white", // Placeholder text color
                        },
                        ".MuiInput-underline": {
                          borderBottomColor: "white",
                        },
                      }}
                      id="todo_name"
                    />
                  </Box>
                </span>
                <span className=" cursor-pointer" onClick={saveTodo}>
                  <DoneIcon />
                </span>
              </div>
            )}
          </div>
        </div>
        <Todo todos={todos} markAsDone={markAsDone} />
      </div>
    </div>
  );
};

export default App;
