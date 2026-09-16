# CRÓ arts & crafts — loja

Um site simples para a CRÓ: uma página pública mostrando o que foi feito, e uma
página privada em `/admin` onde sua mãe cadastra, edita e remove peças
sozinha — sem código, sem precisar mexer neste repositório de novo.

**Como funciona a compra:** não há checkout nem pagamento no site, de
propósito. Cada peça tem um botão "Comprar no WhatsApp" que abre uma
conversa já com uma mensagem pronta mencionando a peça. Sua mãe continua
combinando pagamento e entrega do jeito que já faz na feira.

## 1. Criar o banco de dados (Supabase — o plano gratuito é suficiente)

1. Acesse [supabase.com](https://supabase.com) e crie um projeto (qualquer
   nome/região).
2. Abra **SQL Editor > New query**, cole o conteúdo de `supabase/schema.sql`
   e rode. Isso cria a tabela `products` e um bucket de armazenamento
   público `product-images`, com regras para que qualquer pessoa possa
   *ver* os produtos, mas só um admin logado possa *editar*.
3. Vá em **Authentication > Users > Add user** e crie um login para sua mãe
   (e-mail dela + uma senha que ela escolher). Essa é a única conta — é o
   login do `/admin`. Não ative cadastro público; este site nunca precisa
   de mais de um admin.
4. Vá em **Project Settings > API** e copie a **Project URL** e a
   **anon public key**.

## 2. Configurar o site

```bash
cp .env.example .env
```

Preencha:
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` — do passo 1.4
- `VITE_INSTAGRAM_HANDLE` — já está como `cro.arts.crafts`
- `VITE_WHATSAPP_NUMBER` — **obrigatório**: sem isso, o botão "Comprar no
  WhatsApp" não aparece em nenhuma peça. Formato internacional, só
  números, sem `+` e sem espaços (ex.: `5511987654321`)
- `VITE_SITE_LOCATION` — opcional, ex.: `sua cidade, Brasil`

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` para a loja, e `/admin` para entrar e
cadastrar as primeiras peças (com fotos de verdade).

## 4. Publicar de verdade (Netlify ou Vercel — os dois funcionam)

**Netlify:**
1. Suba esta pasta para um repositório no GitHub.
2. No Netlify: New site from Git > escolha o repositório.
3. Build command: `npm run build`, publish directory: `dist`.
4. Adicione as mesmas variáveis de ambiente do seu `.env` em Site
   settings > Environment variables.
5. Publique. O Netlify já dá uma URL na hora; um domínio próprio pode ser
   adicionado depois, se quiser.

**Vercel:** mesma ideia — importe o repositório, framework preset "Vite",
adicione as variáveis de ambiente, publique.

## 5. Ligar o Instagram e o site um ao outro

- **Instagram → site:** o Instagram não permite link clicável na legenda
  de post, só no campo de link da bio. Abra o perfil no Instagram > Editar
  perfil > adicione a URL do site publicado no campo **Site**. É o único
  link clicável que o Instagram permite.
- **Site → Instagram:** já está ligado — o cabeçalho, o topo da página e o
  rodapé apontam para `instagram.com/cro.arts.crafts`.

## Sobre manter o catálogo "sincronizado" com o Instagram

Não existe um jeito gratuito e confiável de puxar automaticamente os posts
do Instagram para o site — isso exigiria a Graph API da Meta, conta
Business, revisão do app e um token que precisa ser renovado
periodicamente, o que dá muita manutenção para um catálogo deste tamanho.
A página `/admin` é a alternativa deliberada: toda vez que sua mãe postar
algo novo à venda no Instagram, ela também cadastra aqui (leva poucos
minutos — foto, nome, preço). Duas fontes mantidas manualmente em
sincronia é mais simples e confiável do que uma sincronização automática
frágil para um catálogo deste tamanho.

## Estrutura do projeto

```
src/
  components/   UI compartilhada (header, hero, cartão de produto, footer, logo)
  pages/        Storefront.jsx (pública), AdminLogin.jsx / AdminDashboard.jsx (privadas)
  lib/          useAuth.js (sessão), contact.js (link do WhatsApp)
  supabaseClient.js
supabase/schema.sql   rodar uma vez no SQL editor do Supabase
```
