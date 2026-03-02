# Curioni - protótipos de IA e navegação

Páginas disponíveis:
- `curioni-preview.html` (home)
- `produtos-detalhes.html` (PDP)
- `novidades.html` (conteúdo)
- `profissionais.html` (jornadas B2B)
- `biblioteca-tecnica.html` (downloads técnicos)
- `orcamento.html` (fluxo unificado de orçamento)
- `curioni-header-megamenu-moderno.html` (estudo de header/megamenu)

## Build para `/dist`

Este repositório agora gera uma pasta `dist/` pronta para deploy:

```bash
npm run build
```

O script copia arquivos estáticos do projeto para `dist/`.

## Deploy no Node.js do cPanel (como no seu print)

No painel **Node.js** do domínio:

1. **Raiz do aplicativo**: mantenha a raiz do projeto (onde estão `app.js` e `package.json`).
2. **Arquivo de inicialização**: configure como `app.js`.
3. Em **Executar comandos do Node.js**, rode:

```bash
npm install
npm run build
```

4. Clique em **Reiniciar aplicativo**.

### O que esse setup faz

- `app.js` sobe um servidor HTTP Node que entrega os arquivos de `dist/`.
- A URL `/` abre `curioni-preview.html` automaticamente.
- As demais páginas continuam acessíveis por URL direta (ex.: `/produtos-detalhes.html`).

## Teste local rápido

```bash
npm run build
npm start
```

Depois abra: `http://localhost:3000`.
