// import express
const express = require('express');
var shortid = require('shortid')

// create a server
const server = express();

// middleware 
server.use(express.json())

// listen for incoming requests
const port = 9000;

server.listen(port, () => console.log(`\n == API running on port ${port} == \n`));

// Create API

let users = [
    {
        id: 1,
        name: "John Johnathon",
        bio: "He has 2 first names."
    },
    {
        id: 2,
        name: "Sammy Samantha",
        bio: "Huh, she also has 2 first names."
    },
    {
        id: shortid.generate(),
        name: "Alex Alexander",
        bio: "Why do these characters have 2 first names..."
    },
]

server.get('/users', (req, res) => {
    res.status(200).json(users)
})

// MVP Functions to handle HTTP requests

// POST 
server.post('/api/users', (req, res) => {
    const user = req.body;

    if(!user.name || !user.id) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    } else {
        users.push(user);
        return res.status(201).json(users);
    }
})

// GET
server.get('/api/users', (req, res) => {
    if(!users){
        return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        return res.status(200).json(users)
    }
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const findId = users.find(user => user.id == id)

    res.status(200).json(findId)
})

// DELETE
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    const users = users.filter(user => user.id !== Number(id));

    if (users !== id){
        return res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    } else {
        return res.status(200).json(users);
    }

})