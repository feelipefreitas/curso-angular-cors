const express = require('express');

const server = express();

server.use(express.json());

const users = [
    {
        id: 0,
        name: 'Felipe',
        age: 25
    },
];

server.put('/users/:id', (req, res) => {
    const id = +req.params.id;
    const newUser = req.body;

    const user = users.find(u => u.id === id);

    if(user) {
        users[id] = newUser;

        res.status(200).send(users[id]);
    } else {
        res.status(404).send({ message: 'Usuário não encontrado' });
    }
});

server.listen(5000);