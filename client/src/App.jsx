function App() {
  return (
    <div className="container">
      <h1>Todo App</h1>

      <div>
        <input type="text" placeholder="Enter a task" />
        <button>Add</button>
      </div>

      <ul>
        <li>Study React</li>
        <li>Finish project</li>
      </ul>
    </div>
  );
}

export default App;