import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([]);

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

  async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task._id !== id));
  }
  async function toggleComplete(id, completed) {
    const response = await fetch(
      `http://localhost:5000/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      }
    );

    const updatedTask = await response.json();

    setTasks(
      tasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
  }
  async function editTask(id) {
    const newText = prompt("Edit your task:");

    if (!newText || newText.trim() === "") return;

    const response = await fetch(
      `http://localhost:5000/tasks/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newText,
        }),
      }
    );

    const updatedTask = await response.json();

    setTasks(
      tasks.map((task) =>
        task._id === id ? updatedTask : task
      )
    );
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
          {filteredTasks.map((item) => (
            <TaskItem
              key={item._id}
              item={item}
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