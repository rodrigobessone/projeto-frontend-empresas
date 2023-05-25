# Aplicação de Gestão de RH

Esta aplicação tem como objetivo auxiliar proprietários de empresas e seus colaboradores a encontrar informações relevantes de acordo com seus níveis de acesso. Trata-se de um MVP (Produto Viável Mínimo) de um aplicativo de gestão de RH, com dois tipos de usuários: usuários comuns (funcionários) e usuários administradores. O desafio principal é identificar cada usuário e determinar suas permissões na aplicação.

## Funcionalidades Principais

- Página Inicial: Exibe todas as empresas cadastradas e permite filtrar por categoria. Permite também redirecionar ou abrir os modais de cadastro e login.

- Página/modal de Cadastro: Permite a criação de novos usuários (não administradores).

- Página/modal de Login: Realiza o login do usuário e direciona-o para sua respectiva área.

- Página do Usuário Comum: Renderiza as informações do usuário, como nome, e-mail, empresa e departamento em que trabalha, além dos colegas de departamento.

- Painel de Controle do Administrador: Permite cadastrar departamentos para uma empresa específica, listar departamentos e visualizar dados específicos de cada um (funcionários, descrição, etc.). Também lista todos os usuários cadastrados e permite atualizar seus dados e excluir funcionários.

- Painel de Controle do Usuário Comum: Exibe informações específicas da empresa e departamento do usuário comum, lista os funcionários do departamento e exibe uma mensagem caso o usuário não pertença a nenhum departamento.

## Documentação e Repositórios

- [Repositório base no GitHub](https://github.com/seu-usuario/repositorio)

- [Documentação da API](https://link-da-documentacao-api)

- [Layout do projeto no Figma](https://link-do-figma)

## Como executar o projeto

1. Clone o repositório em sua máquina local.

2. Instale as dependências utilizando o comando `npm install`.

3. Execute o projeto com o comando `npm start`.

4. Acesse a aplicação em seu navegador através do endereço `http://localhost:3000`.

## Credenciais de Acesso

- Administrador:
  - E-mail: admin@mail.com
  - Senha: 123456

## Considerações Finais

Esta aplicação foi desenvolvida como parte do Módulo 2, aplicando todos os conhecimentos e boas práticas adquiridas. A API fornecida deve ser consumida para obter os dados necessários. A estética é importante, mas a funcionalidade e fluidez do processo são prioridades. Para mais detalhes sobre as funcionalidades e implementação, consulte a documentação da API e o código-fonte do projeto.

Agradecemos por sua atenção e esperamos que a aplicação seja útil para auxiliar na gestão de RH das empresas!
