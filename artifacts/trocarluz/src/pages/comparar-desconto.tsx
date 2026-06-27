import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

const STATES = [
  { uf: "AC", name: "Acre" }, { uf: "AL", name: "Alagoas" }, { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" }, { uf: "BA", name: "Bahia" }, { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" }, { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" }, { uf: "MA", name: "Maranhão" }, { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" }, { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" }, { uf: "PB", name: "Paraíba" }, { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" }, { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" }, { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" }, { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" }, { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" }, { uf: "SE", name: "Sergipe" }, { uf: "TO", name: "Tocantins" },
];

interface EstimateResult {
  eligible: boolean;
  discountMin: number;
  discountMax: number;
  savingsMinBrl: number;
  savingsMaxBrl: number;
  nextStep: "upload_bill" | "join_waitlist";
  disclaimer: string;
  partnerAvailable: boolean;
}

export default function CompararDesconto() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<"form" | "result">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const [state, setState] = useState("");
  const [distributor, setDistributor] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [customerType, setCustomerType] = useState<"residential" | "business">("residential");
  const [propertyType, setPropertyType] = useState("residencia");
  const [hasEv, setHasEv] = useState(false);
  const [cep, setCep] = useState("");

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const source = searchParams.get("source") ?? undefined;
  const campaign = searchParams.get("campaign") ?? undefined;
  const partnerCode = searchParams.get("parceiro") ?? undefined;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const bill = parseFloat(monthlyBill.replace(",", "."));
    if (!state || isNaN(bill) || bill <= 0) {
      setError("Informe seu estado e o valor médio da conta.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/savings-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cep: cep || undefined,
          state,
          distributor: distributor || undefined,
          monthlyBillValue: bill,
          customerType,
          propertyType,
          hasEv,
          source,
          campaign,
          partnerCode,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Erro ao calcular estimativa.");
      }

      const data = await res.json() as EstimateResult;
      setResult(data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  function goToSendBill() {
    const params = new URLSearchParams({
      state,
      ...(distributor && { distributor }),
      monthlyBill,
      customerType,
      ...(result && {
        discountMin: String(result.discountMin),
        discountMax: String(result.discountMax),
        savingsMin: String(result.savingsMinBrl),
        savingsMax: String(result.savingsMaxBrl),
      }),
      ...(source && { source }),
      ...(campaign && { campaign }),
      ...(partnerCode && { parceiro: partnerCode }),
    });
    navigate(`/enviar-conta?${params.toString()}`);
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #D1D0CB",
    borderRadius: "8px",
    padding: "12px 16px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    color: "#1A1F36",
    outline: "none",
    backgroundColor: "#fff",
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
        title="Comparar desconto na conta de luz — TrocarLuz"
        description="Veja quanto você pode economizar na conta de luz com geração distribuída. Estimativa gratuita em segundos."
      />

      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display font-extrabold mb-4" style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.1 }}>
            Compare descontos na sua conta de luz
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
            Em poucos minutos, veja a estimativa de economia disponível para a sua região.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F7F7F5" }}>
        <div className="max-w-xl mx-auto px-4">

          {step === "form" && (
            <form
              onSubmit={handleSubmit}
              style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <h2 className="font-display font-bold mb-6" style={{ fontSize: "24px", color: "#1A1F36" }}>
                Suas informações
              </h2>

              <div className="space-y-5">
                {/* Customer type */}
                <div>
                  <label style={labelStyle}>Você é</label>
                  <div className="flex gap-3">
                    {(["residential", "business"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setCustomerType(t)}
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "8px",
                          border: `2px solid ${customerType === t ? "#00B86B" : "#D1D0CB"}`,
                          backgroundColor: customerType === t ? "#E8F5EE" : "#fff",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: customerType === t ? "#00B86B" : "#6B7080",
                          cursor: "pointer",
                        }}
                      >
                        {t === "residential" ? "Residência" : "Empresa"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property type */}
                <div>
                  <label style={labelStyle}>Tipo de imóvel</label>
                  <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} style={inputStyle}>
                    <option value="residencia">Casa</option>
                    <option value="apartamento">Apartamento</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial / Galpão</option>
                    <option value="rural">Rural / Sítio</option>
                  </select>
                </div>

                {/* State */}
                <div>
                  <label style={labelStyle}>Estado *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    style={inputStyle}
                  >
                    <option value="">Selecione seu estado</option>
                    {STATES.map((s) => (
                      <option key={s.uf} value={s.uf}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* Distributor */}
                <div>
                  <label style={labelStyle}>Distribuidora (opcional)</label>
                  <input
                    type="text"
                    value={distributor}
                    onChange={(e) => setDistributor(e.target.value)}
                    placeholder="Ex: Enel, CPFL, Light, Cemig..."
                    style={inputStyle}
                  />
                </div>

                {/* CEP */}
                <div>
                  <label style={labelStyle}>CEP (opcional)</label>
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    style={inputStyle}
                  />
                </div>

                {/* Monthly bill */}
                <div>
                  <label style={labelStyle}>Valor médio da conta de luz (R$) *</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", fontFamily: "'Inter', sans-serif", color: "#6B7080", fontSize: "16px" }}>
                      R$
                    </span>
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      placeholder="250"
                      min="0"
                      step="10"
                      required
                      style={{ ...inputStyle, paddingLeft: "44px" }}
                    />
                  </div>
                  {parseFloat(monthlyBill) > 0 && parseFloat(monthlyBill) < 100 && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7080", marginTop: "6px" }}>
                      Contas abaixo de R$100 geralmente têm economia menor. Ainda assim podemos verificar opções para você.
                    </p>
                  )}
                </div>

                {/* EV */}
                <div className="flex items-center gap-3" style={{ cursor: "pointer" }} onClick={() => setHasEv(!hasEv)}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: `2px solid ${hasEv ? "#00B86B" : "#D1D0CB"}`,
                      backgroundColor: hasEv ? "#00B86B" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {hasEv && <span style={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}>✓</span>}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A1F36" }}>
                    Tenho carro elétrico (minha conta subiu depois da compra)
                  </span>
                </div>

                {error && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#dc2626" }}>{error}</p>
                )}

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
                  {loading ? "Calculando..." : "Ver meu desconto estimado →"}
                </button>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", textAlign: "center" }}>
                  Estimativa gratuita. Sem compromisso. Sem custo para você.
                </p>
              </div>
            </form>
          )}

          {step === "result" && result && (
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              {result.eligible ? (
                <>
                  <div className="text-center mb-8">
                    <div className="font-display font-extrabold mb-1" style={{ fontSize: "48px", color: "#6ABF4B" }}>
                      {result.discountMin}% – {result.discountMax}%
                    </div>
                    <div className="font-display font-semibold mb-3" style={{ fontSize: "20px", color: "#1A1F36" }}>
                      de desconto estimado na sua conta
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7080" }}>
                      Economia estimada entre{" "}
                      <strong style={{ color: "#1A1F36" }}>
                        R${result.savingsMinBrl} e R${result.savingsMaxBrl}
                      </strong>{" "}
                      por mês
                    </div>
                  </div>

                  <div style={{ backgroundColor: "#F7F7F5", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7080", lineHeight: 1.6, margin: 0 }}>
                      ⚠️ {result.disclaimer}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={goToSendBill}
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
                        cursor: "pointer",
                      }}
                    >
                      Enviar minha conta de luz para confirmar →
                    </button>
                    <button
                      onClick={() => setStep("form")}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#6B7080",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "1px solid #E2E1DC",
                        cursor: "pointer",
                      }}
                    >
                      Alterar dados
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="font-display font-bold mb-3" style={{ fontSize: "28px", color: "#1A1F36" }}>
                      Vamos te colocar na lista de espera
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#6B7080", lineHeight: 1.7 }}>
                      Sua conta está abaixo do mínimo usual para GD ({state}), mas o mercado evolui. Cadastre-se e avisamos quando houver opções disponíveis para você.
                    </p>
                  </div>

                  <button
                    onClick={goToSendBill}
                    style={{
                      width: "100%",
                      backgroundColor: "#0A1628",
                      color: "#FFD000",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      padding: "16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Entrar na lista de espera →
                  </button>
                </>
              )}
            </div>
          )}

          {/* Trust */}
          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {["Broker certificado CCEE", "Sem custo para você", "Parceiros verificados"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span style={{ color: "#00B86B" }}>✓</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7080" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GD positioning note */}
      <section className="py-12 bg-white border-t border-[#E2E1DC]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7 }}>
            <strong style={{ color: "#1A1F36" }}>Importante:</strong> na geração distribuída, você{" "}
            <strong>não troca de distribuidora</strong>. Você continua conectado à mesma rede e continua
            recebendo a mesma conta — com um desconto por usar energia solar de fazendas parceiras.
            Não há obras, não há instalação.
          </p>
        </div>
      </section>
    </Layout>
  );
}
