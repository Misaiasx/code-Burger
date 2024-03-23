const express = require("express");
const app = express();
const uuid = require("uuid");
const port = 3001;

app.use(express.json());
const commands = [];

const checkCommand = (request, response, next) => {
    const { id } = request.params;
    const index = commands.findIndex((command) => command.id === id);

    if (index < 0) {
        return response.status(404).json({ error: "Command not found" });
    }

    request.userIndex = index;
    request.userId = id;
    next();
};

app.post("/commands", (request, response) => {
    const { order, clienteName, price } = request.body;
    const status = "pending"; 
    const user = { id: uuid.v4(), order, clienteName, price, status };
    commands.push(user);
    return response.status(201).json(user);
});

app.get("/commands", (request, response) => {
    return response.json(commands);
});

app.put("/commands/:id", checkCommand, (request, response) => {
    const { order, clienteName, price, status } = request.body;
    const index = request.userIndex;
    const updatedUser = { ...commands[index], order, clienteName, price, status };
    commands[index] = updatedUser;
    return response.status(200).json(updatedUser);
});

app.delete("/commands/:id", checkCommand, (request, response) => {
    const index = request.userIndex;
    commands.splice(index, 1);
    return response.status(204).json();
});

app.get("/commands/:id", checkCommand, (request, response) => {
    const index = request.userIndex;
    const user = commands[index];
    return response.json(user);
});

app.patch("/commands/:id", checkCommand, (request, response) => {
    return response.json("Seu pedido está pronto");
});

app.listen(port, () => {
    console.log(🌋 Server started on port ${port});
});



