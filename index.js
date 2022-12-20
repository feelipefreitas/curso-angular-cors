const express = require('express');

const server = express();

server.use(express.json());

const validOrigins = [
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5050'
];

server.use((req, res, next) => {
    if(req.method === 'OPTIONS') {
        console.log('OPTIONS');

        const validOrigin = validOrigins.find(origin => origin === req.get('Origin'));

        if(validOrigin) {
            res.setHeader('Access-Control-Allow-Origin', validOrigin);
            res.setHeader('Access-Control-Allow-Methods', 'PUT');
            res.setHeader('Access-Control-Allow-Headers', 'content-type,x-auth-custom');
        }

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
    res.setHeader('Access-Control-Allow-Origin', req.get('Origin'));

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