import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

const TOOL_NAME = "Raio-X da Conta de Luz";

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

const DISTRIBUTORS_BY_UF: Record<string, string[]> = {
  AL: ["Equatorial AL"],
  AM: ["AMAZONAS ENERGIA"],
  BA: ["COELBA"],
  CE: ["ENEL CE"],
  DF: ["Neoenergia Brasília"],
  ES: ["EDP ES"],
  GO: ["Equatorial GO"],
  MA: ["Equatorial MA"],
  MG: ["CEMIG", "CPFL Santa Cruz", "Elektro", "Energisa Minas Rio"],
  MS: ["Energisa Mato Grosso do Sul"],
  MT: ["Energisa Mato Grosso"],
  PA: ["Equatorial PA"],
  PB: ["Energisa PB"],
  PE: ["Neoenergia Pernambuco"],
  PI: ["Equatorial PI"],
  PR: ["COPEL", "CPFL Santa Cruz", "Energisa Sul-Sudeste"],
  RJ: ["ENEL RJ", "LIGHT RJ"],
  RN: ["COSERN"],
  RS: ["CEEE Equatorial", "ELETROCAR", "RGE"],
  SC: ["CELESC", "DCELT"],
  SE: ["Energisa SE"],
  SP: ["CPFL Paulista", "CPFL Piratininga", "CPFL Santa Cruz", "Elektro"],
  TO: ["Energisa TO"],
};

// PERMANENT RULE: comercializadoras / partner names intentionally absent from this interface.
// Partner identity is core broker IP and must never be exposed to the customer-facing UI
// until a deal is committed. The API strips partner fields before sending this response.
interface EstimateResult {
  eligible: boolean;
  discountMin: number;
  discountMax: number;
  savingsMinBrl: number;
  savingsMaxBrl: number;
  nextStep: "upload_bill" | "join_waitlist";
  disclaimer: string;
  partnerAvailable: boolean;
  coverageStatus: "eligible" | "consulta" | "below_minimum" | "no_coverage";
  minBillNeeded?: number;
}

const NAVY = "#0E1525";
const CREAM = "#F5F4EF";
const GREEN = "#1FA459";
const BORDER = "#E6E4DC";
const MUTED = "#515A68";

const DOT_TEXTURE: React.CSSProperties = {
  backgroundImage: "radial-gradient(rgba(26,36,16,0.10) 1.5px, transparent 1.5px)",
  backgroundSize: "22px 22px",
};

const CARD: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "22px",
  padding: "clamp(24px,5vw,40px)",
  boxShadow: "0 10px 34px rgba(14,21,37,.10)",
};

const BTN_CTA: React.CSSProperties = {
  width: "100%",
  backgroundColor: GREEN,
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 700,
  fontSize: "16px",
  height: "52px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  letterSpacing: "0.01em",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const BTN_GHOST: React.CSSProperties = {
  width: "100%",
  backgroundColor: "transparent",
  color: MUTED,
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  height: "44px",
  borderRadius: "999px",
  border: `1px solid ${BORDER}`,
  cursor: "pointer",
};

const LBL: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  color: NAVY,
  marginBottom: "6px",
};

const SELECT_BASE: React.CSSProperties = {
  width: "100%",
  minHeight: "52px",
  border: `1.5px solid ${BORDER}`,
  borderRadius: "14px",
  padding: "0 16px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  appearance: "none",
  outline: "none",
};

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        minHeight: "52px",
        padding: "12px 16px",
        borderRadius: "14px",
        border: `2px solid ${active ? GREEN : BORDER}`,
        backgroundColor: active ? "rgba(31,164,89,0.09)" : "#fff",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: active ? "#157A3C" : MUTED,
        cursor: "pointer",
        transition: "border-color 0.15s, background-color 0.15s, color 0.15s",
        lineHeight: 1.2,
      }}
    >
      {children}
    </button>
  );
}

