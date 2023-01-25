-- CRIAÇÃO DA TABELA USERS
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR,
  avatar VARCHAR NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REMOÇÃO DA TABELA USERS
DROP TABLE IF EXISTS users;

-- INSERÇÃO DE DADOS NA TABELA USERS
INSERT INTO users (name, email, password) VALUES ( 'Usuário', 'email@email.com', '123456' );

-- DELETANDO REGISTROS DA TABELA USERS
DELETE FROM users WHERE id = 2
