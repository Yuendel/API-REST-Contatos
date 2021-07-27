const express = require('express');
const contatos = require('./controladores/contatos');


const rotas = express();

// Contato
rotas.post('/cadastrarContatos', contatos.cadastrarContato);
rotas.get('/listarContatos', contatos.listarContatos);
rotas.put('/editarContato/:id', contatos.editarContato);
rotas.delete('/excluirContato/:id', contatos.excluirContato);



module.exports = rotas;