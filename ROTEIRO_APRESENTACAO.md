# 🎬 Roteiro de Apresentação e Gravação do Vídeo (5 a 8 minutos)

Este roteiro foi elaborado sob medida para cumprir **100% dos critérios avaliativos** descritos no documento da tarefa prática (**DevShowcase API**).

---

## 📌 Checklist Rápido Pré-Gravação

- [ ] **Ambiente**: Celular/webcam ligada e microfone testado (áudio limpo e sem ruídos).
- [ ] **Softwares abertos**:
  1. **OBS Studio** (ou gravador de tela de sua preferência) configurado para gravar a **tela inteira** com sua **webcam no canto ou em tela cheia no início**.
  2. **VS Code** com a pasta `Trabalho` aberta.
  3. **Terminal** do VS Code aberto com a API rodando: `.\venv\Scripts\uvicorn app.main:app --reload`.
  4. **Postman** aberto com a coleção `DevShowcase_API.postman_collection.json` importada e a aba de **Console** do Postman visível no rodapé.
  5. *(Opcional, diferencial positivo)*: Navegador na URL `http://127.0.0.1:8000/docs` (Swagger UI).
- [ ] **Duração alvo**: Entre **5 e 7 minutos** (limite máximo de 8 minutos).

---

## ⏱️ Cronograma Minuto a Minuto

### 🕒 [0:00 - 0:45] Introdução e Apresentação Pessoal com Webcam
> ⚠️ **Obrigatório**: Você deve aparecer na webcam falando seu nome completo!

* **Ação na tela**: Mostre sua webcam (pode ser tela cheia ou câmera no canto com o VS Code ao fundo).
* **O que falar**:
  > *"Olá, professor(a) e avaliadores! Meu nome é **Guilherme Barbosa**. Estou apresentando a primeira etapa do projeto prático da disciplina: a **DevShowcase API** — uma plataforma backend para portfólio e catálogo de desenvolvedores, projetos, tecnologias e opiniões. O foco desta entrega é a fundação arquitetural, a modelagem de domínio com persistência de dados relacional e a disponibilização de endpoints RESTful com validações estritas de DTO."*

---

### 🕒 [0:45 - 2:00] Arquitetura e Modelagem do Banco Relacional no VS Code
* **Ação na tela**: Compartilhe a tela cheia mostrando o VS Code.
* **O que mostrar no código**:
  1. Abra a pasta `app/models/` e destaque as **4 entidades**:
     - `Profile` (`profile.py`): Perfil do desenvolvedor.
     - `Project` (`project.py`): Projeto publicado.
     - `Technology` (`technology.py`): Tecnologias/ferramentas.
     - `Feedback` (`feedback.py`): Avaliações e notas (1 a 5).
  2. Mostre o mapeamento dos relacionamentos exigidos:
     - **Profile 1 : N Project**: `projects = relationship("Project", back_populates="profile")`.
     - **Project N : N Technology**: Tabela associativa `project_technologies` em `associations.py` ligando as chaves estrangeiras.
     - **Project 1 : N Feedback**: `feedbacks = relationship("Feedback", back_populates="project")`.
  3. Abra rapidamente a pasta `app/schemas/` para mostrar os **DTOs com validações**:
     - Validação de campos não vazios (`validate_not_blank`).
     - Validação de URLs (`github_url`, `repository_url`, `live_url`).
     - Validação de e-mail e notas de 1 a 5 (`rating`).
  4. Mostre a pasta `app/repositories/` destacando o padrão **Repository** para desacoplar as regras do acesso ao banco de dados SQLite.

---

### 🕒 [2:00 - 5:30] Demonstração Prática no Postman (O Foco Principal)
> ⚠️ **Obrigatório**: O professor exige mostrar a requisição sendo executada e a resposta da API no console!
> 💡 *Dica*: Abra o **Console do Postman** (canto inferior esquerdo: `Console`) para que fique visível a requisição e os testes passando em verde.

Execute as pastas da coleção nesta ordem:

#### 1. Módulo de Perfis (`1 - Profiles`)
1. **POST /api/profiles** (Cadastrar Perfil):
   - Mostre o JSON com nome, email, bio e links do GitHub/LinkedIn.
   - Clique em **Send**.
   - Mostre o retorno **Status 201 Created**, com o `id` gerado (ex: `1`) e os testes passando.
