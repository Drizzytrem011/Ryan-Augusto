# Changelog HUSH - Quiet Luxury (Versão Final)

## Mudanças Críticas (Design & Identidade)
- **Logo Oficial**: Implementação da logo (`logo.png`) no Header, Footer e Checkout.
- **Tipografia**: Aplicação rigorosa da fonte **Brasika** (Uppercase) para o nome da marca em texto.
- **Remoções**: 
  - Removida qualquer menção a "Garantia de 12 meses".
  - Removida pergunta sobre "Cancelamento de Ruído" no FAQ.

## Localização e Copy
- Tradução integral para **Português (PT-BR)**.
- Tom de voz ajustado para "Quiet Luxury" (Silencioso, direto, premium).
- Descrições de produtos atualizadas para focar em tecido, corte e modelagem.

## Reestruturação de Layout (Conversão Otimizada)
1. **Hero**: Foco visual e CTA claro.
2. **Produtos**: Movidos para logo abaixo do Hero (prioridade de venda).
3. **Trust Bar**: Benefícios claros de compra.
4. **Manifesto**: História da marca.
5. **Depoimentos**: Nova seção adicionada para prova social.
6. **FAQ**: Dúvidas técnicas e logísticas.
7. **Footer**: Links legais e reforço de marca.

## Checkout (High Trust)
- **Visual**: Fundo escuro com efeito glass, logo no topo.
- **Funcionalidades**:
  - Campo de CEP com cálculo de frete simulado.
  - Resumo financeiro detalhado (Subtotal + Frete = Total).
  - Informação de parcelamento (3x sem juros).
  - Badges de segurança (SSL, Visa, Master, Pix).
  - Persistência de dados (LocalStorage).

## SEO e Técnica
- `lang="pt-BR"`.
- JSON-LD implementado para Produtos e Organização.
- Meta tags e Open Graph atualizados.
- Otimização de imagens com lazy loading.

---

## Como Fazer Build e Deploy

### 1. Pré-requisitos
Certifique-se de que os arquivos de asset estão na pasta `/public`:
- `/public/logo.png`
- `/public/fonts/Brasika.woff2`

### 2. Comandos
```bash
# Instalar dependências
npm install

# Testar localmente
npm run dev

# Gerar versão de produção
npm run build

# Testar versão de produção
npm run preview
```
