Nome: Joaquim

Middlewares

verifyUser: verifica se o usuário existe, validando o username e o password.

verifyTypeUser: verifica se o usuário existe, e o tipo dele (Admin ou normal). Usado nas rotas que apenas Admins podem ter acesso.

Controller

book-controller: As rotas que não são públicas, funções que apenas usuários podem ter acesso. Algumas funções apenas Admins podem acessar e outras usuários normais e Admins.
Funções funcinando nele (todas):
listarTodosLivros, buscarLivroPorId, pegarLivroEmprestado, devolverLivro, criarLivros, atualizarLivro e deletarLivro

user-controller: Unica rota publica, serve apenas para criar usuarios
Funções:
criarUsuario


