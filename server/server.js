const express = require("express");
const cors = require("cors");
const Task = require("./models/Task");


const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://shaymaab1424_db_user:KgRc7649siv4iccA@ac-2tjuo9b-shard-00-00.b0miics.mongodb.net:27017,ac-2tjuo9b-shard-00-01.b0miics.mongodb.net:27017,ac-2tjuo9b-shard-00-02.b0miics.mongodb.net:27017/?ssl=true&replicaSet=atlas-ls81jc-shard-0&authSource=admin&appName=to-do"
)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Error:", err));

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post("/tasks", async (req, res) => {
    const task = await Task.create({
        text: req.body.text,
    });

    res.status(201).json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                completed: req.body.completed,
            },
            {
                new: true,
            }
        );

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.put("/tasks/edit/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
            },
            {
                new: true,
            }
        );

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});