# Seleção para vaga de Desenvolvedor Node na empresa CSP: API REST

## Back-end

### API

Esta API REST tem a capacidade de:

- Cadastrar, Editar, Listar e Excluir Contatos cadastrados em um banco de dados Mysql.
  
  **Importante:Rest API criada com o intuito de continuar no processo seletivo para a vaga de Desenvolvedor Node na empresa CSP.!**

### Banco de dados
*** Querys disponiveis no arquivo "Schema.sql" !**
# 1ª tabela ("contatos")

| Coluna     | Tipo         | NOT NULL? | PK? | REFERENCES | DEFAULT   |
| --------   | --------     | --------- | --- | ---------- | -------   |
| id         | int          | Sim       | Sim |            |           |
|primeiroNome| text         | Sim       |     |            |           |
| ultimoNome | text         | Sim       |     |            |           |
| email      | text         | Sim       |     |            |           |


# 2ª tabela ("telefones")

| Coluna     | Tipo         | NOT NULL? | PK? | REFERENCES | DEFAULT   |
| --------   | --------     | --------- | --- | ---------- | -------   |
| id         | int          | Sim       | Sim |            |           |
| idContato  | int          | Sim       |     |contatos(id)|           |
| numero     | varchar(13)  | Sim       |     |            |           |


  *** Campos "Id" são preenchidos automaticamento (auto_increment)!**

  ## Endpoints

  #### `POST` `/cadastrarContatos`
 Endpoint que permite cadastrar um novo contato. Recebe todos os dados do contato através de objeto JSON no corpo da requisição no formato do exemplo abaixo.

  ```json=
{
	"primeiroNome":"Yuendel",
	"ultimoNome":"Farias",
	"email":"yuendel.fb@hotmail.com",
	"telefones":["07599987741",
		"01447889571"
	]
}
```

-Todos os campos são obrigatórios;
-Ao menos 1 telefone deve ser informado.

  #### `GET` `/listarContatos`
Endpoint que permite fazer a listagem dos dados de todos os Contatos, não deverá receber conteúdo no corpo da requisição podendo filtrar por: 


-Nome, passando como parametro como exemplo abaixo:

/listarContatos?nome=Yuendel

-Email, passando como parametro como exemplo abaixo:

/listarContatos?email=jotaro.joestar@hotmail.com

  #### `PUT` `/editarContato/:id`
Endpoint que permite editar um contato:

-Apenas campos requisitados serão modificados;
-Ao menos 1 campo deverá ser informado para a edição;
-id do contato a ser editado deve ser informado através de parâmetro de rota (params);
-Se existir um telefone a ser modificado, o id do mesmo deverá ser informado no body como no exemplo abaixo.

Exemplo de body com modificação apenas do primeiro nome, e de 1 dos telefones pertencentes aquele contato:

```json=
{
	"primeiroNome":"Joseph",
	"telefones":[{"id":"2","numero":"12345678"}]
}
```


  #### `DELETE` `/excluirContato/:id`
Endpoint para excluir um contato existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do contato através de parâmetro de rota (params). Através do ID o contato será buscado em banco de dados e excluído.

