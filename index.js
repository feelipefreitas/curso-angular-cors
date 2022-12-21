const express = require('express');

const server = express();

server.use(express.json());

const validOrigins = [
    {
        origin: 'http://127.0.0.1:8080',
        methods: 'PUT',
        headers: 'content-type,x-auth-custom',
        credentials: true,
    },
    {
        origin: 'http://127.0.0.1:5050',
        methods: 'PUT,POST,DELETE',
        headers: 'content-type,x-auth-custom',
        credentials: false,
    },
];

server.use((req, res, next) => {
    if(req.method === 'OPTIONS') {
        console.log('OPTIONS - Pre-Flight');

        const validOrigin = validOrigins.find(validOrigin => validOrigin.origin === req.get('Origin'));

        if(validOrigin) {
            res.setHeader('Access-Control-Allow-Origin', validOrigin.origin);
            res.setHeader('Access-Control-Allow-Methods', validOrigin.methods);
            res.setHeader('Access-Control-Allow-Headers', validOrigin.headers);
            res.setHeader('Access-Control-Allow-Credentials', validOrigin.credentials);
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

    const validOrigin = validOrigins.find(validOrigin => validOrigin.origin === req.get('Origin'));

    if(validOrigin) {
        res.setHeader('Access-Control-Allow-Credentials', validOrigin.credentials);
    }

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