function StepIndicator({ step }: { step: 1 | 2 | "result" }) {
  const steps = ["Localização", "Sua conta", "Resultado"];
  const idx = step === 1 ? 0 : step === 2 ? 1 : 2;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "28px" }}>
      {steps.map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                backgroundColor: i <= idx ? GREEN : BORDER,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.2s",
              }}
            >
              {i < idx ? (
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, lineHeight: 1 }}>✓</span>
              ) : (
                <span style={{ color: i === idx ? "#fff" : MUTED, fontSize: "11px", fontWeight: 700 }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: i === idx ? 700 : 400,
                color: i <= idx ? NAVY : "#9AA6B8",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                width: "28px",
                height: "1.5px",
                backgroundColor: i < idx ? GREEN : BORDER,
                transition: "background-color 0.2s",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ResultBadge({ status }: { status: EstimateResult["coverageStatus"] }) {
  const config: Record<EstimateResult["coverageStatus"], { label: string; bg: string; color: string }> = {
    eligible: { label: "✓ Desconto disponível", bg: GREEN, color: "#fff" },
    consulta: { label: "⚡ Sujeito a análise", bg: "#FEF3C7", color: "#92400E" },
    below_minimum: { label: "⚠ Consumo abaixo do mínimo", bg: "#EFF6FF", color: "#1D4ED8" },
    no_coverage: { label: "○ Sem cobertura ainda", bg: BORDER, color: MUTED },
  };
  const c = config[status];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: c.bg,
        color: c.color,
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        padding: "7px 16px",
        borderRadius: "999px",
        marginBottom: "20px",
      }}
    >
      {c.label}
    </div>
  );
}

