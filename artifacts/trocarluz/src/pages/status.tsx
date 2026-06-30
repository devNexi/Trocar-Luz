import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

interface StatusData {
  publicId: string;
  status: string;
  statusLabel: string;
  updatedAt: string;
}

const STATUS_ORDER = [
  "SWITCH_REQUEST_SUBMITTED",
  "AUTO_ELIGIBILITY_CHECK",
  "SENT_TO_GD_PARTNER",
  "PARTNER_REVIEWING",
  "PARTNER_PROPOSAL_RECEIVED",
  "PROPOSAL_SENT_TO_CUSTOMER",
  "CUSTOMER_ACCEPTED",
  "SWITCHED_CLOSED_WON",
];

const STATUS_ICONS: Record<string, string> = {
  SWITCH_REQUEST_SUBMITTED: "📥",
  AUTO_ELIGIBILITY_CHECK: "🔍",
  SENT_TO_GD_PARTNER: "📤",
  PARTNER_REVIEWING: "🔎",
  PARTNER_PROPOSAL_RECEIVED: "📋",
  PROPOSAL_SENT_TO_CUSTOMER: "💬",
  CUSTOMER_ACCEPTED: "✅",
  CUSTOMER_DECLINED: "❌",
  PROPOSAL_EXPIRED: "⏰",
  SWITCHED_CLOSED_WON: "🎉",
  REJECTED_NOT_ELIGIBLE: "❕",
  WAITLIST: "📝",
};

export default function StatusPage({ params }: { params: { publicId: string } }) {
  const { publicId } = params;
  const [data, setData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicId) return;
    fetch(`/api/switch-requests/${publicId}/status`)
      .then((r) => {
        if (!r.ok) throw new Error("Solicitação não encontrada.");
        return r.json();
      })
      .then((d: StatusData) => setData(d))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [publicId]);

  return (
    <Layout>
      <SEOHead title="Acompanhar solicitação — TrocaLuz" description="Acompanhe o status da sua solicitação de desconto." />

      <section className="bg-[#0A1628] text-white py-14 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h1 className="font-display font-extrabold mb-2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Acompanhar solicitação
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>
            Código: <strong style={{ color: "#FFD000", letterSpacing: "0.05em" }}>{publicId}</strong>
          </p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#F7F7F5" }}>
        <div className="max-w-lg mx-auto px-4">
          {loading && (
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", color: "#6B7080" }}>Carregando...</p>
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "18px", color: "#dc2626", marginBottom: "16px" }}>
                {error}
              </p>
              <Link
                href="/comparar-desconto"
                style={{
                  display: "inline-block",
                  backgroundColor: "#00B86B",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "12px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Nova consulta →
              </Link>
            </div>
          )}

          {data && (
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              {/* Current status */}
              <div className="text-center mb-10">
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                  {STATUS_ICONS[data.status] ?? "📋"}
                </div>
                <div className="font-display font-bold mb-2" style={{ fontSize: "24px", color: "#1A1F36" }}>
                  {data.statusLabel}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9EA3B0" }}>
                  Atualizado em {new Date(data.updatedAt).toLocaleDateString("pt-BR", { dateStyle: "long" })}
                </div>
              </div>

              {/* Context messages */}
              {data.status === "SWITCH_REQUEST_SUBMITTED" && (
                <div style={{ backgroundColor: "#F7F7F5", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#4B5066", lineHeight: 1.7, margin: 0 }}>
                    Sua solicitação foi recebida. Vamos analisar sua conta e verificar as opções disponíveis para a sua região. Se houver proposta, enviaremos pelo WhatsApp.
                  </p>
                </div>
              )}

              {data.status === "WAITLIST" && (
                <div style={{ backgroundColor: "#FFF8E1", border: "1px solid #FFD000", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#4B5066", lineHeight: 1.7, margin: 0 }}>
                    Não encontramos um parceiro disponível na sua região ainda. Você foi adicionado à lista de espera. Avisaremos quando houver opções disponíveis para você.
                  </p>
                </div>
              )}

              {data.status === "SWITCHED_CLOSED_WON" && (
                <div style={{ backgroundColor: "#E8F5EE", border: "1px solid #6ABF4B", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#2D7A3A", lineHeight: 1.7, margin: 0, fontWeight: 600 }}>
                    🎉 Parabéns! Sua migração foi concluída. Em breve você começará a receber os descontos na sua conta.
                  </p>
                </div>
              )}

              <Link
                href="/geracao-distribuida"
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#00B86B",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  textDecoration: "underline",
                }}
              >
                Enquanto aguarda, entenda como funciona a GD →
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
