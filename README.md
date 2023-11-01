# Study API

Este é o repositório da **Study API**, uma aplicação Node.js que utiliza Express, TypeScript e MongoDB para criar uma API robusta de estudo. Além disso, esta API inclui autenticação para garantir a segurança dos usuários.

## Tecnologias Utilizadas
- **Node.js**: Plataforma de execução de código JavaScript no lado do servidor.
- **Express.js**: Framework web para Node.js que simplifica o desenvolvimento de aplicativos.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código, facilitando o desenvolvimento e manutenção.
- **MongoDB**: Banco de dados NoSQL que armazena os dados em formato JSON-like.
- **Authentication**: Mecanismo de autenticação para proteger endpoints sensíveis da API.

## Funcionalidades Principais
1. **Cadastro de Usuário**: Os usuários podem se cadastrar na plataforma fornecendo informações como nome, e-mail, e senha.
2. **Autenticação**: Implementação de autenticação para proteger os endpoints da API, garantindo que apenas usuários autorizados possam acessar determinadas funcionalidades.
3. **Recuperação de Senha**: Funcionalidade para usuários recuperarem suas senhas por meio do envio de e-mails de redefinição.
4. **Gerenciamento de Conteúdo de Estudo**: CRUD completo para criar, ler, atualizar e deletar conteúdo de estudo, incluindo títulos, descrições e categorias.
5. **Pesquisa Avançada**: Implementação de uma funcionalidade de pesquisa que permite aos usuários encontrar conteúdo de estudo com base em palavras-chave, categorias ou outros critérios relevantes.

## Como Usar
1. **Instalação das Dependências**: Antes de iniciar a aplicação, instale as dependências usando `npm install`.
2. **Configuração do Banco de Dados**: Configure as credenciais do MongoDB no arquivo de configuração.
3. **Compilação e Execução**: Compile o código TypeScript usando `tsc` e, em seguida, inicie o servidor com `node dist/index.js`.
4. **Endpoints Disponíveis**: Explore os endpoints da API para gerenciar usuários, conteúdo de estudo e autenticação.

