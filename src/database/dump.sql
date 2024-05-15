CREATE TABLE usuarios (
    id serial primary key,
    nome varchar(255) not null,
    email varchar(255) unique not null,
    senha varchar(255) not null
);

CREATE TABLE categorias (
    id serial primary key,
    descricao varchar(255) not null
);


insert into categorias (descricao) values
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

create table produtos (
    id serial primary key,
    descricao varchar(255) not null,
    quantidade_estoque integer not null, 
    valor integer not null,
    categoria_id integer references categorias(id),
    produto_imagem text
);

create table clientes (
    id serial primary key,
    nome varchar(255) not null,
    email varchar(255) not null unique,
    cpf varchar(14) not null unique,
    cep varchar (9),
    rua varchar (255),
    numero integer,
    bairro varchar (255),
    cidade varchar (255),
    estado varchar (255)
);


alter table produtos add produto_imagem text;

create table pedidos (
	id serial primary key,
    cliente_id integer not null references clientes(id),
    observacao varchar(255),
    valor_total integer not null
);

create table pedido_produtos (
	id serial primary key,
    pedido_id integer not null references pedidos(id),
    produto_id integer not null references produtos(id),
    quantidade_produto integer not null,
    valor_produto integer not null
);