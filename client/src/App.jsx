import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function deleteTask(indexToDelete) {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  }
  function toggleComplete(indexToToggle) {
    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToToggle) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  }
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="container">
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
        {tasks.length === 0 && <p>No tasks yet 🚀</p>}
        <ul>
          {tasks.map((item, index) => (
            <TaskItem
              key={index}
              item={item}
              index={index}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;