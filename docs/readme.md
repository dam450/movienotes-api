# Movienotes API

Uma aplicação em Node.js onde o usuário cadastra filmes, preenche com algumas informações (nome, descrição, nota) e cria tags de categorias relacionadas a ele (comédia, terror, ação etc).

Abaixo, temos um diagrama do modelo de banco de dados:

![Diagrama Entidade Relacionamento](./diagram_db/Movie_Notes_DER.png)

## Recursos presentes nesta API:

- Criptografia de senhas;
  > bcriptjs

- Validação de e-mail;
  > validação por regex


- Cascade Delete, para garantir que uma tag será excluída caso o usuário opte por excluir a nota.

## Teste da API

Configuração de rotas do [Insomnia](./insomnia/Insomnia_config).
