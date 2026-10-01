# Sistema de Gestão Universitária (SGU) 🎓

Este repositório contém o projeto prático desenvolvido em grupo para o curso de Análise e Desenvolvimento de Sistemas (Senac). 

O SGU é uma plataforma acadêmica e administrativa projetada para gerenciar alunos, docentes, disciplinas e fornecedores. O projeto contempla desde o mapeamento de processos até a construção de um banco de dados relacional e um protótipo de interface funcional.

## 🎯 Meu Papel no Projeto
Neste trabalho em equipe, atuei focado na **análise de requisitos e arquitetura de processos**. Minhas principais contribuições foram:
- **Desenho de Fluxos:** Mapeamento de como os dados deveriam transitar pelo sistema, garantindo a lógica de negócio antes da codificação.
- **Definição de Regras de Negócio:** Estruturação das restrições do sistema, como o limite de carga horária para docentes e as validações do processo de compras.
- **Casos de Uso:** Definição dos atores do sistema (Secretário Acadêmico, Coordenador de Curso, Assistente Administrativo e Gestor de Projeto) e suas permissões.

Com a base lógica estruturada, a equipe atuou em conjunto para traduzir essas regras na modelagem física do banco e no desenvolvimento do front-end.

## 🚀 Tecnologias Utilizadas
- **Banco de Dados:** MySQL 8.0+ (DDL, DML, Triggers, Stored Procedures, Views).
- **Protótipo de Interface:** HTML5, CSS3, Vanilla JavaScript (base de dados em memória para simulação).

## ⚙️ Como executar o projeto

### 1. Banco de Dados (Back-end)
1. Abra o MySQL Workbench e conecte-se ao seu servidor local.
2. Execute o script `01_ddl.sql` para criar a estrutura do banco (`gestao_universitaria`), incluindo tabelas, restrições, views e triggers.
3. Em seguida, execute o script `02_dml.sql` para popular o banco com os dados de demonstração simulados.

### 2. Protótipo Visual (Front-end)
O protótipo foi construído para validar a interface e a navegação estática dos fluxos.
1. Clone este repositório ou faça o download dos arquivos.
2. Abra o arquivo `index.html` em qualquer navegador web.
3. Na tela de login, utilize a senha de demonstração `12345` e selecione o perfil de acesso desejado no menu suspenso para explorar as funcionalidades de cada ator.

## 👥 Sobre a Equipe
Este sistema foi fruto de um trabalho colaborativo. A união entre uma modelagem de processos bem definida e o esforço conjunto da equipe na codificação resultou em uma aplicação robusta, que respeita as regras de negócio do mundo real.
