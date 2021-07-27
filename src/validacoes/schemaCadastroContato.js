const yup = require('yup');

const schema = yup.object().shape({
    primeiroNome: yup.string().required("O campo de Primeiro Nome é Obrigatório!"),
    ultimoNome: yup.string().required("O campo de Ultimo Nome é Obrigatório!"),
    email: yup.string().email().required("O campo de E-mail é Obrigatório!"),
    telefones: yup.number().required("Obrigatório pelo menos 1 telefone cadastrado")
});

module.exports = { schema };