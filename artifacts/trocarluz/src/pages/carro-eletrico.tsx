import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

const faqs = [
  {
    q: "Por que minha conta de luz subiu depois de comprar um carro elétrico?",
    a: "O carregamento doméstico de um carro elétrico pode adicionar entre R$80 e R$300 por mês à conta, dependendo do modelo do veículo, frequência de recarga e tarifa da distribuidora. Carros com baterias maiores (acima de 60 kWh) ou uso intenso (mais de 1.000 km/mês) têm impacto maior.",
  },
  {
    q: "A geração distribuída resolve o aumento da conta causado pelo carro elétrico?",
    a: "Sim, em muitos casos. A GD gera créditos de energia solar que são abatidos da sua conta. Se o desconto da GD for maior que o custo do carregamento do carro, sua conta pode ficar igual ou menor do que antes da compra.",
  },
  {
    q: "Preciso instalar painéis solares no telhado?",
    a: "Não. A geração distribuída compartilhada usa fazendas solares distantes. Você assina uma cota da fazenda e recebe os créditos na conta. Sem obras, sem instalação, sem investimento inicial.",
  },
  {
    q: "Quanto custa carregar um carro elétrico em casa por km?",
    a: "Em média, entre R$0,06 e R$0,12 por km, dependendo da tarifa da distribuidora. Compare: gasolina custa entre R$0,35 e R$0,55 por km. Mesmo com a conta mais alta, o custo total de mobilidade tende a ser menor.",
  },
  {
    q: "A TrocaLuz atende donos de carros elétricos em todo o Brasil?",
    a: "Sim, em todos os estados. A disponibilidade de parceiros de GD varia por região. Em áreas onde ainda não temos cobertura, colocamos você na lista de espera e avisamos quando houver opções.",
  },
];

export default function CarroEletrico() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <Layout>
      <SEOHead
        title="Carro elétrico deixou a conta de luz alta? Veja como reduzir — TrocaLuz"
        description="Comprou um carro elétrico e a conta de luz subiu? A geração distribuída pode compensar o aumento. Sem obras, sem instalação. Veja como."
        schema={schema}
      />

      {/* Hero */}
      <section
        className="py-20"
        style={{
          backgroundColor: "var(--env)",
          backgroundImage: "radial-gradient(rgba(26,36,16,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-block font-display font-bold text-sm mb-6"
                style={{ backgroundColor: "rgba(21,107,59,0.12)", border: "1px solid rgba(21,107,59,0.30)", color: "#156B3B", borderRadius: "8px", padding: "6px 16px" }}
              >
                Para donos de carro elétrico
              </div>
              <h1 className="font-display font-extrabold mb-5" style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1, color: "#1A2410" }}>
                Sua conta subiu depois do carro elétrico?
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "rgba(26,36,16,0.70)", lineHeight: 1.7, marginBottom: "32px" }}>
                A geração distribuída pode compensar o aumento — sem instalar nada, sem obras. Você continua conectado à mesma distribuidora, com desconto solar direto na conta.
              </p>
              <Link
                href="/comparar-desconto"
                style={{
                  display: "inline-block",
                  backgroundColor: "#00B86B",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "16px 32px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Ver desconto disponível →
              </Link>
            </div>
            <div className="hidden md:flex flex-col gap-4">
              {[
                { label: "Custo médio de carregamento", value: "R$80–R$300/mês" },
                { label: "Desconto típico GD residencial", value: "13%–30%" },
                { label: "Investimento para aderir à GD", value: "R$ 0" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{ backgroundColor: "rgba(26,36,16,0.06)", border: "1px solid rgba(26,36,16,0.12)", borderRadius: "12px", padding: "20px 28px" }}
                >
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(26,36,16,0.55)", marginBottom: "4px" }}>{s.label}</div>
                  <div className="font-display font-bold" style={{ fontSize: "24px", color: "#156B3B" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10 text-center" style={{ fontSize: "36px", color: "#1A1F36" }}>
            Como a GD compensa o custo do carro elétrico
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: "01",
                title: "Seu carro aumentou a conta",
                body: "O carregamento doméstico adiciona consumo real. Sua distribuidora cobra tarifa cheia por essa energia extra.",
              },
              {
                n: "02",
                title: "A GD gera créditos solares",
                body: "Você assina uma cota de uma fazenda solar. A energia gerada lá é creditada na sua conta como desconto — sem nenhuma obra.",
              },
              {
                n: "03",
                title: "Sua conta fica igual ou menor",
                body: "O desconto da GD (13%–30%) pode cobrir ou superar o aumento causado pelo carro. Você carrega de graça, na prática.",
              },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display font-extrabold mb-3" style={{ fontSize: "40px", color: "#6ABF4B", lineHeight: 1 }}>
                  {s.n}
                </div>
                <h3 className="font-display font-bold mb-2" style={{ fontSize: "18px", color: "#1A1F36" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important note */}
      <section className="py-12 bg-[#F7F7F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ backgroundColor: "#fff", border: "1px solid #E2E1DC", borderLeft: "4px solid #6ABF4B", borderRadius: "12px", padding: "24px 28px" }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#1A1F36", lineHeight: 1.7, margin: 0 }}>
              <strong>Importante:</strong> na geração distribuída, você <strong>não troca de distribuidora</strong>. Você continua conectado à mesma rede e recebe o mesmo atendimento em caso de falta de luz. O que muda é que parte da energia que você consome passa a ser creditada pela fazenda solar parceira.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10" style={{ fontSize: "32px", color: "#1A1F36" }}>
            Perguntas frequentes
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: "1px solid #E2E1DC", paddingBottom: "24px" }}>
                <h3 className="font-display font-semibold mb-3" style={{ fontSize: "18px", color: "#1A1F36" }}>{f.q}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-white mb-4" style={{ fontSize: "32px" }}>
            Veja quanto você pode economizar
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.70)", marginBottom: "32px", lineHeight: 1.7 }}>
            Estimativa gratuita. Sem compromisso. Sem custo.
          </p>
          <Link
            href="/comparar-desconto"
            style={{
              display: "inline-block",
              backgroundColor: "#00B86B",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              padding: "18px 48px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Ver desconto disponível →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
