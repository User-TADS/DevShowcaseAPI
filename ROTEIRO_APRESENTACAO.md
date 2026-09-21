# 🎬 Roteiro Oficial para Gravação do Vídeo de Apresentação (5 a 8 Minutos)

Este roteiro foi estruturado rigorosamente com base nas diretrizes da **Tarefa Avaliativa - Etapa 1**:
- **Tempo total:** Entre 5 e 8 minutos.
- **Formato:** Gravar a **tela inteira** compartilhada, com áudio nítido.
- **Abertura com Webcam:** Todos os integrantes devem aparecer no início se apresentando com o **nome completo**.
- **Foco principal:** Demonstração prática da API em execução no **Postman** e exibição dos logs no console do terminal.

---

## ⏱️ Cronômetro Sugerido (Minuto a Minuto)

| Tempo | Etapa | O que mostrar / falar |
|---|---|---|
| **00:00 - 00:45** | **Apresentação Pessoal (Câmera)** | Câmera aberta: "Olá professor, meu nome é [Seu Nome Completo] e este é o trabalho da disciplina sobre a API DevShowcase..." |
| **00:45 - 01:45** | **Visão Geral da Arquitetura e Modelagem** | Mostrar o código no VS Code / Antigravity: stack Node.js/Express, TypeScript, Prisma ORM e SQLite, destacando a arquitetura em camadas (Controllers, Repositories, DTOs) e os relacionamentos relacionais. |
| **01:45 - 06:45** | **Demonstração Prática no Postman e Terminal** | Dividir ou alternar a tela entre Postman e o terminal com `npm run dev`, disparando as requisições em ordem. |
| **06:45 - 07:30** | **Testes Automatizados e Conclusão** | Rodar `npm test` no terminal demonstrando a cobertura de testes e encerrar. |

---

## 📝 Passo a Passo Detalhado para a Gravação

### 1. Início (00:00 - 00:45) - Apresentação Pessoal
1. Abra seu software de gravação (OBS Studio, Google Meet, Loom, etc.).
2. Ative a webcam em destaque.
3. **Fale:**
   > *"Olá professor(a) e colegas! Meu nome é [Seu Nome Completo]. Nesta apresentação da Etapa 1 do projeto DevShowcase, vou demonstrar o backend desenvolvido em Node.js com Express e TypeScript, utilizando persistência relacional com Prisma ORM e SQLite."*

---

### 2. Visão da Arquitetura (00:45 - 01:45) - Código & Modelagem
1. Mude a tela para o editor de código.
2. Abra o arquivo `prisma/schema.prisma` e aponte os modelos:
   > *"Aqui na modelagem de domínio, criamos as 4 entidades solicitadas:"*
   - **Profile (Perfil do Desenvolvedor)**: possui relacionamento **1 : N** com `Project`.
   - **Project (Projeto)**: possui relacionamento **N : N** com `Technology` e relacionamento **1 : N** com `Feedback`.
   - **Technology (Tecnologia)**: relacionada a muitos projetos.
   - **Feedback (Opinião)**: associada diretamente a um projeto.
3. Mostre a pasta `src/`:
   - `src/dtos/`: Validações com Zod para campos obrigatórios, títulos não vazios e URLs válidas.
   - `src/repositories/`: Padrão Repository isolando as queries ao banco.
   - `src/controllers/` e `src/routes/`: Camada HTTP.

---

### 3. Demonstração Prática da API (01:45 - 06:45) - Postman + Terminal

> 💡 **Dica:** Deixe o terminal visível em um lado da tela com `npm run dev` rodando e o Postman no outro lado. Assim, cada requisição dispara logs coloridos em tempo real no console!

Importe a coleção `postman/DevShowcase_API.postman_collection.json` no Postman e execute na seguinte ordem:

#### A. Tecnologias
1. **POST - Cadastrar Tecnologia (Node.js)**:
   - Clique em **Send**.
   - Mostre o status **201 Created** e aponte no terminal o log de requisição `POST /api/technologies 201`.
2. **POST - Cadastrar Tecnologia (Prisma ORM)**:
   - Clique em **Send** (status **201 Created**).
3. **POST - Cadastrar Tecnologia com Nome Vazio (Validação)**:
   - Clique em **Send**.
   - Mostre o status **400 Bad Request** com a mensagem de erro do Zod: `"O nome da tecnologia não pode estar vazio"`.
4. **GET - Listar Todas as Tecnologias**:
   - Clique em **Send** (status **200 OK**). Mostre o array com as tecnologias cadastradas.

#### B. Perfis de Desenvolvedores (Profiles)
1. **POST - Cadastrar Perfil de Desenvolvedor**:
   - Mostre o corpo da requisição com nome, e-mail e URL do GitHub.
   - Clique em **Send** (status **201 Created**).
   - O Postman salva automaticamente o ID retornado.
2. **POST - Cadastrar Perfil com Dados Inválidos (Validação)**:
   - Clique em **Send** (status **400 Bad Request**).
   - Aponte a validação de e-mail inválido e URL inválida.
3. **GET - Buscar Perfil por ID**:
   - Clique em **Send** (status **200 OK**).
   - Mostre os detalhes do perfil e sua lista de projetos.

#### C. Projetos (Projects)
1. **POST - Cadastrar Projeto (com relacionamentos)**:
   - Mostre no JSON: o projeto vinculado ao `profileId` (1:N) e ao array `technologyIds` (N:N).
   - Clique em **Send** (status **201 Created**).
   - Mostre a resposta completa com o objeto do autor (`profile`) e o array de `technologies` embutido.
2. **POST - Cadastrar Projeto com Título Vazio (Validação)**:
   - Clique em **Send** (status **400 Bad Request**).
   - Mostre a validação: `"O título não pode estar vazio"`.
3. **GET - Listar Todos os Projetos**:
   - Clique em **Send** (status **200 OK**).
   - Mostre a listagem completa com todos os relacionamentos carregados.

#### D. Feedbacks (Opiniões)
1. **POST - Cadastrar Feedback para o Projeto**:
   - Mostre o autor, texto de avaliação e rating 5 vinculado ao `projectId` (1:N).
   - Clique em **Send** (status **201 Created**).
2. **POST - Cadastrar Feedback com Nota Fora do Limite**:
   - Envie com nota 10.
   - Mostre o status **400 Bad Request** com `"A avaliação máxima é 5 estrelas"`.
3. **GET - Listar Feedbacks por Projeto**:
   - Clique em **Send** (status **200 OK**) mostrando as opiniões associadas.

---

### 4. Testes Automatizados e Conclusão (06:45 - 07:30)
1. No terminal, execute:
   ```bash
   npm test
   ```
2. Mostre todas as suítes de teste passando (**PASS**) com Supertest e Jest cobrindo profiles, technologies, projects e feedbacks.
3. **Encerramento com a Câmera:**
   > *"Como pudemos ver, todos os 4 modelos relacionais, repositórios, validações de DTOs e endpoints REST foram devidamente implementados e validados tanto manualmente via Postman quanto por testes automatizados. O código-fonte está disponível no repositório GitHub público. Muito obrigado!"*
