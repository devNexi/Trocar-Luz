import { useState, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { useBillUpload } from "@/hooks/use-bill-upload";

function getParam(name: string): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export default function EnviarConta() {
  const [, navigate] = useLocation();
  const { uploadFile, isUploading, error: uploadError, setError: setUploadError } = useBillUpload();

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [partnerShareConsent, setPartnerShareConsent] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState<{ publicId: string; statusLabel: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const state = getParam("state");
  const distributor = getParam("distributor");
  const monthlyBill = parseFloat(getParam("monthlyBill") || "0");
  const discountMin = parseFloat(getParam("discountMin") || "0");
  const discountMax = parseFloat(getParam("discountMax") || "0");
  const savingsMin = parseFloat(getParam("savingsMin") || "0");
  const savingsMax = parseFloat(getParam("savingsMax") || "0");
  const source = getParam("source");
  const campaign = getParam("campaign");
  const partnerCode = getParam("parceiro");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);
    setUploadError(null);
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(f.type)) {
      setFileError("Formato inválido. Envie PDF, JPEG ou PNG.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setFileError("Arquivo muito grande. Máximo 10 MB.");
      return;
    }
    setFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      const fakeEvent = { target: { files: [f] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(fakeEvent);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot: if this hidden field has any value, it was filled by a bot — silently abort
    const trap = (e.currentTarget as HTMLFormElement).elements.namedItem("_trap") as HTMLInputElement | null;
    if (trap?.value) return;

    if (!lgpdConsent || !partnerShareConsent || !whatsappConsent) {
      setSubmitError("Todos os consentimentos são obrigatórios para continuar.");
      return;
    }
    if (!nome.trim() || nome.trim().length < 2) {
      setSubmitError("Informe seu nome.");
      return;
    }
    const phoneDigits = whatsapp.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setSubmitError("Informe um WhatsApp válido com DDD.");
      return;
    }

    setSubmitting(true);
    let billFileUrl: string | undefined;

    if (file) {
      const result = await uploadFile(file);
      if (!result) {
        setSubmitting(false);
        return;
      }
      billFileUrl = result.objectPath;
    }

    try {
      // Include honeypot in payload (server also checks it)
      const payload: Record<string, unknown> = {
        _trap: "",
        nome: nome.trim(),
        whatsapp: phoneDigits,
        customerType: "residential",
        state: state || "SP",
        lgpdConsent,
        partnerShareConsent,
        whatsappConsent,
        ...(distributor && { distributor }),
        ...(monthlyBill > 0 && { monthlyBillValue: monthlyBill }),
        ...(discountMin > 0 && { estimatedDiscountMin: discountMin }),
        ...(discountMax > 0 && { estimatedDiscountMax: discountMax }),
        ...(savingsMin > 0 && { estimatedSavingsMin: savingsMin }),
        ...(savingsMax > 0 && { estimatedSavingsMax: savingsMax }),
        ...(billFileUrl && { billFileUrl }),
        ...(source && { source }),
        ...(campaign && { campaign }),
        ...(partnerCode && { partnerCode }),
      };

      const res = await fetch("/api/switch-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Erro ao enviar solicitação.");
      }

      const data = await res.json() as { publicId: string; statusLabel: string };
      setDone(data);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setSubmitting(false);
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

  if (done) {
    return (
      <Layout>
        <SEOHead title="Solicitação enviada — TrocarLuz" description="Sua solicitação foi recebida." />
        <section className="py-24 bg-[#F7F7F5]">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "#E8F5EE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: "36px",
              }}
            >
              ✓
            </div>
            <h1 className="font-display font-bold mb-4" style={{ fontSize: "32px", color: "#1A1F36" }}>
              Solicitação recebida!
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: "#6B7080", lineHeight: 1.7, marginBottom: "24px" }}>
              Vamos analisar sua conta e verificar opções disponíveis para sua região. Se houver proposta disponível, enviaremos pelo WhatsApp.
            </p>

            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #E2E1DC",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "32px",
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7080", marginBottom: "4px" }}>
                Código de acompanhamento
              </div>
              <div className="font-display font-bold" style={{ fontSize: "24px", color: "#1A1F36", letterSpacing: "0.05em" }}>
                {done.publicId}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", marginTop: "4px" }}>
                Salve este código para acompanhar sua solicitação
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={`/status/${done.publicId}`}
                style={{
                  display: "block",
                  backgroundColor: "#0A1628",
                  color: "#FFD000",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Acompanhar minha solicitação →
              </Link>
              <Link
                href="/geracao-distribuida"
                style={{
                  display: "block",
                  backgroundColor: "transparent",
                  color: "#6B7080",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E2E1DC",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Enquanto isso, entenda como funciona a GD
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Enviar conta de luz — TrocarLuz"
        description="Envie sua conta de luz para analisarmos e confirmarmos as opções de desconto disponíveis para você."
      />

      <section
        className="py-14 text-center"
        style={{
          backgroundColor: "var(--env)",
          backgroundImage: "radial-gradient(rgba(26,36,16,0.10) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="max-w-xl mx-auto px-4">
          {discountMin > 0 && (
            <div
              className="inline-block mb-4 font-display font-bold"
              style={{ backgroundColor: "rgba(21,107,59,0.12)", border: "1px solid rgba(21,107,59,0.30)", borderRadius: "8px", padding: "8px 20px", color: "#156B3B", fontSize: "15px" }}
            >
              Estimativa: {discountMin}%–{discountMax}% de desconto / R${savingsMin}–R${savingsMax}/mês
            </div>
          )}
          <h1 className="font-display font-extrabold mb-3" style={{ fontSize: "clamp(28px, 5vw, 44px)", lineHeight: 1.1, color: "#1A2410" }}>
            Envie sua conta de luz
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "17px", color: "rgba(26,36,16,0.70)", lineHeight: 1.7 }}>
            Analisamos e confirmamos a melhor opção disponível para você.
          </p>
        </div>
      </section>

      <section className="py-14" style={{ backgroundColor: "#F7F7F5" }}>
        <div className="max-w-lg mx-auto px-4">
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
          >
            {/* Honeypot — hidden from real users, bots fill it automatically */}
            <input name="_trap" type="text" tabIndex={-1} aria-hidden="true" autoComplete="off" style={{ display: "none" }} />
            <div className="space-y-6">

              {/* Name */}
              <div>
                <label style={labelStyle}>Seu nome *</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  required
                  style={inputStyle}
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label style={labelStyle}>WhatsApp com DDD *</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                  style={inputStyle}
                />
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", marginTop: "4px" }}>
                  Enviaremos sua análise e proposta pelo WhatsApp.
                </p>
              </div>

              {/* Bill upload */}
              <div>
                <label style={labelStyle}>Conta de luz (PDF, JPEG ou PNG, máx. 10 MB)</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  style={{
                    border: `2px dashed ${file ? "#00B86B" : "#D1D0CB"}`,
                    borderRadius: "12px",
                    padding: "28px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: file ? "#E8F5EE" : "#F7F7F5",
                    transition: "all 0.15s",
                  }}
                >
                  {file ? (
                    <>
                      <div style={{ fontSize: "28px", marginBottom: "4px" }}>✓</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#2D7A3A", fontWeight: 600 }}>
                        {file.name}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7080", marginTop: "4px" }}>
                        {(file.size / 1024 / 1024).toFixed(1)} MB — clique para trocar
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: "32px", marginBottom: "8px" }}>📄</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7080" }}>
                        Arraste sua conta aqui ou{" "}
                        <span style={{ color: "#00B86B", fontWeight: 600 }}>clique para selecionar</span>
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", marginTop: "4px" }}>
                        Opcional — mas acelera a análise
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {(fileError || uploadError) && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#dc2626", marginTop: "6px" }}>
                    {fileError ?? uploadError}
                  </p>
                )}
              </div>

              {/* Consents */}
              <div style={{ borderTop: "1px solid #E2E1DC", paddingTop: "24px" }}>
                <p className="font-display font-semibold mb-4" style={{ fontSize: "14px", color: "#1A1F36" }}>
                  Consentimentos obrigatórios (LGPD)
                </p>
                <div className="space-y-4">
                  {[
                    {
                      key: "whatsapp",
                      value: whatsappConsent,
                      set: setWhatsappConsent,
                      label: "Aceito receber mensagens da TrocarLuz/Ótima sobre minha análise e proposta pelo WhatsApp.",
                    },
                    {
                      key: "partner",
                      value: partnerShareConsent,
                      set: setPartnerShareConsent,
                      label: "Autorizo o compartilhamento dos meus dados e da minha conta de luz com parceiros para a geração de uma proposta de economia.",
                    },
                    {
                      key: "lgpd",
                      value: lgpdConsent,
                      set: setLgpdConsent,
                      label: "",
                      isPrivacy: true,
                    },
                  ].map((c) => (
                    <div key={c.key} className="flex items-start gap-3" style={{ cursor: "pointer" }} onClick={() => c.set(!c.value)}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          border: `2px solid ${c.value ? "#00B86B" : "#D1D0CB"}`,
                          backgroundColor: c.value ? "#00B86B" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        {c.value && <span style={{ color: "#fff", fontSize: "11px", fontWeight: "bold" }}>✓</span>}
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#4B5066", lineHeight: 1.6 }}>
                        {c.isPrivacy ? (
                          <>
                            Li e aceito a{" "}
                            <Link
                              href="/politica-de-privacidade"
                              target="_blank"
                              style={{ color: "#00B86B", textDecoration: "underline" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Política de Privacidade
                            </Link>{" "}
                            da TrocarLuz e autorizo o tratamento dos meus dados conforme descrito.
                          </>
                        ) : (
                          c.label
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {(submitError) && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#dc2626" }}>{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting || isUploading}
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
                  cursor: submitting || isUploading ? "not-allowed" : "pointer",
                  opacity: submitting || isUploading ? 0.7 : 1,
                }}
              >
                {isUploading ? "Enviando arquivo..." : submitting ? "Enviando solicitação..." : "Enviar solicitação →"}
              </button>

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#9EA3B0", textAlign: "center" }}>
                Seus dados são protegidos e nunca serão vendidos. Uso exclusivo para análise de proposta.
              </p>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
