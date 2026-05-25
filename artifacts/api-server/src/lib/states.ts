export interface State {
  slug: string;
  name: string;
  uf: string;
  region: string;
  distributor: string;
  avgTariffResidential: number | null;
  gdAvailable: boolean;
  aclAvailable2028: boolean;
  description: string | null;
}

export const brazilianStates: State[] = [
  { slug: "acre", name: "Acre", uf: "AC", region: "Norte", distributor: "Energisa Acre", avgTariffResidential: 0.78, gdAvailable: true, aclAvailable2028: true, description: "O Acre conta com a distribuidora Energisa Acre. A geração distribuída solar já está disponível e pode gerar economias significativas." },
  { slug: "alagoas", name: "Alagoas", uf: "AL", region: "Nordeste", distributor: "Equatorial Alagoas", avgTariffResidential: 0.82, gdAvailable: true, aclAvailable2028: true, description: "Alagoas tem alta irradiação solar, tornando a geração distribuída extremamente vantajosa para residências e empresas." },
  { slug: "amapa", name: "Amapá", uf: "AP", region: "Norte", distributor: "CEA Equatorial", avgTariffResidential: 0.71, gdAvailable: true, aclAvailable2028: true, description: "O Amapá tem potencial solar excelente e a geração distribuída pode reduzir significativamente os custos de energia." },
  { slug: "amazonas", name: "Amazonas", uf: "AM", region: "Norte", distributor: "Amazonas Energia", avgTariffResidential: 0.95, gdAvailable: true, aclAvailable2028: true, description: "O Amazonas possui uma das tarifas mais altas do Brasil, tornando a geração distribuída especialmente vantajosa." },
  { slug: "bahia", name: "Bahia", uf: "BA", region: "Nordeste", distributor: "Neoenergia Coelba", avgTariffResidential: 0.79, gdAvailable: true, aclAvailable2028: true, description: "A Bahia lidera a geração solar no Nordeste. Com alta irradiação e tarifas elevadas, o retorno do investimento em GD é excelente." },
  { slug: "ceara", name: "Ceará", uf: "CE", region: "Nordeste", distributor: "Enel Ceará", avgTariffResidential: 0.80, gdAvailable: true, aclAvailable2028: true, description: "O Ceará é um dos estados com maior potencial solar do Brasil. A geração distribuída é uma das melhores formas de reduzir custos." },
  { slug: "distrito-federal", name: "Distrito Federal", uf: "DF", region: "Centro-Oeste", distributor: "Neoenergia Brasília", avgTariffResidential: 0.76, gdAvailable: true, aclAvailable2028: true, description: "Brasília tem excelente irradiação solar e a Neoenergia distribui energia para toda a região. GD já está consolidada no DF." },
  { slug: "espirito-santo", name: "Espírito Santo", uf: "ES", region: "Sudeste", distributor: "EDP Espírito Santo", avgTariffResidential: 0.74, gdAvailable: true, aclAvailable2028: true, description: "O ES tem crescimento acelerado em geração distribuída, com boa irradiação e tarifas que tornam o investimento atrativo." },
  { slug: "goias", name: "Goiás", uf: "GO", region: "Centro-Oeste", distributor: "Equatorial Goiás", avgTariffResidential: 0.77, gdAvailable: true, aclAvailable2028: true, description: "Goiás é referência em energia solar no Centro-Oeste. Alta irradiação e incentivos estaduais tornam GD uma escolha inteligente." },
  { slug: "maranhao", name: "Maranhão", uf: "MA", region: "Nordeste", distributor: "Equatorial Maranhão", avgTariffResidential: 0.84, gdAvailable: true, aclAvailable2028: true, description: "O Maranhão tem uma das maiores tarifas do Nordeste, o que torna o retorno em geração distribuída especialmente rápido." },
  { slug: "mato-grosso", name: "Mato Grosso", uf: "MT", region: "Centro-Oeste", distributor: "Energisa Mato Grosso", avgTariffResidential: 0.75, gdAvailable: true, aclAvailable2028: true, description: "O MT tem potencial solar elevado e é um dos estados onde GD cresce mais rápido, com bom retorno sobre o investimento." },
  { slug: "mato-grosso-do-sul", name: "Mato Grosso do Sul", uf: "MS", region: "Centro-Oeste", distributor: "Energisa Mato Grosso do Sul", avgTariffResidential: 0.74, gdAvailable: true, aclAvailable2028: true, description: "O MS combina boa irradiação solar com tarifas que tornam a geração distribuída uma escolha financeiramente sólida." },
  { slug: "minas-gerais", name: "Minas Gerais", uf: "MG", region: "Sudeste", distributor: "CEMIG", avgTariffResidential: 0.72, gdAvailable: true, aclAvailable2028: true, description: "MG é o estado com mais instalações de GD no Brasil. A CEMIG tem bom processo de conexão e o clima favorece a geração solar." },
  { slug: "para", name: "Pará", uf: "PA", region: "Norte", distributor: "Equatorial Pará", avgTariffResidential: 0.81, gdAvailable: true, aclAvailable2028: true, description: "O Pará tem alta irradiação solar e a geração distribuída vem crescendo rapidamente como alternativa às tarifas elevadas." },
  { slug: "paraiba", name: "Paraíba", uf: "PB", region: "Nordeste", distributor: "Energisa Paraíba", avgTariffResidential: 0.79, gdAvailable: true, aclAvailable2028: true, description: "A Paraíba tem excelente irradiação solar no interior e litoral. A GD é uma das melhores formas de economizar na conta de luz." },
  { slug: "parana", name: "Paraná", uf: "PR", region: "Sul", distributor: "Copel", avgTariffResidential: 0.66, gdAvailable: true, aclAvailable2028: true, description: "O Paraná tem a Copel como distribuidora, com tarifas competitivas. GD é atrativa especialmente para empresas com alto consumo." },
  { slug: "pernambuco", name: "Pernambuco", uf: "PE", region: "Nordeste", distributor: "Neoenergia Pernambuco", avgTariffResidential: 0.81, gdAvailable: true, aclAvailable2028: true, description: "PE tem grande potencial solar no Agreste e Sertão. A geração distribuída cresce aceleradamente como solução para altas tarifas." },
  { slug: "piaui", name: "Piauí", uf: "PI", region: "Nordeste", distributor: "Equatorial Piauí", avgTariffResidential: 0.83, gdAvailable: true, aclAvailable2028: true, description: "O Piauí tem uma das maiores irradiações solares do Brasil. GD oferece retorno financeiro excelente frente às tarifas locais." },
  { slug: "rio-de-janeiro", name: "Rio de Janeiro", uf: "RJ", region: "Sudeste", distributor: "Light / Enel Rio", avgTariffResidential: 0.85, gdAvailable: true, aclAvailable2028: true, description: "O RJ tem tarifas entre as mais altas do Brasil. GD é uma forma eficaz de reduzir custos, especialmente em regiões com boa irradiação." },
  { slug: "rio-grande-do-norte", name: "Rio Grande do Norte", uf: "RN", region: "Nordeste", distributor: "Neoenergia Cosern", avgTariffResidential: 0.78, gdAvailable: true, aclAvailable2028: true, description: "O RN tem excelente potencial eólico e solar. A GD cresce rapidamente e é uma das melhores alternativas para economizar energia." },
  { slug: "rio-grande-do-sul", name: "Rio Grande do Sul", uf: "RS", region: "Sul", distributor: "RGE / CEEE-D", avgTariffResidential: 0.68, gdAvailable: true, aclAvailable2028: true, description: "O RS tem duas distribuidoras principais e bom potencial solar no verão. GD é atrativa para médios e grandes consumidores." },
  { slug: "rondonia", name: "Rondônia", uf: "RO", region: "Norte", distributor: "Energisa Rondônia", avgTariffResidential: 0.76, gdAvailable: true, aclAvailable2028: true, description: "Rondônia tem alta irradiação solar e a geração distribuída é uma alternativa crescente para reduzir custos de energia." },
  { slug: "roraima", name: "Roraima", uf: "RR", region: "Norte", distributor: "Roraima Energia", avgTariffResidential: 0.88, gdAvailable: true, aclAvailable2028: true, description: "Roraima tem uma das tarifas mais altas do país. A GD pode representar economias significativas para residências e empresas." },
  { slug: "santa-catarina", name: "Santa Catarina", uf: "SC", region: "Sul", distributor: "Celesc", avgTariffResidential: 0.64, gdAvailable: true, aclAvailable2028: true, description: "SC tem tarifas competitivas e a Celesc tem bom suporte para conexão de GD. O mercado solar cresce rapidamente no estado." },
  { slug: "sao-paulo", name: "São Paulo", uf: "SP", region: "Sudeste", distributor: "Enel SP / CPFL / Elektro", avgTariffResidential: 0.73, gdAvailable: true, aclAvailable2028: true, description: "SP tem o maior mercado de GD do Brasil, com múltiplas distribuidoras. O processo de conexão é bem estabelecido e o retorno é sólido." },
  { slug: "sergipe", name: "Sergipe", uf: "SE", region: "Nordeste", distributor: "Energisa Sergipe", avgTariffResidential: 0.79, gdAvailable: true, aclAvailable2028: true, description: "Sergipe tem boa irradiação solar e a GD é uma alternativa crescente frente às tarifas da distribuidora local." },
  { slug: "tocantins", name: "Tocantins", uf: "TO", region: "Norte", distributor: "Energisa Tocantins", avgTariffResidential: 0.77, gdAvailable: true, aclAvailable2028: true, description: "O Tocantins tem excelente potencial solar e a GD vem crescendo como solução para residências e agronegócio." },
];

export function getStateBySlug(slug: string): State | undefined {
  return brazilianStates.find((s) => s.slug === slug);
}
