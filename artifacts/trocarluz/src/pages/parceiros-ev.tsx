import { useState } from "react";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

export default function ParceirosEV() {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [segmento, setSegmento] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "business",
          nome,
          whatsapp: whatsapp.replace(/\D/g, ""),
          estado: "BR",
          empresa,
          segmento: `parceiro-ev:${segmento}`,
          pageSource: "parceiros-veiculos-eletricos",
        }),
      });
      if (!res.ok) throw new Error("Erro ao enviar. Tente novamente.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #D1D0CB",
    borderRadius: "8px",
    padding: "12px 16px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "#1A1F36",
    backgroundColor: "#fff",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1A1F36",
    marginBottom: "6px",
  };

  return (
    <Layout>
      <SEOHead
        title="Parceiros — Veículos Elétricos e Mobilidade — TrocarLuz"
        description="Seja parceiro da TrocarLuz. Para montadoras, concessionárias, instaladores de carregadores e marcas de mobilidade elétrica."
      />

      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block font-display font-bold text-sm mb-6"
            style={{ backgroundColor: "rgba(255,208,0,0.15)", border: "1px solid #FFD000", color: "#FFD000", borderRadius: "8px", padding: "6px 16px" }}
          >
            Para parceiros de mobilidade elétrica
          </div>
          <h1 className="font-display font-extrabold mb-5" style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1 }}>
            Seus clientes compram um EV.<br />A conta de luz sobe.<br />Nós resolvemos isso.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto 40px" }}>
            A TrocarLuz ajuda os compradores de carros elétricos a reduzirem a conta de luz com geração distribuída — sem obras, sem instalação. Uma parceria que aumenta a satisfação pós-venda e abre uma nova fonte de receita.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10 text-center" style={{ fontSize: "32px", color: "#1A1F36" }}>
            Por que fazer parceria com a TrocarLuz
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Supere a objeção da conta alta",
                body: "\"Mas minha conta vai subir\" é a principal objeção de compradores de EV. Com a TrocarLuz como parceira, você responde com uma solução concreta.",
              },
              {
                icon: "🤝",
                title: "Nova fonte de receita",
                body: "Modelos de parceria com comissão por cliente ativado. Cada comprador de EV que adere à GD gera receita para você.",
              },
              {
                icon: "📊",
                title: "Rastreamento por campanha",
                body: "Todo cliente que chega pela sua parceria é rastreado por código de parceiro. Relatório mensal de conversões e economia gerada.",
              },
            ].map((v) => (
              <div key={v.title} style={{ border: "1px solid #E2E1DC", borderRadius: "16px", padding: "32px" }}>
                <div style={{ fontSize: "36px", marginBottom: "16px" }}>{v.icon}</div>
                <h3 className="font-display font-bold mb-3" style={{ fontSize: "20px", color: "#1A1F36" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div style={{ backgroundColor: "#F7F7F5", border: "1px solid #E2E1DC", borderRadius: "16px", padding: "32px" }}>
              <h3 className="font-display font-bold mb-4" style={{ fontSize: "20px", color: "#1A1F36" }}>Segmentos que já procuram a gente</h3>
              <ul className="space-y-3">
                {[
                  "Montadoras e importadoras de EV (BYD, GWM, Volvo, Hyundai...)",
                  "Concessionárias e revendedoras",
                  "Instaladores de wallboxes e carregadores domésticos",
                  "Marcas de e-bikes e scooters elétricas",
                  "Aplicativos e plataformas de mobilidade",
                  "Seguradoras com carteira EV",
                ].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: "#00B86B", fontWeight: 700, marginTop: "2px" }}>✓</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#4B5066" }}>{i}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: "#0A1628", borderRadius: "16px", padding: "32px" }}>
              <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: "20px" }}>Como funciona a parceria</h3>
              <ol className="space-y-4">
                {[
                  "Você recebe um código de parceiro (ex: ?parceiro=BYD-SP)",
                  "Seus clientes acessam o comparador com o código",
                  "Fazemos a análise e ativação da GD",
                  "Você recebe relatório e comissão mensalmente",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div
                      className="font-display font-bold shrink-0"
                      style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#FFD000", color: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}
                    >
                      {i + 1}
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.80)", lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20" style={{ backgroundColor: "#F7F7F5" }}>
        <div className="max-w-lg mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold mb-3" style={{ fontSize: "32px", color: "#1A1F36" }}>
              Fale com nosso time de parcerias
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7080" }}>
              Entraremos em contato em até 1 dia útil.
            </p>
          </div>

          {sent ? (
            <div
              style={{ backgroundColor: "#E8F5EE", border: "1px solid #6ABF4B", borderRadius: "16px", padding: "40px", textAlign: "center" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: "24px", color: "#1A1F36" }}>Mensagem recebida!</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#4B5066" }}>
                Nossa equipe de parcerias entrará em contato pelo WhatsApp em breve.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="space-y-5">
                <div>
                  <label style={labelStyle}>Seu nome *</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required placeholder="Nome completo" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Empresa *</label>
                  <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} required placeholder="Nome da empresa" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Segmento *</label>
                  <select value={segmento} onChange={(e) => setSegmento(e.target.value)} required style={inputStyle}>
                    <option value="">Selecione</option>
                    <option value="montadora">Montadora / Importadora de EV</option>
                    <option value="concessionaria">Concessionária / Revendedora</option>
                    <option value="carregador">Instalador de Carregadores</option>
                    <option value="ebike">E-bike / Scooter Elétrica</option>
                    <option value="mobilidade">App / Plataforma de Mobilidade</option>
                    <option value="seguradora">Seguradora</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>WhatsApp com DDD *</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required placeholder="(11) 99999-9999" style={inputStyle} />
                </div>
                {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#dc2626" }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    backgroundColor: "#00B86B",
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Enviando..." : "Quero ser parceiro →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
