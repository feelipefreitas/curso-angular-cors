const express = require('express');
const cors = require('cors');

const server = express();

server.use(express.json());

/**
 * Configuração Personalizada
 */
const corsConfig = {
    origin: ['http://127.0.0.1:8080', 'http://127.0.0.1:5050'],
    methods: 'PUT',
    allowedHeaders: 'content-type,x-auth-custom',
    credentials: true
};

server.use(cors(corsConfig));

/**
 * Configuração Padrão
 */
// server.use(cors());

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