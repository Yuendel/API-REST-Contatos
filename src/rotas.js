const express = require('express');
const contatos = require('./controladores/contatos');

const rotas = express();

rotas.post('/cadastrarContatos', contatos.cadastrarContato);
rotas.get('/listarContatos', contatos.listarContatos);
rotas.put('/editarContato/:id', contatos.editarContato);
rotas.put('/editarTelefone', contatos.editarTelefone);
rotas.delete('/excluirTelefone/:id', contatos.excluirTelefone);
rotas.delete('/excluirContato/:id', contatos.excluirContato);

module.exports = rotas;
