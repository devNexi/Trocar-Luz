import { db, articlesTable } from "@workspace/db";

const articles = [
  {
    slug: "o-que-e-geracao-distribuida",
    title: "O que é Geração Distribuída? Guia completo para residências",
    metaDescription: "Entenda o que é geração distribuída, como funciona o sistema de compensação de energia, quem pode aderir e quanto você pode economizar.",
    content: `# O que é Geração Distribuída?

A Geração Distribuída (GD) é um modelo de produção de energia elétrica descentralizado: em vez de grandes usinas centralizadas, a energia é gerada próximo ao ponto de consumo ou em fazendas solares compartilhadas.

No contexto residencial, a GD mais comum é a **solar fotovoltaica compartilhada** — onde você assina uma cota de energia de uma fazenda solar e recebe os créditos diretamente na sua conta de luz.

## Como funciona o sistema de compensação

O Brasil usa o **Sistema de Compensação de Energia Elétrica (SCEE)**, regulamentado pela ANEEL. Funciona assim:

1. A fazenda solar parceira gera energia e injeta na rede da distribuidora
2. Essa energia é creditada na sua conta como desconto
3. Você paga menos pela energia que consome da distribuidora

**Você não troca de distribuidora.** Continua conectado à mesma rede, com o mesmo atendimento em caso de falta de luz. O que muda é o desconto que você recebe.

## Quem pode aderir à GD

Qualquer consumidor residencial ou empresarial conectado à rede de distribuição pode aderir, desde que:

- Haja um parceiro de GD com cotas disponíveis na sua distribuidora
- Sua conta de luz seja suficiente para justificar a adesão (tipicamente acima de R$100/mês)

## Quanto você pode economizar

Os descontos variam por estado e distribuidora, mas a faixa típica é:

- **Sul e Sudeste:** 13% a 30%
- **Centro-Oeste:** 13% a 27%
- **Nordeste:** 11% a 25%
- **Norte:** 10% a 22%

Para uma conta de R$400/mês, o desconto pode representar entre R$44 e R$120 por mês — ou entre R$528 e R$1.440 por ano.

## Qual é o custo para aderir

Nenhum. A TrocarLuz não cobra nada do consumidor. O modelo funciona assim: a fazenda solar vende a energia com desconto em relação à tarifa da distribuidora — e nós garantimos que você acessa o melhor desconto disponível para sua região.

## Próximos passos

Use nossa calculadora gratuita para ver a estimativa de desconto disponível na sua região.`,
    excerpt: "Entenda o que é geração distribuída, como funciona o sistema de compensação de energia e quanto você pode economizar sem instalar nada.",
    category: "geracao-distribuida",
    keywords: ["geração distribuída", "GD", "energia solar", "desconto conta de luz", "SCEE"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-01-10"),
  },
  {
    slug: "como-funciona-conta-de-luz-brasil",
    title: "Como funciona a conta de luz no Brasil: tarifas, bandeiras e encargos",
    metaDescription: "Entenda todos os componentes da conta de luz: tarifa de energia, encargos, bandeiras tarifárias, e por que sua conta varia de mês para mês.",
    content: `# Como funciona a conta de luz no Brasil

A conta de luz brasileira é uma das mais complexas do mundo. Entender cada componente é o primeiro passo para saber onde é possível economizar.

## Componentes principais

### Energia consumida (kWh)
O valor principal é calculado pelo consumo em quilowatts-hora (kWh) multiplicado pela tarifa da distribuidora. A tarifa varia por distribuidora, estado e categoria (residencial, comercial, industrial).

### Bandeiras tarifárias
O Brasil usa um sistema de bandeiras que reflete as condições dos reservatórios das hidrelétricas:

- **Verde:** situação favorável, sem cobrança adicional
- **Amarela:** atenção, cobrança de R$1,885 por 100 kWh
- **Vermelha patamar 1:** cobrança de R$3,971 por 100 kWh
- **Vermelha patamar 2:** cobrança de R$9,492 por 100 kWh

### Impostos e encargos
Além do consumo, você paga:
- **ICMS:** entre 12% e 29%, dependendo do estado
- **PIS/COFINS:** cerca de 3,65%
- **CIP (Iluminação Pública):** valor fixo por município
- **Taxa de disponibilidade:** cobrada mesmo sem consumo

## Por que a conta aumentou depois de comprar um carro elétrico

O carregamento doméstico de um veículo elétrico adiciona entre 200 kWh e 600 kWh por mês, dependendo do modelo e da frequência de uso. Isso pode representar um aumento de R$100 a R$350 na conta.

A boa notícia: a **geração distribuída** pode compensar esse aumento com descontos de 13% a 30% sobre o valor total da conta.

## Como reduzir sua conta de luz

1. **Geração Distribuída (GD):** desconto de 13%–30%, sem obra, sem investimento
2. **Eficiência energética:** troca de lâmpadas, aparelhos com selo Procel A
3. **Horários de menor tarifa:** se você tiver tarifa branca, use aparelhos fora do horário de ponta

A GD é a opção com maior impacto e menor fricção para a maioria dos consumidores residenciais.`,
    excerpt: "Entenda tarifas, bandeiras, encargos e impostos da conta de luz — e onde é possível economizar de forma simples e sem obras.",
    category: "educacao-energia",
    keywords: ["conta de luz", "tarifa de energia", "bandeira tarifária", "encargos", "ICMS energia"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-01-15"),
  },
  {
    slug: "geracao-distribuida-vs-painel-solar",
    title: "Geração Distribuída vs Painel Solar: qual é melhor para você?",
    metaDescription: "Compare geração distribuída compartilhada e instalação de painéis solares no telhado. Veja qual opção faz mais sentido para sua situação.",
    content: `# GD Compartilhada vs Painel Solar no Telhado

Duas formas de usar energia solar — mas com características muito diferentes. Qual é a melhor para você?

## Geração Distribuída Compartilhada (GDC)

**Como funciona:** você assina uma cota de uma fazenda solar e recebe créditos na conta.

**Vantagens:**
- Zero investimento inicial
- Sem obras ou instalação
- Funciona para apartamentos, imóveis alugados
- Sem manutenção
- Desconto imediato na conta

**Desvantagens:**
- Desconto menor (13%–30%) que o payback de painéis instalados
- Depende da disponibilidade de parceiros na sua região

**Ideal para:** moradores de apartamento, locatários, proprietários que não querem investir upfront.

---

## Painel Solar no Telhado (GD Local)

**Como funciona:** você instala painéis no telhado e gera energia para uso próprio.

**Vantagens:**
- Maior autonomia energética
- Payback de 4–7 anos, depois "energia de graça"
- Pode zerar a conta (com armazenamento em bateria)

**Desvantagens:**
- Investimento inicial de R$15.000 a R$60.000+
- Requer telhado próprio e estrutural adequado
- Manutenção periódica
- Processo de instalação e conexão (90–180 dias)

**Ideal para:** proprietários de casas com telhado grande, que podem investir e querem benefício de longo prazo.

---

## Comparativo rápido

| | GD Compartilhada | Painel no Telhado |
|---|---|---|
| Investimento inicial | R$ 0 | R$15k–R$60k+ |
| Desconto imediato | Sim | Sim |
| Obra | Não | Sim (2–4 semanas) |
| Funciona em apartamento | Sim | Geralmente não |
| Desconto mensal | 13%–30% | 50%–100% |

## Conclusão

Para quem não quer ou não pode investir, a **geração distribuída compartilhada** é a escolha certa. Para proprietários com capital disponível, o painel no telhado tem melhor retorno no longo prazo — mas a GD compartilhada pode ser o primeiro passo enquanto você planeja a instalação.

Use nossa calculadora para ver o desconto disponível por GD na sua região.`,
    excerpt: "Descubra as diferenças entre geração distribuída compartilhada e painéis solares no telhado — e qual faz mais sentido para o seu perfil.",
    category: "geracao-distribuida",
    keywords: ["geração distribuída", "painel solar", "energia solar telhado", "GD compartilhada", "comparação"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-01-20"),
  },
  {
    slug: "mercado-livre-energia-residencial-2027",
    title: "Mercado Livre de Energia para residências: o que muda a partir de dezembro de 2027",
    metaDescription: "A partir de dezembro de 2027, consumidores residenciais poderão escolher seu fornecedor de energia. Entenda o que muda, quem pode participar e como se preparar.",
    content: `# Mercado Livre de Energia para residências: dezembro de 2027

A reforma do setor elétrico brasileiro vai abrir o Mercado Livre de Energia (MLE) para consumidores residenciais — mas de forma gradual e regulamentada.

## O cronograma

- **Dezembro de 2027:** abertura para consumidores residenciais com consumo acima de determinado limite
- **2028 em diante:** ampliação progressiva do acesso

**Importante:** a data exata e os critérios finais ainda dependem de regulamentação pela ANEEL. O que está definido é a direção — e que será obrigatório operar através de um broker certificado.

## Como vai funcionar

No MLE, você poderá comprar energia de fornecedores além da distribuidora local. A concorrência tende a reduzir preços e criar novas opções de contratos (energia solar, eólica, garantias de preço fixo, etc.).

Você **continua conectado à rede da distribuidora** — ela cuida da transmissão e distribuição (fios, postes, medição). O que muda é quem vende a energia que percorre esses fios.

## O papel do broker

Para participar do MLE, consumidores residenciais precisarão de um **broker certificado pela CCEE** (Câmara de Comercialização de Energia Elétrica). O broker:

1. Analisa seu perfil de consumo
2. Negocia contratos com fornecedores
3. Garante conformidade regulatória
4. Gerencia a migração e o pós-migração

A TrocarLuz é broker certificado e já está cadastrando consumidores interessados para as primeiras migrações de 2027.

## Vale a pena esperar pelo MLE ou aderir à GD agora?

Não vale a pena esperar. A geração distribuída está disponível agora, com descontos imediatos de 13%–30% na sua conta. Quem adere à GD hoje economiza durante todo o período até 2027 — e quando o MLE abrir, poderemos analisar a melhor opção para o seu perfil naquele momento.

## Como se cadastrar para o MLE residencial

Deixe seus dados em nosso cadastro e avisaremos assim que as condições estiverem definidas e as migrações abertas.`,
    excerpt: "A partir de dezembro de 2027, residências poderão escolher seu fornecedor de energia. Entenda o que muda, o papel do broker e como se preparar.",
    category: "mercado-livre",
    keywords: ["mercado livre energia residencial", "MLE 2027", "abertura mercado livre", "broker energia", "CCEE"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-02-01"),
  },
  {
    slug: "carro-eletrico-conta-de-luz-como-economizar",
    title: "Carro elétrico aumentou sua conta de luz? Como economizar com GD",
    metaDescription: "Comprou um carro elétrico e a conta de luz subiu? Veja como a geração distribuída pode compensar o custo do carregamento — sem obras e sem investimento.",
    content: `# Carro elétrico aumentou sua conta? Como economizar com GD

Comprar um carro elétrico é uma ótima decisão: menos emissões, custo de combustível menor e manutenção mais barata. Mas tem um efeito colateral que pega muitas pessoas de surpresa: **a conta de luz sobe**.

## Quanto custa carregar um carro elétrico em casa

O custo depende do modelo e da tarifa da distribuidora, mas a faixa é:

| Modelo | Bateria | Custo mensal estimado (1.000 km) |
|--------|---------|----------------------------------|
| Carros pequenos | 30–50 kWh | R$80–R$150 |
| Sedãs médios | 60–80 kWh | R$150–R$220 |
| SUVs e picapes | 80–130 kWh | R$220–R$350 |

Esses valores assumem tarifa residencial de R$0,80–R$0,95/kWh, que é a faixa mais comum no Brasil em 2025.

## A solução: Geração Distribuída

A GD oferece desconto de 13%–30% sobre o valor total da conta de luz. Para quem tem carro elétrico, isso pode:

1. **Compensar parcialmente** o aumento (para contas que subiram R$100–R$150)
2. **Compensar totalmente** o aumento (para contas que subiram até R$220, dependendo do estado)
3. **Reduzir a conta abaixo do valor original** (em estados com maior desconto e quem usa menos o carro)

### Exemplo prático (São Paulo)

- Conta antes do carro elétrico: R$300/mês
- Aumento pelo carregamento: R$180/mês
- Nova conta: R$480/mês
- Desconto GD em SP (20% médio): R$96/mês
- Conta final: R$384/mês — R$96 a menos que sem GD

## Por que a GD é ideal para donos de EV

1. **Sem investimento:** não há custo para aderir, ao contrário de painéis solares
2. **Funciona imediatamente:** em 30–60 dias após a adesão
3. **Funciona em apartamentos:** não precisa de telhado
4. **Escala com seu consumo:** quanto mais você carrega, maior o benefício absoluto

## Como saber se a GD compensa para você

Use nossa calculadora gratuita. Você informa seu estado e o valor atual da conta (já com o carro elétrico) e vemos a estimativa de economia disponível na sua região.`,
    excerpt: "Carro elétrico aumentou sua conta de luz? Veja como a geração distribuída pode compensar o custo do carregamento, sem obras e sem investimento inicial.",
    category: "carro-eletrico",
    keywords: ["carro elétrico conta de luz", "EV conta energia", "carregar carro elétrico custo", "geração distribuída carro elétrico"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-02-10"),
  },
  {
    slug: "geracao-distribuida-por-estado",
    title: "Geração Distribuída por estado: onde tem mais desconto no Brasil",
    metaDescription: "Veja a situação da geração distribuída em cada estado brasileiro — descontos disponíveis, distribuidoras e disponibilidade de parceiros.",
    content: `# Geração Distribuída por estado no Brasil

Os descontos de geração distribuída variam por estado porque as **tarifas das distribuidoras** são diferentes — e é sobre elas que o desconto é aplicado.

## Estados com maior potencial de economia

### São Paulo
- Distribuidoras: Enel SP, CPFL Paulista, CPFL Piratininga, EDP SP
- Desconto típico: 15%–30%
- Disponibilidade: alta

### Minas Gerais
- Distribuidoras: Cemig, ENERGISA MG
- Desconto típico: 15%–30%
- Disponibilidade: alta

### Rio de Janeiro
- Distribuidoras: Light, Enel RJ
- Desconto típico: 14%–28%
- Disponibilidade: alta

### Rio Grande do Sul
- Distribuidoras: RGE, CEEE-D (Equatorial RS)
- Desconto típico: 13%–27%
- Disponibilidade: alta

### Paraná
- Distribuidoras: Copel
- Desconto típico: 14%–28%
- Disponibilidade: alta

### Santa Catarina
- Distribuidoras: Celesc
- Desconto típico: 13%–27%
- Disponibilidade: média

## Nordeste: bom potencial, parceiros em expansão

Os estados do Nordeste têm tarifas elevadas (especialmente Maranhão, Piauí e Alagoas), mas a disponibilidade de parceiros de GD ainda é menor. Descontos típicos de 11%–25%.

## Norte: atenção especial

Amazonas e Pará têm tarifas muito altas, mas a infraestrutura de GD é limitada. Estamos expandindo a cobertura de parceiros nessa região.

## Como verificar a situação no seu estado

Nossa calculadora usa os dados de cada estado e distribuidora para gerar uma estimativa personalizada. Se não houver parceiro disponível na sua região ainda, colocamos você na lista de espera e avisamos quando tiver.`,
    excerpt: "Veja quais estados têm maior desconto em geração distribuída, as principais distribuidoras e onde há mais disponibilidade de parceiros.",
    category: "geracao-distribuida",
    keywords: ["geração distribuída por estado", "GD São Paulo", "GD Minas Gerais", "desconto conta de luz estado"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-02-15"),
  },
  {
    slug: "lgpd-energia-seus-direitos",
    title: "LGPD e energia: seus direitos ao contratar GD ou Mercado Livre",
    metaDescription: "O que a Lei Geral de Proteção de Dados (LGPD) garante para você ao contratar geração distribuída ou migrar para o mercado livre de energia.",
    content: `# LGPD e energia: seus direitos ao contratar GD ou Mercado Livre

Quando você contrata geração distribuída ou migra para o mercado livre de energia, compartilha dados pessoais com brokers, parceiros e distribuidoras. A LGPD (Lei nº 13.709/2018) garante seus direitos nesse processo.

## Quais dados são coletados

Ao usar a TrocarLuz ou contratar GD, os dados típicos coletados são:

- **Dados de identificação:** nome, CPF, telefone, e-mail
- **Dados de consumo:** histórico de fatura, consumo médio em kWh
- **Conta de luz:** PDF ou imagem da fatura (dados sensíveis para análise)
- **Localização:** CEP, estado, distribuidora

## Seus direitos pela LGPD

A LGPD garante que você pode:

1. **Saber o que foi coletado:** solicitar acesso completo aos seus dados
2. **Corrigir dados incorretos:** atualizar informações desatualizadas ou erradas
3. **Eliminar seus dados:** pedir a exclusão, exceto quando há obrigação legal de retenção
4. **Revogar o consentimento:** cancelar qualquer uso dos seus dados para fins não obrigatórios
5. **Portabilidade:** levar seus dados para outro prestador de serviço

## O que NÃO pode acontecer

- Seus dados não podem ser vendidos a terceiros sem consentimento explícito
- A conta de luz não pode ser compartilhada sem sua autorização
- Não podem usar seus dados para marketing não solicitado sem opt-in

## Consentimentos que a TrocarLuz pede (e por quê)

Ao enviar sua conta pela TrocarLuz, pedimos três consentimentos:

1. **WhatsApp:** para enviar sua análise e proposta
2. **Compartilhamento com parceiro:** para gerar uma proposta de GD
3. **LGPD geral:** para o tratamento dos dados conforme nossa política de privacidade

Todos são revogáveis a qualquer momento. Entre em contato em privacidade@trocarluz.com.br.

## Como exercer seus direitos

Envie um e-mail para **privacidade@trocarluz.com.br** ou acesse nossa Política de Privacidade completa. Respondemos em até 15 dias úteis, conforme exigido pela ANPD.`,
    excerpt: "Entenda seus direitos pela LGPD ao contratar geração distribuída ou migrar para o mercado livre de energia — e como exercê-los.",
    category: "regulatorio",
    keywords: ["LGPD energia", "proteção de dados energia", "direitos consumidor GD", "privacidade conta de luz"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-03-01"),
  },
  {
    slug: "passo-a-passo-adesao-gd",
    title: "Passo a passo: como aderir à geração distribuída em 2025",
    metaDescription: "Guia completo para aderir à geração distribuída: do primeiro acesso ao desconto na conta. Quanto tempo leva, o que precisar e como funciona.",
    content: `# Passo a passo: como aderir à geração distribuída

Aderir à GD é mais simples do que parece. Veja o processo completo.

## Etapa 1: Verificar elegibilidade (5 minutos)

Use a calculadora da TrocarLuz para verificar se há parceiros disponíveis na sua distribuidora e qual o desconto estimado para sua região.

**O que você precisa:** seu estado, distribuidora (opcional) e o valor médio da conta.

---

## Etapa 2: Enviar a conta de luz (5 minutos)

Envie uma foto ou PDF da sua conta de luz mais recente. Isso permite:

- Verificar sua distribuidora com precisão
- Confirmar o consumo médio em kWh
- Gerar uma proposta personalizada com desconto real (não estimado)

**Seus dados são protegidos** e nunca compartilhados sem seu consentimento expresso.

---

## Etapa 3: Receber a proposta pelo WhatsApp (2–5 dias úteis)

Nossa equipe analisa sua conta, confirma a disponibilidade do parceiro na sua região e envia uma proposta pelo WhatsApp com:

- Percentual de desconto garantido
- Economia mensal estimada
- Prazo de contrato (geralmente 12–36 meses)
- Cláusula de fidelidade e condições de saída

---

## Etapa 4: Assinar o contrato (10 minutos)

Se você aceitar a proposta, o contrato é assinado digitalmente. Nenhuma papel, nenhum deslocamento.

---

## Etapa 5: Ativação pela distribuidora (30–90 dias)

Após a assinatura, o parceiro de GD protocola o pedido junto à distribuidora. O prazo de ativação varia por distribuidora:

- **Enel, CPFL, Cemig:** 30–45 dias
- **Light, Coelba, Celpe:** 45–60 dias
- **Distribuidoras menores:** 60–90 dias

---

## Etapa 6: Desconto na conta (a partir do 2º ou 3º mês)

Após a ativação, os créditos aparecem na sua conta como "Energia Injetada" ou "Créditos de GD". O desconto é automático — você não precisa fazer nada.

## Quanto custa tudo isso?

**Zero.** A TrocarLuz não cobra nada do consumidor. Nossa receita vem dos parceiros de GD, que compensam pelo acesso a clientes qualificados.

## Perguntas frequentes

**Preciso avisar a distribuidora?** Não. O parceiro de GD cuida de toda a burocracia.

**Posso cancelar?** Sim, mas verifique a cláusula de fidelidade do contrato (geralmente 12 meses).

**E se mudar de endereço?** A GD é vinculada à unidade consumidora (número de instalação), não ao CPF. Em caso de mudança, avise o parceiro.`,
    excerpt: "Do primeiro acesso ao desconto na conta: guia passo a passo para aderir à geração distribuída em 2025, com prazos reais por distribuidora.",
    category: "geracao-distribuida",
    keywords: ["como aderir geração distribuída", "passo a passo GD", "prazo ativação GD", "contrato geração distribuída"],
    author: "Equipe TrocarLuz",
    published: true,
    publishedAt: new Date("2025-03-10"),
  },
];

async function seed() {
  let inserted = 0;
  for (const article of articles) {
    const existing = await db
      .select({ id: articlesTable.id })
      .from(articlesTable)
      .where(db.$count ? undefined : undefined)
      .limit(1);

    // Simple upsert by checking slug
    try {
      await db.insert(articlesTable).values({
        slug: article.slug,
        title: article.title,
        metaDescription: article.metaDescription,
        content: article.content,
        excerpt: article.excerpt,
        category: article.category,
        keywords: article.keywords,
        author: article.author,
        published: article.published,
        publishedAt: article.publishedAt,
      }).onConflictDoNothing();
      inserted++;
    } catch (err) {
      console.error(`Failed to insert ${article.slug}:`, err);
    }
  }
  console.log(`Seeded ${inserted} articles`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
