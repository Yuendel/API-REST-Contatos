/* eslint-disable no-restricted-syntax */
const knex = require('../conexao');
const { schema } = require('../validacoes/schemaCadastroContato');

const cadastrarContato = async (req, res) => {
  const {
    primeiroNome, ultimoNome, email, telefones,
  } = req.body;

  try {
    await schema.validate(req.body);

    const contato = await knex('contatos').insert({
      primeiroNome,
      ultimoNome,
      email,
    });
    if (!contato) {
      return res.status(400).json('Não foi possível cadastrar seu contato');
    }
    for (const telefone of telefones) {
      const telefoneCriado = await knex('telefones').insert({
        idContato: contato,
        numero: telefone.numero,
      });
      if (!telefoneCriado) {
        await knex('telefones').where({ idContato: contato }).del();
        await knex('contatos').where({ id: contato }).del();
        return res.status(400).json('Não foi possível cadastrar seu contato');
      }
    }

    return res.status(200).json('Contato cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const listarContatos = async (req, res) => {
  const { nome, email } = req.query;

  try {
    const contatos = await knex('contatos').where((builder) => {
      if (nome) {
        builder.where('nome', 'ilike', `%${nome}%`);
      }

      if (email) {
        builder.where('email', 'ilike', `%${email}%`);
      }
    });

    for (const contato of contatos) {
      const telefones = await knex('telefones').where({ idContato: contato.id });
      contato.telefones = telefones;
    }

    return res.status(200).json(contatos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarContato = async (req, res) => {
  const { id } = req.params;
  const {
    primeiroNome, ultimoNome, email,
  } = req.body;

  if (!primeiroNome && !ultimoNome && !email) {
    return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
  }

  try {
    const contato = await knex('contatos').where({ id });

    if (!contato[0]) {
      return res.status(404).json('Contato não encontrado');
    }
    const contatoAtualizado = await knex('contatos').update({ primeiroNome, ultimoNome, email })
      .where({ id });

    if (contatoAtualizado === 0) {
      return res.status(400).json('O Contato não foi atualizado');
    }

    return res.status(200).json('Contato atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editarTelefone = async (req, res) => {
  const {
    telefones,
  } = req.body;

  if (!telefones[0]) {
    res.status(400).json('Informe ao menos um dos telefones para edição!');
  }
  try {
    for (const telefone of telefones) {
      const telefoneAtualizado = await knex('telefones').update({ numero: telefone.numero })
        .where({ id: telefone.id });

      if (telefoneAtualizado === 0) {
        return res.status(400).json('O Telefone não foi atualizado');
      }
    }
    return res.status(200).json('Telefones atualizados com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirTelefone = async (req, res) => {
  const { id } = req.params;

  try {
    const telefone = await knex('telefones').where({ id });

    if (!telefone[0]) {
      return res.status(404).json('Telefone não encontrado');
    }
    const telefoneExcluido = await knex('telefones').where({ id }).del();

    if (telefoneExcluido === 0) {
      return res.status(400).json('O contato não foi excluido');
    }

    return res.status(200).json('Contato excluido com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirContato = async (req, res) => {
  const { id } = req.params;

  try {
    const contato = await knex('contatos').where({ id });

    if (!contato[0]) {
      return res.status(404).json('Contato não encontrado');
    }

    await knex('telefones').where({ idContato: contato[0].id }).del();
    const contatoExcluido = await knex('contatos').where({ id }).del();

    if (contatoExcluido === 0) {
      return res.status(400).json('O contato não foi excluido');
    }

    return res.status(200).json('Contato excluido com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarContato,
  listarContatos,
  editarContato,
  editarTelefone,
  excluirTelefone,
  excluirContato,
};
