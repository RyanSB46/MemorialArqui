
# 🧾 Sistema de Geração de Tabelas em PDF com Base em JSON

Este projeto tem como objetivo facilitar a geração de relatórios e tabelas customizadas em formato PDF a partir de dados inseridos via formulário. O fluxo é dividido entre front-end e back-end, permitindo controle, personalização e exportação eficiente de informações.

---

## 🚀 Visão Geral

O sistema segue o seguinte fluxo:

1. **Inserção de Dados via Formulário Web (Front-End)**
2. **Salvamento dos Dados em Arquivo `.json` no Servidor**
3. **Geração de Tabela Formatada a partir do JSON**
4. **Exportação Automática para PDF (Gerado pelo Back-End)**
5. **Visualização ou Download do PDF via Navegador**

---

## 📁 Estrutura do Projeto

```
/frontend
  └── React app para entrada de dados
/backend
  ├── Armazenamento do arquivo .json
  ├── Geração do PDF
  └── Rota para envio do PDF ao front-end
/output
  └── Relatórios gerados em .pdf e .json
```

---

## 🛠️ Funcionalidades

- ✅ Inserção dinâmica e personalizada de dados (títulos, colunas, linhas)
- ✅ Criação automática de arquivo `.json`
- ✅ Geração de tabela formatada em PDF
- ✅ Visualização do PDF em nova aba ou download direto
- ✅ Arquitetura modular: front separado do back

---

## 🧰 Tecnologias Utilizadas

### Front-End
- React.js
- Axios (para requisições)
- TailwindCSS (para estilização responsiva e centralizada)

### Back-End
- Node.js com Express
- `fs` para manipulação de arquivos
- `pdfkit` ou `puppeteer` para geração de PDF (a depender da implementação final)

---

## 📦 Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

**Back-End:**
```bash
cd backend
npm install
```

**Front-End:**
```bash
cd ../frontend
npm install
```

### 3. Execute os servidores

**Back-End:**
```bash
npm run dev
```

**Front-End:**
```bash
npm start
```

---

## 📤 Exportação de PDF

- Clique no botão "Exportar PDF" no front-end.
- A requisição será feita ao back-end.
- O PDF será gerado e aberto automaticamente em uma nova aba ou será baixado.

---

## 📄 Licença

Este projeto é de uso livre para fins de estudo, desenvolvimento e aprimoramento pessoal. Para uso comercial, recomenda-se ajustar a licença de acordo com a necessidade do autor.

---

## 👤 Autor

Desenvolvido por [Ryan Sena](https://github.com/seu-usuario)

---

## 🧠 Notas Finais

Este sistema é ideal para geração de memoriais descritivos, relatórios técnicos e documentos organizados a partir de dados estruturados.  
Possui foco em clareza visual, responsividade e automação do processo de exportação.

---
