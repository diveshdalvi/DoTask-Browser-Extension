import React, { useState } from "react";

const todo = ({ todos, markAsDone }) => {
  const iscompletedTodos = todos.filter((todo) => !todo.isComplete);
  return (
    <div className=" flex flex-col justify-center pt-3 text-white">
      {iscompletedTodos.map((todo, index) => (
        <div className=" flex justify-between mx-4">
          <div className=" flex flex-col ">
            <span className=" text-lg">{todo.name}</span>
            <span className=" text-sm">{todo.date}</span>
          </div>
          <div className=" flex items-center text-sm">
            <button
              className=" shadow-md   p-2 rounded-md bg-green-950 "
              onClick={() => markAsDone(index)}
            >
              Mark as Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default todo;
