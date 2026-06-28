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
  comercializadoras: string[];
  minBillNeeded?: number;
}

const inp: React.CSSProperties = {
  width: "100%",
  border: "1px solid #D1D0CB",
  borderRadius: "8px",
  padding: "12px 16px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  color: "#1A1F36",
  outline: "none",
  backgroundColor: "#fff",
  boxSizing: "border-box",
};

const lbl: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  color: "#1A1F36",
  marginBottom: "6px",
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
        padding: "10px 12px",
        borderRadius: "8px",
        border: `2px solid ${active ? "#00B86B" : "#D1D0CB"}`,
        backgroundColor: active ? "#E8F5EE" : "#fff",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        color: active ? "#00B86B" : "#6B7080",
        cursor: "pointer",
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
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                backgroundColor: i <= idx ? "#00B86B" : "#E2E1DC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i < idx ? (
                <span style={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}>✓</span>
              ) : (
                <span style={{ color: i === idx ? "#fff" : "#9EA3B0", fontSize: "11px", fontWeight: 700 }}>
                  {i + 1}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: i === idx ? 700 : 400,
                color: i <= idx ? "#1A1F36" : "#9EA3B0",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: "24px", height: "1px", backgroundColor: i < idx ? "#00B86B" : "#E2E1DC" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function ResultBadge({ status }: { status: EstimateResult["coverageStatus"] }) {
  const config: Record<
    EstimateResult["coverageStatus"],
    { label: string; bg: string; color: string }
  > = {
    eligible: { label: "✓ Desconto disponível", bg: "#E8F5EE", color: "#00B86B" },
    consulta: { label: "⚡ Sujeito a análise", bg: "#FEF9E7", color: "#D4A00A" },
    below_minimum: { label: "⚠ Consumo abaixo do mínimo", bg: "#EFF6FF", color: "#2563EB" },
    no_coverage: { label: "○ Sem cobertura ainda", bg: "#F7F7F5", color: "#6B7080" },
  };
  const c = config[status];
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: c.bg,
        color: c.color,
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        padding: "6px 14px",
        borderRadius: "999px",
        marginBottom: "16px",
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
      ...(source && { source }),
      ...(campaign && { campaign }),
      ...(partnerCode && { parceiro: partnerCode }),
    });
    navigate(`/enviar-conta?${params.toString()}`);
  }

  const bill = parseFloat(monthlyBill.replace(",", "."));

  return (
    <Layout>
      <SEOHead
        title={`${TOOL_NAME} — TrocarLuz`}
        description="Descubra em 1 minuto quanto você pode economizar na conta de luz com energia solar compartilhada. Estimativa gratuita com dados reais de parceiros."
      />

      <section style={{ backgroundColor: "#0A1628", color: "#fff", padding: "56px 0 40px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(0,184,107,0.15)",
              color: "#00B86B",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "5px 14px",
              borderRadius: "999px",
              marginBottom: "16px",
            }}
          >
            Ferramenta gratuita
          </div>
          <h1
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(30px, 5vw, 48px)",
              lineHeight: 1.1,
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            {TOOL_NAME}
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
            }}
          >
            Descubra em 1 minuto se há desconto disponível para a sua distribuidora — com dados reais dos nossos parceiros.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: "#F7F7F5", padding: "40px 0 64px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 20px" }}>
          <StepIndicator step={step} />

          {/* ── Step 1: Localização ── */}
          {step === 1 && (
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "36px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <h2
                className="font-display"
                style={{ fontWeight: 700, fontSize: "22px", color: "#1A1F36", marginBottom: "24px" }}
              >
                Onde fica sua unidade?
              </h2>

              <div className="space-y-5">
                <div>
                  <label style={lbl}>Você é *</label>
                  <div className="flex gap-3">
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
                  <label style={lbl}>Estado *</label>
                  <select value={uf} onChange={(e) => handleUfChange(e.target.value)} style={inp}>
                    <option value="">Selecione seu estado</option>
                    {STATES.map((s) => (
                      <option key={s.uf} value={s.uf}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                {uf && distributors.length > 0 && (
                  <div>
                    <label style={lbl}>Distribuidora</label>
                    <select value={distributor} onChange={(e) => setDistributor(e.target.value)} style={inp}>
                      <option value="">Não sei / outra</option>
                      {distributors.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", marginTop: "4px" }}>
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
                  Próximo →
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Conta ── */}
          {step === 2 && (
            <form
              onSubmit={handleStep2Submit}
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "36px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <h2
                className="font-display"
                style={{ fontWeight: 700, fontSize: "22px", color: "#1A1F36", marginBottom: "24px" }}
              >
                Sobre sua conta de luz
              </h2>

              <div className="space-y-5">
                <div>
                  <label style={lbl}>Valor médio mensal *</label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "16px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontFamily: "'Inter', sans-serif",
                        color: "#6B7080",
                        fontSize: "16px",
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
                      style={{ ...inp, paddingLeft: "44px" }}
                    />
                  </div>
                  {bill > 0 && bill < 150 && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", marginTop: "4px" }}>
                      Contas menores podem não atingir o consumo mínimo das distribuidoras. Verificaremos assim mesmo.
                    </p>
                  )}
                </div>

                <div
                  className="flex items-center gap-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setHasEv(!hasEv)}
                >
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
                    {hasEv && (
                      <span style={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                    )}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1A1F36" }}>
                    Tenho carro elétrico (minha conta subiu após a compra)
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
                  {loading ? "Consultando parceiros..." : "Ver meu resultado →"}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep(1); setError(null); }}
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#6B7080",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #E2E1DC",
                    cursor: "pointer",
                  }}
                >
                  ← Voltar
                </button>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", textAlign: "center" }}>
                  Estimativa gratuita. Sem compromisso. Sem custo para você.
                </p>
              </div>
            </form>
          )}

          {/* ── Result ── */}
          {step === "result" && result && (
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                padding: "36px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              }}
            >
              <ResultBadge status={result.coverageStatus} />

              {result.coverageStatus === "eligible" && (
                <>
                  <div style={{ textAlign: "center", marginBottom: "24px" }}>
                    <div
                      className="font-display"
                      style={{ fontSize: "clamp(40px,8vw,60px)", fontWeight: 800, color: "#00B86B", lineHeight: 1, marginBottom: "4px" }}
                    >
                      {result.discountMin}%–{result.discountMax}%
                    </div>
                    <div
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", fontWeight: 600, color: "#1A1F36", marginBottom: "4px" }}
                    >
                      de desconto estimado
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080" }}>
                      Economia de{" "}
                      <strong style={{ color: "#1A1F36" }}>
                        R${result.savingsMinBrl}–R${result.savingsMaxBrl}/mês
                      </strong>
                    </div>
                  </div>

                  {result.comercializadoras.length > 0 && (
                    <div
                      style={{
                        backgroundColor: "#F7F7F5",
                        borderRadius: "10px",
                        padding: "14px 16px",
                        marginBottom: "20px",
                      }}
                    >
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#6B7080", marginBottom: "6px" }}>
                        PARCEIROS COM OFERTA
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.comercializadoras.map((c) => (
                          <span
                            key={c}
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#1A1F36",
                              backgroundColor: "#fff",
                              border: "1px solid #E2E1DC",
                              borderRadius: "6px",
                              padding: "4px 10px",
                            }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      backgroundColor: "#F7F7F5",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9EA3B0", lineHeight: 1.6, margin: 0 }}>
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
                      Confirmar com minha conta de luz →
                    </button>
                    <button
                      onClick={() => { setStep(1); setResult(null); }}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#6B7080",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #E2E1DC",
                        cursor: "pointer",
                      }}
                    >
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "consulta" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: "#1A1F36", marginBottom: "8px" }}
                  >
                    Há ofertas para sua região
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7, marginBottom: "20px" }}>
                    Encontramos{" "}
                    {result.comercializadoras.length > 0
                      ? result.comercializadoras.join(", ")
                      : "parceiros"}{" "}
                    com oferta para sua distribuidora — mas precisam analisar sua conta individualmente para confirmar o desconto.
                  </p>

                  {result.discountMax > 0 && (
                    <div
                      style={{
                        backgroundColor: "#FEF9E7",
                        borderRadius: "10px",
                        padding: "14px 16px",
                        marginBottom: "20px",
                      }}
                    >
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#92730B" }}>
                        Desconto indicativo:{" "}
                        <strong>
                          {result.discountMin}%–{result.discountMax}%
                        </strong>{" "}
                        — sujeito à análise.
                      </p>
                    </div>
                  )}

                  <div
                    style={{
                      backgroundColor: "#F7F7F5",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9EA3B0", lineHeight: 1.6, margin: 0 }}>
                      ⚠️ {result.disclaimer}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={goToSendBill}
                      style={{
                        width: "100%",
                        backgroundColor: "#1A1F36",
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
                      Solicitar análise personalizada →
                    </button>
                    <button
                      onClick={() => { setStep(1); setResult(null); }}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#6B7080",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #E2E1DC",
                        cursor: "pointer",
                      }}
                    >
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "below_minimum" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: "#1A1F36", marginBottom: "8px" }}
                  >
                    Conta abaixo do mínimo da distribuidora
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7, marginBottom: "20px" }}>
                    Há parceiros na sua região, mas o consumo estimado está abaixo do mínimo exigido para entrada em GD.
                    {result.minBillNeeded
                      ? ` O ticket mínimo é de aproximadamente R$${result.minBillNeeded}/mês.`
                      : ""}
                  </p>

                  <div
                    style={{
                      backgroundColor: "#EFF6FF",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      marginBottom: "24px",
                    }}
                  >
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#1D4ED8", lineHeight: 1.6 }}>
                      💡 Se você tem carro elétrico ou ar-condicionado central, sua conta tende a crescer e poderá se qualificar em breve. Cadastre-se e avisamos.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={goToSendBill}
                      style={{
                        width: "100%",
                        backgroundColor: "#1A1F36",
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
                      Entrar na lista de espera →
                    </button>
                    <button
                      onClick={() => { setStep(1); setResult(null); }}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#6B7080",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #E2E1DC",
                        cursor: "pointer",
                      }}
                    >
                      Refazer consulta
                    </button>
                  </div>
                </>
              )}

              {result.coverageStatus === "no_coverage" && (
                <>
                  <h2
                    className="font-display"
                    style={{ fontWeight: 700, fontSize: "22px", color: "#1A1F36", marginBottom: "8px" }}
                  >
                    Sua região ainda não tem cobertura
                  </h2>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7, marginBottom: "20px" }}>
                    No momento nenhum dos nossos parceiros tem oferta de GD ativa para a distribuidora selecionada. O mercado evolui rápido — cadastre-se e avisamos assim que houver disponibilidade.
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={goToSendBill}
                      style={{
                        width: "100%",
                        backgroundColor: "#1A1F36",
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
                      Avisar quando tiver oferta →
                    </button>
                    <button
                      onClick={() => { setStep(1); setResult(null); }}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        color: "#6B7080",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #E2E1DC",
                        cursor: "pointer",
                      }}
                    >
                      Tentar outro estado
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            {["Broker certificado CCEE", "Sem custo para você", "Dados reais de parceiros"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span style={{ color: "#00B86B" }}>✓</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7080" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0", backgroundColor: "#fff", borderTop: "1px solid #E2E1DC" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#6B7080", lineHeight: 1.7 }}>
            <strong style={{ color: "#1A1F36" }}>Importante:</strong> na geração distribuída você{" "}
            <strong>não troca de distribuidora</strong>. Continua conectado à mesma rede, com a mesma fatura — agora com um desconto por usar energia solar de fazendas parceiras. Sem obras, sem instalação.
          </p>
        </div>
      </section>
    </Layout>
  );
}
