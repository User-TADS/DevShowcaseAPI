# 📦 Guia de Publicação no GitHub e Entrega do PDF

Este guia contém as instruções exatas para você publicar o código no GitHub, postar o vídeo no YouTube e gerar o **arquivo PDF de entrega** com os 2 links exigidos.

---

## 🚀 Passo 1: Publicar o Repositório no GitHub

O seu usuário do Git já está configurado na máquina como **`GuilhermeBarbosa556`** (`guilhermebarbosa556@gmail.com`).

1. Acesse o GitHub: [https://github.com/new](https://github.com/new)
2. Crie um novo repositório com as seguintes opções:
   - **Repository name**: `devshowcase-api`
   - **Description**: `DevShowcase API - Modelagem de domínio, persistência relacional e endpoints REST`
   - **Public**: Selecione **Public** (requisito: *"Repositório git público no GitHub"*).
   - **Não** marque a opção de adicionar README, .gitignore ou License (já criamos tudo isso localmente).
   - Clique em **Create repository**.
3. No terminal da pasta do projeto, execute os seguintes comandos:

```powershell
# 1. Inicializa o repositório git localmente nesta pasta
git init

# 2. Adiciona todos os arquivos do projeto (o .gitignore protegerá o venv e caches)
git add .

# 3. Faz o primeiro commit
git commit -m "feat: implementacao completa da DevShowcase API - Etapa 1"

# 4. Define a branch principal como main
git branch -M main

# 5. Vincula ao repositório que você criou no GitHub
git remote add origin https://github.com/GuilhermeBarbosa556/devshowcase-api.git

# 6. Envia o código para o GitHub
git push -u origin main
```

Após executar, seu repositório estará online em:
`https://github.com/GuilhermeBarbosa556/devshowcase-api`

---

## 🎥 Passo 2: Gravar e Postar o Vídeo no YouTube

1. Grave a apresentação seguindo o roteiro do arquivo [`ROTEIRO_APRESENTACAO.md`](ROTEIRO_APRESENTACAO.md) (duração entre 5 e 8 minutos).
2. Acesse o **YouTube Studio**: [https://studio.youtube.com/](https://studio.youtube.com/)
3. Clique em **Criar** -> **Enviar vídeos**.
4. Faça o upload do arquivo gravado.
5. Na etapa de **Visibilidade**:
   - Selecione a opção: **Não listado** (Unlisted).
   - *(Apenas quem possui o link conseguirá assistir, conforme exigido na regra da tarefa).*
6. Copie o link gerado (ex: `https://youtu.be/SEU_CODIGO_AQUI`).

---

## 📄 Passo 3: Criar o PDF de Entrega Final

A regra de entrega exige:
> *"Envie um arquivo PDF com 2 links:*
> *1. Link do repositório no GitHub contendo o código-fonte.*
> *2. Link do vídeo não listado no YouTube."*

Disponibilizamos o arquivo [`ENTREGA_FINAL.html`](ENTREGA_FINAL.html) já formatado e estilizado profissionalmente. Para gerar o PDF:

1. Abra o arquivo [`ENTREGA_FINAL.html`](ENTREGA_FINAL.html) em qualquer navegador (Google Chrome, Edge ou Firefox).
2. Substitua o link do YouTube pelo link real do seu vídeo gravado (ou altere no próprio arquivo antes de abrir).
3. Pressione `Ctrl + P` (Imprimir).
4. No campo **Destino / Impressora**, escolha **Salvar como PDF**.
5. Clique em **Salvar**.
6. Envie o PDF gerado no portal da faculdade/avaliação!
