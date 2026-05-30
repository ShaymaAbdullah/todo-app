function TaskItem({
    item,
    deleteTask,
    toggleComplete,
    editTask,
}) {
    return (
        <li>
            <span
                style={{
                    textDecoration: item.completed
                        ? "line-through"
                        : "none",
                }}
            >
                {item.text}
            </span>

            <button
                onClick={() =>
                    toggleComplete(
                        item._id,
                        item.completed
                    )
                }
            >
                Done
            </button>

            <button
                onClick={() => editTask(item._id)}
            >
                Edit
            </button>

            <button
                onClick={() => deleteTask(item._id)}
            >
                Delete
            </button>
        </li>
    );
}

export default TaskItem;