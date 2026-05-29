function TaskItem({ item, index, deleteTask, toggleComplete, editTask, }) {
    return (
        <li>
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
            <button onClick={() => editTask(index)}>
                Edit
            </button>
            <button onClick={() => deleteTask(index)}>
                Delete
            </button>
        </li>
    );
}

export default TaskItem;