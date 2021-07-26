create database controle_De_Contatos;
use controle_De_Contatos;

create table contatos(
  id int NOT NULL auto_increment,
  primeiroNome text NOT NULL,
  ultimoNome text NOT NULL,
  email text NOT NULL,
  primary key (id)
)

create table telefones(
id int NOT NULL auto_increment,
  idContato int NOT NULL,
  numero varchar(13) NOT NULL,
  FOREIGN KEY(idContato) REFERENCES contatos(id),
  primary key (id)
  
)