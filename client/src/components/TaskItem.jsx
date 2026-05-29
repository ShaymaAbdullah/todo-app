function TaskItem({ item, index, deleteTask, toggleComplete }) {
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

            <button onClick={() => deleteTask(index)}>
                Delete
            </button>
        </li>
    );
}

export default TaskItem;