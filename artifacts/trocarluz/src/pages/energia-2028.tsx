import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";

const timeline = [
  {
    status: "Já aberto",
    date: "Desde 2019",
    color: "#6ABF4B",
    title: "Grupo A — Industrial e comercial de alta tensão",
    desc: "Empresas com alta demanda de energia já podem migrar para o mercado livre. A TrocaLuz já facilita essa migração.",
  },
  {
    status: "Em breve",
    date: "1º de agosto de 2026",
    color: "#FFD000",
    title: "Comercial e institucional de baixa tensão (B3)",
    desc: "Pequenas e médias empresas conectadas à rede de baixa tensão ganham acesso ao mercado livre. Se você tem um CNPJ, essa data pode ser a sua.",
  },
  {
    status: "Residencial — fase 1",
    date: "Dezembro de 2027",
    color: "#0A1628",
    title: "Início da abertura residencial",
    desc: "A lei brasileira (MP nº 1.300/2025) determina que a partir de dezembro de 2027, consumidores residenciais do Subgrupo B3 e pilotos residenciais iniciais poderão começar a migrar.",
  },
  {
    status: "Universalização",
    date: "2028",
    color: "#0A1628",
    title: "Universalização completa",
    desc: "Todos os consumidores residenciais do Subgrupo B1 (residencial padrão) e B2 (rural) terão acesso irrestrito ao mercado livre de energia.",
  },
];

export default function Energia2028() {
  return (
    <Layout>
      <SEOHead
        title="Mercado Livre Residencial: dezembro de 2027 — TrocaLuz"
        description="A abertura do mercado livre para residências começa em dezembro de 2027. Entenda o cronograma e por que você vai precisar de um broker certificado."
      />

      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1' }}>
            O mercado livre de energia está chegando para os lares brasileiros
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: '1.6' }}>
            E você vai precisar de um broker certificado para fazer a migração. Somos esse broker.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-12 text-center" style={{ fontSize: '36px', color: '#1A1F36' }}>
            Cronograma de abertura
          </h2>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} style={{ border: '1px solid #E2E1DC', borderLeft: `4px solid ${item.color}`, borderRadius: '16px', padding: '28px 32px' }}>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="shrink-0">
                    <span className="font-display font-bold text-xs px-3 py-1 rounded-full" style={{ backgroundColor: item.color, color: item.color === '#FFD000' ? '#0A1628' : '#fff' }}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold mb-1" style={{ fontSize: '13px', color: '#6B7080', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.date}
                    </div>
                    <h3 className="font-display font-bold mb-2" style={{ fontSize: '20px', color: '#1A1F36' }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.7' }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You can't do it alone */}
      <section className="py-20" style={{ backgroundColor: '#F7F7F5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: '36px', color: '#1A1F36' }}>
            Você não pode migrar sozinho — e isso é uma oportunidade
          </h2>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: '#4B5066', lineHeight: '1.8' }} className="space-y-4">
            <p>
              Ao contrário de consumidores industriais, os consumidores residenciais de baixa tensão não podem negociar diretamente na plataforma da CCEE. A lei exige que você seja representado por um <strong style={{ color: '#1A1F36' }}>comercializador varejista certificado e registrado na CCEE</strong>.
            </p>
            <p>
              Esse broker agrega o consumo de vários consumidores, negocia preços com os geradores em seu nome, e gerencia toda a transição — desde a notificação formal à sua distribuidora atual até a assinatura do contrato com o novo fornecedor.
            </p>
            <p>
              A TrocaLuz e a Ótima Energia são esse broker certificado. Não somos apenas uma plataforma de comparação — <strong style={{ color: '#1A1F36' }}>somos o veículo legal pelo qual você faz a migração.</strong>
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div style={{ backgroundColor: '#fff', border: '1px solid #E2E1DC', borderRadius: '16px', padding: '28px' }}>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: '20px', color: '#1A1F36' }}>O que muda na sua conta</h3>
              <p className="mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.7' }}>
                Após a migração, você continuará recebendo energia pela mesma rede física e pelos mesmos fios. O que muda é de quem você compra essa energia. Sua conta passará a ter dois componentes:
              </p>
              <div className="space-y-3">
                <div style={{ borderLeft: '3px solid #6B7080', paddingLeft: '12px' }}>
                  <strong style={{ color: '#1A1F36', fontSize: '14px' }}>Taxa de distribuição regulada</strong>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7080', marginTop: '2px' }}>Paga à distribuidora local pelo uso da rede física. Regulada pela ANEEL.</p>
                </div>
                <div style={{ borderLeft: '3px solid #00B86B', paddingLeft: '12px' }}>
                  <strong style={{ color: '#1A1F36', fontSize: '14px' }}>Custo de fornecimento de energia</strong>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7080', marginTop: '2px' }}>Pago ao novo fornecedor no mercado livre, negociado pelo seu broker. É aqui que a economia acontece.</p>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', border: '1px solid #E2E1DC', borderRadius: '16px', padding: '28px' }}>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: '20px', color: '#1A1F36' }}>Economize já enquanto aguarda</h3>
              <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.7' }}>
                Não espere dezembro de 2027 para parar de pagar caro. A Geração Distribuída já permite descontos de até 35% na sua conta de luz atual — disponível hoje, sem obras.
              </p>
              <LeadForm type="residential" sourcePage="energia-2028" />
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: '36px' }}>
            Entre na fila agora — antes que o mercado abra
          </h2>
          <p className="mb-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.7' }}>
            Quando o mercado abrir para residências em dezembro de 2027, a demanda vai explodir. Os consumidores que já estiverem cadastrados com um broker certificado terão prioridade na migração. Cadastre-se agora e nós cuidamos de tudo quando chegar a hora.
          </p>
          <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
            <LeadForm type="residential" sourcePage="energia-2027-waitlist" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
