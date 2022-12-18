const express = require('express');

const server = express();

server.use(express.json());

server.use((req, res, next) => {
    if(req.method === 'OPTIONS') {
        console.log('OPTIONS');

        res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        res.setHeader('Access-Control-Allow-Headers', 'content-type,x-auth-custom');

        return res.status(204).send();
    }

    next();
});

const users = [
    {
        id: 0,
        name: 'Felipe',
        age: 25
    },
];

server.put('/users/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');

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