export default function CompararDesconto() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<1 | 2 | "result">(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EstimateResult | null>(null);

  const [uf, setUf] = useState("");
  const [distributor, setDistributor] = useState("");
  const [customerType, setCustomerType] = useState<"residential" | "business">("residential");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [hasEv, setHasEv] = useState(false);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const source = searchParams.get("source") ?? undefined;
  const campaign = searchParams.get("campaign") ?? undefined;
  const partnerCode = searchParams.get("parceiro") ?? undefined;

  const distributors = uf ? (DISTRIBUTORS_BY_UF[uf] ?? []) : [];

  function handleUfChange(newUf: string) {
    setUf(newUf);
    setDistributor("");
  }

  function handleStep1Next() {
    if (!uf) {
      setError("Selecione seu estado.");
      return;
    }
    setError(null);
    setStep(2);
  }

  async function handleStep2Submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const bill = parseFloat(monthlyBill.replace(",", "."));
    if (isNaN(bill) || bill <= 0) {
      setError("Informe o valor médio da sua conta de luz.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/savings-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: uf,
          distributor: distributor || undefined,
          monthlyBillValue: bill,
          customerType,
          hasEv,
          source,
          campaign,
          partnerCode,
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Erro ao calcular estimativa.");
      }

      const data = (await res.json()) as EstimateResult;
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
      state: uf,
      ...(distributor && { distributor }),
      monthlyBill,
      customerType,
      ...(result && {
        discountMin: String(result.discountMin),
        discountMax: String(result.discountMax),
        savingsMin: String(result.savingsMinBrl),
        savingsMax: String(result.savingsMaxBrl),
      }),
      ...(hasEv && { hasEv: "1" }),
      ...(source && { source }),
      ...(campaign && { campaign }),
      ...(partnerCode && { parceiro: partnerCode }),
    });
    navigate(`/enviar-conta?${params.toString()}`);
  }

  const billNum = parseFloat(monthlyBill.replace(",", "."));

  return (
    <Layout>
      <SEOHead
        title={`${TOOL_NAME} — TrocarLuz`}
        description="Descubra em 1 minuto quanto você pode economizar na conta de luz com energia solar compartilhada. Estimativa gratuita com dados reais."
      />

      {/* ── Hero ── */}
      <section style={{ backgroundColor: "var(--env)", padding: "clamp(100px, 14vw, 120px) 0 48px", ...DOT_TEXTURE }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(21,107,59,0.12)",
              color: "#156B3B",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "5px 16px",
              borderRadius: "999px",
              marginBottom: "12px",
            }}
          >
            Ferramenta gratuita
          </div>
          <h1
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 46px)",
              lineHeight: 1.1,
              marginBottom: "14px",
              letterSpacing: "-0.02em",
              color: "#1A2410",
            }}
          >
            {TOOL_NAME}
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              color: "rgba(26,36,16,0.70)",
              lineHeight: 1.65,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Descubra em 1 minuto se há desconto disponível para a sua distribuidora — com dados reais verificados.
          </p>
        </div>
      </section>

      {/* ── Tool ── */}
      <section style={{ backgroundColor: CREAM, padding: "44px 0 80px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 16px" }}>
          <StepIndicator step={step} />

          {/* ── Step 1: Localização ── */}
          {step === 1 && (
            <div style={CARD}>
              <h2
                className="font-display"
                style={{ fontWeight: 700, fontSize: "22px", color: NAVY, marginBottom: "24px" }}
              >
                Onde fica sua unidade?
              </h2>

              <div className="space-y-5">
                <div>
                  <label style={LBL}>Você é *</label>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <ToggleButton
                      active={customerType === "residential"}
                      onClick={() => setCustomerType("residential")}
                    >
                      🏠 Residência
                    </ToggleButton>
                    <ToggleButton
                      active={customerType === "business"}
                      onClick={() => setCustomerType("business")}
                    >
                      🏢 Empresa
                    </ToggleButton>
                  </div>
                </div>

                <div>
                  <label style={LBL}>Estado *</label>
                  <select
                    value={uf}
                    onChange={(e) => handleUfChange(e.target.value)}
                    className="tool-input"
                    style={{ ...SELECT_BASE, color: uf ? NAVY : MUTED }}
                  >
                    <option value="">Selecione seu estado</option>
                    {STATES.map((s) => (
                      <option key={s.uf} value={s.uf}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {uf && distributors.length > 0 && (
                  <div>
                    <label style={LBL}>Distribuidora</label>
                    <select
                      value={distributor}
                      onChange={(e) => setDistributor(e.target.value)}
                      className="tool-input"
                      style={{ ...SELECT_BASE, color: distributor ? NAVY : MUTED }}
                    >
                      <option value="">Não sei / outra</option>
                      {distributors.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9AA6B8", marginTop: "5px" }}>
                      Distribuidoras com ofertas disponíveis na sua região
                    </p>
                  </div>
                )}

                {error && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#dc2626" }}>{error}</p>
                )}

                <button
                  type="button"
                  onClick={handleStep1Next}
                  className="tool-btn-cta"
                  style={BTN_CTA}
                >
                  Próximo →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Conta ── */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} style={CARD}>
              <h2
                className="font-display"
                style={{ fontWeight: 700, fontSize: "22px", color: NAVY, marginBottom: "24px" }}
              >
                Sobre sua conta de luz
              </h2>

              <div className="space-y-5">
                <div>
                  <label style={LBL}>Valor médio mensal *</label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontFamily: "'Inter', sans-serif",
                        color: MUTED,
                        fontSize: "16px",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    >
                      R$
                    </span>
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(e.target.value)}
                      placeholder="300"
                      min="0"
                      step="10"
                      required
                      className="tool-input"
                      style={{
                        width: "100%",
                        minHeight: "52px",
                        border: `1.5px solid ${BORDER}`,
                        borderRadius: "14px",
                        padding: "0 16px 0 44px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "16px",
                        color: NAVY,
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                        outline: "none",
                      }}
                    />
                  </div>
                  {billNum > 0 && billNum < 150 && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9AA6B8", marginTop: "5px" }}>
                      Contas menores podem não atingir o consumo mínimo. Verificaremos assim mesmo.
                    </p>
                  )}
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
                  onClick={() => setHasEv(!hasEv)}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "6px",
                      border: `2px solid ${hasEv ? GREEN : BORDER}`,
                      backgroundColor: hasEv ? GREEN : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.15s",
                    }}
                  >
                    {hasEv && <span style={{ color: "#fff", fontSize: "12px", fontWeight: 700, lineHeight: 1 }}>✓</span>}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: NAVY, lineHeight: 1.4 }}>
                    Tenho carro elétrico (minha conta subiu após a compra)
                  </span>
                </div>

                {error && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#dc2626" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="tool-btn-cta"
                  style={{ ...BTN_CTA, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? "Consultando dados..." : "Ver meu resultado →"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep(1); setError(null); }}
                  style={BTN_GHOST}
                >
                  ← Voltar
                </button>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9AA6B8", textAlign: "center" }}>
                  Estimativa gratuita. Sem compromisso. Sem custo para você.
                </p>
              </div>
            </form>
          )}

          {/* ── Result ── */}
          {step === "result" && result && (
            <div style={CARD}>
              <ResultBadge status={result.coverageStatus} />

              {result.coverageStatus === "eligible" && (
                <>
                  {/* R$ is the visual hero — savings first, % secondary */}
                  <div style={{ textAlign: "center", marginBottom: "28px", padding: "8px 0" }}>
                    <div
                      style={{
                        fontSize: "clamp(32px,9vw,52px)",
                        fontWeight: 800,
                        color: NAVY,
                        fontFamily: "'Inter', sans-serif",
                        lineHeight: 1.05,
                        marginBottom: "6px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      R${result.savingsMinBrl.toLocaleString("pt-BR")}
                      <span style={{ color: MUTED, fontWeight: 500 }}>–</span>
                      R${result.savingsMaxBrl.toLocaleString("pt-BR")}
                      <span style={{ fontSize: "0.38em", fontWeight: 600, color: MUTED, verticalAlign: "middle" }}>/mês</span>
                    </div>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "clamp(24px,6vw,36px)",
                        fontWeight: 800,
                        color: GREEN,
                        lineHeight: 1.1,
                        marginBottom: "4px",
                      }}
                    >
                      {result.discountMin}%–{result.discountMax}%
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: MUTED }}>
                      de desconto estimado
                    </div>
                    {hasEv && (
                      <div
                        style={{
                          marginTop: "14px",
                          backgroundColor: "rgba(31,164,89,0.09)",
                          borderRadius: "10px",
                          padding: "10px 14px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          color: "#157A3C",
                          fontWeight: 600,
                        }}
                      >
                        Sua conta subiu após o carro elétrico? Veja quanto dá para reduzir.
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      backgroundColor: CREAM,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9AA6B8", lineHeight: 1.6, margin: 0 }}>
                      ⚠ {result.disclaimer}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button onClick={goToSendBill} className="tool-btn-cta" style={BTN_CTA}>
                      Confirmar com minha conta de luz →
                    </button>
                    <button onClick={() => { setStep(1); setResult(null); }} style={BTN_GHOST}>
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "consulta" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: NAVY, marginBottom: "10px" }}
                  >
                    Há ofertas para sua região
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: MUTED, lineHeight: 1.7, marginBottom: "20px" }}>
                    Encontramos uma oferta disponível para a sua região — mas precisamos analisar sua conta individualmente para confirmar o desconto exato.
                  </p>

                  {result.discountMax > 0 && (
                    <div
                      style={{
                        backgroundColor: "#FEF9E7",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        marginBottom: "20px",
                      }}
                    >
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#92730B" }}>
                        Desconto indicativo:{" "}
                        <strong>{result.discountMin}%–{result.discountMax}%</strong>{" "}
                        — sujeito à análise da conta.
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      backgroundColor: CREAM,
                      borderRadius: "12px",
                      padding: "14px 16px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9AA6B8", lineHeight: 1.6, margin: 0 }}>
                      ⚠ {result.disclaimer}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button onClick={goToSendBill} className="tool-btn-cta" style={BTN_CTA}>
                      Solicitar análise personalizada →
                    </button>
                    <button onClick={() => { setStep(1); setResult(null); }} style={BTN_GHOST}>
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "below_minimum" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: NAVY, marginBottom: "10px" }}
                  >
                    Conta abaixo do mínimo da distribuidora
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: MUTED, lineHeight: 1.7, marginBottom: "20px" }}>
                    Há parceiros na sua região, mas o consumo estimado está abaixo do mínimo exigido para entrada em GD.
                    {result.minBillNeeded
                      ? ` O ticket mínimo é de aproximadamente R$${result.minBillNeeded}/mês.`
                      : ""}
                  </p>

                  <div
                    style={{
                      backgroundColor: "#EFF6FF",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1D4ED8", lineHeight: 1.6 }}>
                      💡 Se você tem carro elétrico ou ar-condicionado central, sua conta tende a crescer e poderá se qualificar em breve. Cadastre-se e avisamos.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button onClick={goToSendBill} className="tool-btn-cta" style={BTN_CTA}>
                      Entrar na lista de espera →
                    </button>
                    <button onClick={() => { setStep(1); setResult(null); }} style={BTN_GHOST}>
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "no_coverage" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: NAVY, marginBottom: "10px" }}
                  >
                    Sua região ainda não tem cobertura
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: MUTED, lineHeight: 1.7, marginBottom: "20px" }}>
                    No momento nenhum dos nossos parceiros tem oferta de GD ativa para a distribuidora selecionada. O mercado evolui rápido — cadastre-se e avisamos assim que houver disponibilidade.
                  </p>

                  <div className="space-y-3">
                    <button onClick={goToSendBill} className="tool-btn-cta" style={BTN_CTA}>
                      Avisar quando tiver oferta →
                    </button>
                    <button onClick={() => { setStep(1); setResult(null); }} style={BTN_GHOST}>
                      Tentar outro estado
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "32px",
              flexWrap: "wrap",
            }}
          >
            {["Parceiro Ótima Energia", "Sem custo para você", "Dados reais verificados"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: GREEN }}>✓</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: MUTED }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", backgroundColor: "#fff", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: MUTED, lineHeight: 1.7 }}>
            <strong style={{ color: NAVY }}>Importante:</strong> na geração distribuída você{" "}
            <strong>não troca de distribuidora</strong>. Continua conectado à mesma rede, com a mesma fatura — agora com um desconto por usar energia solar de fazendas parceiras. Sem obras, sem instalação.
          </p>
        </div>
      </section>
    </Layout>
  );
}
