# Seleção para vaga de Desenvolvedor Node na empresa CSP: API REST

## Back-end

### API

Esta API REST tem a capacidade de:

- Cadastrar, Editar, Listar e Excluir Contatos cadastrados em um banco de dados Mysql.
  
  **Importante:Rest API criada com o intuito de continuar no processo seletivo para a vaga de Desenvolvedor Node na empresa CSP.!**

Para utilizar esta API, instalar com Npm Install ou Yarn as seguintes bibliotecas:
    "cors";
    "express";
    "knex"; 
    "mysql"; 
    "nodemon"; 
    "yup". 
Podendo iniciala com npm run dev.


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
	"telefones":[{"numero": "07599987742"},
		{"numero": "01447889572"}
	]
}
```

-Todos os campos são obrigatórios;
-Ao menos 1 telefone deve ser informado.

  #### `GET` `/listarContatos`
Endpoint que permite fazer a listagem dos dados de todos os Contatos, não deverá receber conteúdo no corpo da requisição, podendo filtrar por: 


-Nome e/ou email, como exemplo abaixo:
http://localhost:3000/listarContatos?nome=Joseph&?email=yuendel.fb@hotmail.com

  #### `PUT` `/editarContato/:id`
Endpoint que permite editar um contato:

-Apenas campos requisitados serão modificados;
-Ao menos 1 campo deverá ser informado para a edição;
-id do contato a ser editado deve ser informado através de parâmetro de rota (params);
-Modifica dados exceto telefones.

Exemplo de body da requisição:

```json=
{
	"primeiroNome":"Joseph",
	"ultimoNome":"joestar",
	"email":"joseph.email@email.com"
}
```

#### `PUT` `/editarTelefone`
Endpoint que permite editar telefones de um usuario:

-Deve ser informado ao menos 1 telefone para edição;

Exemplo de body da requisição:

```json=
{
	"telefones":[{"id":"8","numero":"3030"},{"id":"7","numero":"2020"}]
}
```

 #### `DELETE` `/excluirTelefone/:id`
Endpoint para excluir um telefone existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do telefone através de parâmetro de rota (params). Através do ID o telefone será buscado em banco de dados e excluído.

****Foi vista a importancia da criação de um endPoint de edição/exclusão exclusivo para Telefones para melhor praticidade de implementação da API em uma aplicação!**


  #### `DELETE` `/excluirContato/:id`
Endpoint para excluir um contato existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do contato através de parâmetro de rota (params). Através do ID o contato será buscado em banco de dados e excluído.