2. **GET /api/profiles/1** (Buscar Perfil por ID):
   - Clique em **Send**.
   - Destaque o retorno **Status 200 OK** contendo os dados do desenvolvedor e o array `projects` (que começa vazio ou com projetos relacionados).

#### 2. Módulo de Tecnologias (`2 - Technologies`)
3. **POST /api/technologies** (Cadastrar Tecnologia):
   - Exemplo com `{"name": "FastAPI", "category": "Backend"}`.
   - Clique em **Send** -> **Status 201 Created**.
   - Cadastre uma segunda (ex: `{"name": "React", "category": "Frontend"}`).
4. **GET /api/technologies** (Listar Tecnologias):
   - Clique em **Send** -> **Status 200 OK**, mostrando o array com todas as tecnologias cadastradas.

#### 3. Módulo de Projetos com Relacionamento 1:N e N:N (`3 - Projects`)
5. **POST /api/projects** (Cadastrar Projeto Relacionado):
   - Mostre o payload:
     - `profile_id: 1` (Relacionamento 1 : N com o autor).
     - `technology_ids: [1, 2]` (Relacionamento N : N com tecnologias).
   - Clique em **Send** -> **Status 201 Created**.
   - Destaque no JSON retornado que a API já devolve o objeto do autor (`profile`) e o array com as tecnologias vinculadas (`technologies`).
6. **GET /api/projects** (Listagem de Projetos):
   - Clique em **Send** -> **Status 200 OK**, exibindo a listagem completa.
7. **GET /api/profiles/1** (Volte ao perfil para demonstrar o 1 : N):
   - Execute a busca novamente e mostre que o projeto recém-criado agora aparece listado dentro do perfil!

#### 4. Módulo de Feedbacks / Opiniões (`4 - Feedbacks`)
8. **POST /api/feedbacks** (Cadastrar Feedback):
   - Envie um feedback com autor, comentário, nota 5 e `project_id: 1`.
   - Clique em **Send** -> **Status 201 Created**.
9. **GET /api/feedbacks/project/1** (Listar Feedbacks do Projeto):
   - Clique em **Send** -> **Status 200 OK**, mostrando as avaliações vinculadas ao projeto (1 : N).

---

### 🕒 [5:30 - 6:45] Demonstração de Validações e Tratamento de Erros
> 💡 *Isso demonstra rigor técnico e garante nota máxima!*

Abra a pasta `5 - Casos de Validação e Erro`:
1. **Validação de URL Inválida**:
   - Tente enviar `"github_url": "link-sem-protocolo"`.
   - Execute -> Mostre o retorno **422 Unprocessable Entity** com a mensagem clara do Pydantic.
2. **Validação de E-mail Duplicado**:
   - Tente cadastrar o mesmo e-mail novamente.
   - Execute -> Mostre o retorno **400 Bad Request** com `"Já existe um perfil cadastrado com este e-mail"`.
3. **Integridade Referencial (Perfil Inexistente)**:
   - Tente criar um projeto com `profile_id: 99999`.
   - Execute -> Mostre o retorno **404 Not Found** ("Perfil não encontrado").
4. **Validação de Nota (Rating fora de 1 a 5)**:
   - Tente enviar feedback com `rating: 10`.
   - Execute -> Mostre o retorno **422** rejeitando a nota.

---

### 🕒 [6:45 - 7:30] Testes Automatizados no Terminal e Encerramento
1. **No terminal do VS Code**:
   - Execute: `.\venv\Scripts\pytest -v`
   - Mostre todos os testes passando em verde:
     - `test_profiles.py` PASSED
     - `test_technologies.py` PASSED
     - `test_projects.py` PASSED
     - `test_feedbacks.py` PASSED
2. **Conclusão**:
   - *(Falando para a câmera)*:
   > *"Como pudemos ver, todos os requisitos técnicos foram plenamente atendidos: repositório estruturado, modelagem das entidades Profile, Project, Technology e Feedback com relacionamentos 1:N, N:N e 1:N, persistência relacional, DTOs com validações completas e endpoints testados via Postman e suíte automatizada Pytest. O código está publicado no repositório público do GitHub conforme solicitado. Muito obrigado pela atenção!"*
