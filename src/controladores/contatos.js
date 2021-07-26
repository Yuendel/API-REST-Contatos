const knex = require('../conexao');

const cadastrarContato = async (req, res) => {
    const { primeiroNome, ultimoNome, email, telefones } = req.body;


    if (!primeiroNome) {
        res.status(404).json('O campo de Primeiro Nome é Obrigatório! ')
    }

    if (!ultimoNome) {
        res.status(404).json('O campo de Ultimo Nome é Obrigatório! ')
    }

    if (!email) {
        res.status(404).json('O campo de E-mail é Obrigatório! ')
    }

    if (!telefones) {
        res.status(404).json('Obrigatório pelo menos 1 telefone cadastrado ')
    }


    try {
        const contato = await knex('contatos').insert({
            primeiroNome,
            ultimoNome,
            email
        });

        if (!contato) {
            return res.status(400).json("Não foi possível cadastrar seu contato");
        }

        const novoContato = await knex.select('id').from('contatos');


        try {
            for (let i = 0; i < telefones.length; i++) {
                await knex('telefones').insert({ idContato: novoContato[novoContato.length - 1].id, numero: telefones[i] });

            }
        } catch (error) {
            await knex('contatos').where({ id: novoContato[novoContato.length - 1].id }).del();
            return res.status(400).json("Não foi possível cadastrar seu contato");

        }

        return res.status(200).json("Contato cadastrado com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }

}

const listarContatos = async (req, res) => {
    const { nome, email } = req.query;

    try {

        if (nome) {
            const contatos = await knex.raw(`select contatos.*, telefones.numero,telefones.id as idTelefone from contatos 
            JOIN
            telefones on contatos.id = telefones.idContato
            WHERE contatos.primeiroNome LIKE "%${nome}%" OR contatos.ultimoNome LIKE "%${nome}%"`);

            if (contatos[0].length === 0) {
                return res.status(400).json(`Não existem contatos com nome ${nome}`);
            }

            return res.status(200).json(contatos[0]);
        }

        if (email) {
            const contatos = await knex.raw(`select contatos.*, telefones.numero, telefones.id as idTelefone from contatos 
            JOIN
            telefones on contatos.id = telefones.idContato
            WHERE contatos.email LIKE "${email}"`);

            if (contatos[0].length === 0) {
                return res.status(400).json(`Não existem contatos com E-mail ${email}`);
            }

            return res.status(200).json(contatos[0]);
        }

        const contatos = await knex.raw(`select contatos.*, telefones.numero, telefones.id as idTelefone from contatos 
        JOIN
        telefones on contatos.id = telefones.idContato`);
        return res.status(200).json(contatos[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editarContato = async (req, res) => {
    const { id } = req.params;
    const { primeiroNome, ultimoNome, email, telefones } = req.body;

    if (!primeiroNome && !ultimoNome && !email && !telefones) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {

        const contato = await knex('contatos').where({ id, id });

        if (!contato[0]) {
            return res.status(404).json('Contato não encontrado');
        }
        const contatoAtualizado = await knex('contatos').update({ primeiroNome, ultimoNome, email })
            .where({ id, id });

        if (contatoAtualizado === 0) {
            return res.status(400).json("O Contato não foi atualizado");
        }

        if (telefones) {
            for (let i = 0; i < telefones.length; i++) {
                const telefoneAtualizado = await knex('telefones').update({ numero: telefones[i].numero })
                    .where({ id: telefones[i].id, id: telefones[i].id });

                if (telefoneAtualizado === 0) {
                    return res.status(400).json("O Telefone não foi atualizado");
                }
            }
        }

        return res.status(200).json('Contato atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirContato = async (req, res) => {
    const { id } = req.params;

    try {
        const contato = await knex('contatos').where({ id, id });

        if (!contato[0]) {
            return res.status(404).json('Contato não encontrado');
        }

        const contatoExcluido = await knex.raw(`DELETE FROM contatos,telefones 
        USING contatos,telefones 
        WHERE contatos.id = ${id} AND
        telefones.idContato = ${id} `);

        if (contatoExcluido === 0) {
            return res.status(400).json("O contato não foi excluido");
        }

        return res.status(200).json('Contato excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    cadastrarContato,
    listarContatos,
    editarContato,
    excluirContato
}