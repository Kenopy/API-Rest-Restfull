const express =  require('express');
const app = express();
//Aqui entraria o banco de dados.
const data = require('./data.json');

//verbos HTTP    
//GET: Buscar informação no Resource
//POST: Criar uma informação no Resource
//PUT: Alterar uma informação no Resource
//DELETE: Deletar uma informação no Resource

app.use(express.json());

app.get("/clients", function(req, res) {
    res.json(data);
});

app.get("/clients/:id", function(req, res) {
    
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    res.json(client);
});

app.post("/clients", function(req, res) {
    
    const { name, email } = req.body;

    //Salvar

    res.json({ name, email });

});

app.put("/clients/:id", function(req, res) {

    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(204).json();

    const { name } = req.body;
    client.name = name;

    res.json(client);

});


app.delete("/clients/:id", function(req, res) {
    
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered);
});


app.listen(3000, function() {
    console.log('Server is running on port 3000');
});