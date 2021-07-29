const yup = require('yup');

const schemaTelefone = yup.object().shape({
  numero: yup.string().required('Pelo menos 1 telefone deve ser cadastrado!'),
});

const schema = yup.object().shape({
  primeiroNome: yup.string().required('O campo de Primeiro Nome é Obrigatório!'),
  ultimoNome: yup.string().required('O campo de Ultimo Nome é Obrigatório!'),
  email: yup.string().email().required('O campo de E-mail é Obrigatório!'),
  telefones: yup.array().of(schemaTelefone).min(1),
});

module.exports = { schema };
