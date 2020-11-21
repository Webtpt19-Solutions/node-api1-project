const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json())

let users = []

server.post('/api/users', (req, res) => {
    let userInfo = req.body;

    if(!userInfo.name) res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) 
    if(!userInfo.bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) 

    userInfo.id = shortid.generate();
    users.push(userInfo);

    res.status(201).json(userInfo)
    
});

server.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = null;

    users.forEach(item => {
        if(item.id === id){ res.status(200).json(item) }
    })
    res.status(404).json({ message: "The user with the specified ID does not exist." })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUsers = []

    users.forEach(user => {
        if (user.id !== id) updatedUsers.push(user)
    })

    if(updatedUsers.length < users.length) res.status(200).json({message: "user deleted"})

    res.status(404).json({errorMessage: "No user with specified ID"})
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    let found = false;

    if(!userInfo.name) res.status(400).json({ errorMessage: "Please provide name and bio for the user." }) 
    if(!userInfo.bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

    users.map(user => {
        if(user.id === id){
            found = true;
            return changes
        }
        return user
    })
    if(found) res.status(200).json({data: changes})
    res.status(404).json({errorMessage:"no user with specified ID"})
})


const port = 5000;
server.listen(port, () => console.log(`\n API is listening on port ${port} \n`));
