import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

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
            <li key={index}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>

              <button onClick={() => toggleComplete(index)}>
                Done
              </button>

              <button onClick={() => deleteTask(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;