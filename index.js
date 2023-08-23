const express = require('express');

const app = express();

const port = 4000;

app.listen(port, () => {
    console.log('Se inicio correctamenta la aplicacion');
});

let todos = [
    {
        id: 1,
        title: 'Todo 1',
        desc: 'This is my first Todo',
        completed: true,
    },
    {
        id: 2,
        title: 'Todo 2',
        desc: 'This is my second Todo',
        completed: true,
    },

    {
        id: 3,
        title: 'Todo 3',
        desc: 'This is my third Todo',
        completed: true,
    },

    {
        id: 4,
        title: 'Todo 4',
        desc: 'This is my fourth Todo',
        completed: true,
    },

    {
        id: 5,
        title: 'Todo 5',
        desc: 'This is my fifth Todo',
        completed: true,
    },
];

app.get('/todos/all', (request, response) => {
    response.status(200).json(todos);
});

app.get('/todos/:id', (request, response) => {
    response
        .status(200)
        .json(todos.find((todo) => todo.id == request.params.id));
});

app.use(express.json());

app.post('/todos/create', (request, response) => {
    todos.push(request.body);
    response.status(201).json({ msg: "Todo created successfully" });
});

app.delete('/todos/delete/:id', (request, response) => {
    todos = todos.filter((todo) => todo.id != request.params.id)
    response.status(200).json({ message: "Se ha eliminado con exito" });
});

app.put("/todos/update/:id", (request, response) => {
    const todo = todos.find((todo) => todo.id == request.params.id);
    if (todo) {
        const data = request.body;
        todo.title = data.title;
        todo.desc = data.desc;
        todo.completed = data.completed;
        response.status(200).json({ msg: "Se ha actualizado con exito" });
    } else {
        response.status(404).json({ msg: "Todo no encontrado" });
    }
});