import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  async function addTask() {
    if (task.trim() === "") return;

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: task,
      }),
    });

    const newTask = await response.json();

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
  function editTask(indexToEdit) {
    const newText = prompt("Edit your task:");

    if (!newText || newText.trim() === "") return;

    const updatedTasks = tasks.map((task, index) => {
      if (index === indexToEdit) {
        return {
          ...task,
          text: newText,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }
  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("http://localhost:5000/tasks");

      const data = await response.json();

      setTasks(data);
    }

    fetchTasks();
  }, []);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "active") {
      return !task.completed;
    }

    return true;
  });
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
        <div className="filters">
          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button onClick={() => setFilter("active")}>
            Active
          </button>

          <button onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>
        <ul>
          {filteredTasks.map((item, index) => (
            <TaskItem
              key={index}
              item={item}
              index={index}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
              editTask={editTask}
            />
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;