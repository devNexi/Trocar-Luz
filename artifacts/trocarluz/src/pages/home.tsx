import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Lightning,
  ShieldCheck,
  House,
  Buildings,
  Sun,
  MapPin,
  Headset,
  SealCheck,
  DeviceMobile,
} from "@phosphor-icons/react";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";

/* ── Dot texture helper ──────────────────────────────────────────── */
const DOT_TEXTURE: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, rgba(26,36,16,0.05) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

/* ── Count-up hook ───────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setValue(target); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { value, ref };
}

/* ── Stat item ───────────────────────────────────────────────────── */
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div
        style={{
          fontFamily: "var(--app-font-display)",
          fontWeight: 700,
          fontSize: "clamp(52px, 7vw, 80px)",
          lineHeight: 1,
          color: "var(--ink)",
          letterSpacing: "-0.02em",
          marginBottom: "10px",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--app-font-sans)",
          fontWeight: 500,
          fontSize: "15px",
          color: "rgba(26,36,16,0.60)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Schema.org ──────────────────────────────────────────────────── */
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TrocarLuz",
  url: "https://trocarluz.com.br",
  logo: "https://trocarluz.com.br/favicon.png",
  description:
    "Compare e economize na conta de energia. Geração distribuída e mercado livre no Brasil.",
};

/* ── Why reasons data ────────────────────────────────────────────── */
const WHY_REASONS = [
  {
    Icon: House,
    title: "Sem obras ou instalações",
    desc: "GD conecta você a energia solar de fazendas parceiras. Nenhuma mudança no seu imóvel.",
  },
  {
    Icon: DeviceMobile,
    title: "100% digital",
    desc: "Tudo pelo WhatsApp, sem burocracia. Processo simples do início ao fim.",
  },
  {
    Icon: SealCheck,
    title: "Broker certificado CCEE",
    desc: "Único broker certificado para acompanhar você no mercado livre residencial de 2027.",
  },
  {
    Icon: MapPin,
    title: "27 estados cobertos",
    desc: "Cobertura nacional com distribuidoras e geradoras parceiras em todo o Brasil.",
  },
  {
    Icon: Headset,
    title: "Gestão completa",
    desc: "Cuidamos de todo o processo até você começar a economizar. Suporte especializado.",
  },
];

/* ── FAQ data ────────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Como funciona a Geração Distribuída?",
    a: "A GD permite que você consuma energia produzida por fazendas solares parceiras e receba o desconto diretamente na sua fatura da distribuidora. Não é necessária nenhuma instalação no seu imóvel.",
  },
  {
    q: "Preciso trocar minha distribuidora?",
    a: "Não. Sua distribuidora continua sendo a mesma. A TrocarLuz negocia com fornecedores de GD credenciados pela ANEEL e o desconto aparece na sua conta habitual.",
  },
  {
    q: "Qual a economia média que posso esperar?",
    a: "Clientes residenciais economizam em média 18% na conta de luz por mês. Para empresas, a economia pode chegar a 30% dependendo do volume de consumo e da modalidade contratada.",
  },
  {
    q: "O que muda em 2027 para residências?",
    a: "A partir de dezembro de 2027, consumidores residenciais poderão migrar para o Mercado Livre de Energia e escolher seu fornecedor. Como broker certificado CCEE, a TrocarLuz gerenciará todo o processo.",
  },
];

/* ── FAQ accordion ───────────────────────────────────────────────── */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      id="duvidas"
      aria-labelledby="faq-heading"
      style={{ backgroundColor: "#fff", padding: "var(--section-y) var(--gutter)" }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <Reveal>
          <h2
            id="faq-heading"
            style={{
              fontFamily: "var(--app-font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
              marginBottom: "clamp(32px, 5vw, 48px)",
            }}
          >
            Dúvidas frequentes
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-input)",
                    overflow: "hidden",
                    marginBottom: "8px",
                  }}
                >
                  <h3 style={{ margin: 0 }}>
                    <button
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        padding: "18px 20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "var(--ink)",
                        minHeight: "44px",
                      }}
                    >
                      <span>{item.q}</span>
                      <svg
                        aria-hidden="true"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        style={{
                          flexShrink: 0,
                          transition: "transform 0.25s ease",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          color: "rgba(26,36,16,0.40)",
                        }}
                      >
                        <path
                          d="M4 7l5 5 5-5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    style={{
                      maxHeight: isOpen ? "400px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "15px",
                        color: "rgba(26,36,16,0.65)",
                        lineHeight: "1.65",
                        padding: "0 20px 20px",
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Link
              href="/perguntas-frequentes"
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--green-text)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Ver todas as perguntas frequentes →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <Layout>
      <SEOHead
        title="TrocarLuz — Compare e Economize na Conta de Energia"
        description="Veja se dá pra pagar menos. Compare opções reais de energia para sua casa ou empresa em poucos passos. Sem complicação."
        schema={schema}
      />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HERO — full-bleed --env, ghost heading, overlap cards    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--env)",
          padding: "0 var(--gutter)",
          paddingTop: "clamp(100px, 14vw, 140px)",
          paddingBottom: "clamp(10rem, 22vw, 17rem)",
          ...DOT_TEXTURE,
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <h1
            id="hero-heading"
            style={{
              fontFamily: "var(--app-font-display)",
              fontWeight: 700,
              fontSize: "clamp(3.25rem, 8vw, 6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}
          >
            <span style={{ display: "block", color: "var(--ink)" }}>
              Compare e economize na sua conta
            </span>
            <span style={{ display: "block", color: "var(--env-soft)" }}>
              de energia.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.6,
              color: "rgba(26,36,16,0.75)",
              maxWidth: "560px",
              marginBottom: "40px",
            }}
          >
            Geração distribuída já disponível para reduzir sua conta agora. E a partir de
            dezembro de 2027, ajudamos você a migrar para o mercado livre de energia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link
              href="/comparar-desconto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                color: "var(--green-text)",
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "15px",
                padding: "15px 32px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "background 0.15s, transform 0.1s",
                boxShadow: "0 2px 8px rgba(26,36,16,0.10)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#F5F5F0";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#fff";
                el.style.transform = "";
              }}
            >
              Ver desconto disponível
            </Link>
            <Link
              href="/enviar-conta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                color: "var(--ink)",
                border: "1.5px solid var(--ink)",
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "15px",
                padding: "15px 32px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "background 0.15s, transform 0.1s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(26,36,16,0.07)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.transform = "";
              }}
            >
              Enviar conta de luz
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ShieldCheck size={18} weight="fill" style={{ color: "var(--green)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "14px",
                color: "rgba(26,36,16,0.70)",
              }}
            >
              Broker certificado CCEE · Mais de 12 mil comparações feitas
            </span>
          </div>
        </div>
      </section>

      {/* Overlap cards — rise into hero/white boundary */}
      <section
        aria-label="Comece agora"
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "calc(clamp(120px, 18vw, 200px) * -1)",
          padding: "0 var(--gutter)",
          paddingBottom: "var(--section-y)",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              color: "rgba(26,36,16,0.55)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Comece agora
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Card — Residências */}
            <Reveal delay={0.04}>
              <Link href="/para-sua-casa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    backgroundColor: "#E8F4E2",
                    borderRadius: "var(--r-card)",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 20px 56px rgba(26,36,16,0.12)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 28px 72px rgba(26,36,16,0.17)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 20px 56px rgba(26,36,16,0.12)";
                  }}
                >
                  {/* Placeholder image slot — bottom right */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "160px",
                      height: "160px",
                      backgroundImage: "url(/img/hero-casa.webp)",
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      borderRadius: "var(--r-card) 0 0 0",
                      opacity: 0.65,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
                    <House size={18} weight="bold" style={{ color: "var(--green)" }} />
                    <span
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: "var(--green-text)",
                      }}
                    >
                      Para sua casa
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--app-font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(22px, 3vw, 30px)",
                      color: "var(--ink)",
                      margin: 0,
                      position: "relative",
                    }}
                  >
                    Residências
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "15px",
                      color: "rgba(26,36,16,0.70)",
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                      position: "relative",
                      maxWidth: "calc(100% - 120px)",
                    }}
                  >
                    Geração Distribuída já disponível para reduzir sua conta sem obras ou
                    instalações. Conectamos você a energia solar de fazendas parceiras.
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      padding: "11px 22px",
                      borderRadius: "999px",
                      backgroundColor: "var(--green)",
                      color: "#fff",
                      fontFamily: "var(--app-font-sans)",
                      fontWeight: 600,
                      fontSize: "14px",
                      position: "relative",
                    }}
                  >
                    Quero economizar →
                  </span>
                </article>
              </Link>
            </Reveal>

            {/* Card — Empresas */}
            <Reveal delay={0.10}>
              <Link href="/para-sua-empresa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    backgroundColor: "#EAF0F7",
                    borderRadius: "var(--r-card)",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 20px 56px rgba(26,36,16,0.12)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 28px 72px rgba(26,36,16,0.17)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 20px 56px rgba(26,36,16,0.12)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Buildings size={18} weight="bold" style={{ color: "#2C5F8A" }} />
                    <span
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 600,
                        fontSize: "11px",
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: "#2C5F8A",
                      }}
                    >
                      Para sua empresa
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--app-font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(22px, 3vw, 30px)",
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    Empresas
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "15px",
                      color: "rgba(26,36,16,0.70)",
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    GD + Mercado Livre de Energia para reduzir custos operacionais. Análise
                    gratuita do seu perfil de consumo e gestão completa da migração.
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      padding: "11px 22px",
                      borderRadius: "999px",
                      backgroundColor: "var(--ink)",
                      color: "#fff",
                      fontFamily: "var(--app-font-sans)",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Analisar minha empresa →
                  </span>
                </article>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. URGENCY STRIP — --signal, slim                          */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Aviso sobre abertura do mercado livre"
        style={{ backgroundColor: "var(--signal)" }}
      >
        <div
          style={{
            maxWidth: "var(--container)",
            margin: "0 auto",
            padding: "18px var(--gutter)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", flex: 1, minWidth: 0 }}>
            <Lightning
              size={22}
              weight="fill"
              style={{ color: "var(--ink)", flexShrink: 0, marginTop: "2px" }}
            />
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--ink)",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              A partir de dezembro de 2027, consumidores residenciais poderão escolher seu
              fornecedor — mas só através de um broker certificado. Somos esse broker.
            </p>
          </div>
          <Link
            href="/energia-2028"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 600,
              fontSize: "14px",
              color: "var(--ink)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Saiba como →
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. COMPARE — WHITE, giant two-tone word                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="compare-heading"
        style={{
          backgroundColor: "#fff",
          padding: "clamp(6rem, 12vw, 9rem) var(--gutter)",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <Reveal>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "12px",
                color: "rgba(26,36,16,0.50)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              O que você quer comparar?
            </p>
            <div
              id="compare-heading"
              aria-label="Compare"
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(4rem, 13vw, 11rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.03em",
                marginBottom: "clamp(48px, 6vw, 72px)",
                userSelect: "none",
              }}
            >
              <span style={{ color: "var(--ink)" }}>Compa</span>
              <span style={{ color: "var(--green)" }}>re</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.06}>
              <Link href="/geracao-distribuida" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-card)",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(26,36,16,0.06)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 12px 32px rgba(26,36,16,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 2px 8px rgba(26,36,16,0.06)";
                  }}
                >
                  <div
                    style={{
                      background: "rgba(31,164,89,0.07)",
                      padding: "28px 28px 20px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--app-font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(36px, 5vw, 52px)",
                        color: "var(--green)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      até 35% off
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#fff",
                        backgroundColor: "var(--green)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      Disponível agora
                    </span>
                  </div>
                  <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Sun size={20} weight="bold" style={{ color: "var(--green)", flexShrink: 0 }} />
                      <h3
                        style={{
                          fontFamily: "var(--app-font-display)",
                          fontWeight: 600,
                          fontSize: "20px",
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        Geração Distribuída
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "15px",
                        color: "rgba(26,36,16,0.65)",
                        lineHeight: "1.6",
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      Economize na conta de luz hoje com energia solar compartilhada, sem obras
                      e sem custo de instalação.
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "13px 24px",
                        borderRadius: "999px",
                        backgroundColor: "var(--green)",
                        color: "#fff",
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 500,
                        fontSize: "15px",
                        marginTop: "4px",
                      }}
                    >
                      Comparar GD →
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <Link href="/mercado-livre-energia" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r-card)",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(26,36,16,0.06)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = "0 12px 32px rgba(26,36,16,0.10)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 2px 8px rgba(26,36,16,0.06)";
                  }}
                >
                  <div
                    style={{
                      background: "rgba(143,209,79,0.10)",
                      padding: "28px 28px 20px",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--app-font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(36px, 5vw, 52px)",
                        color: "var(--green-text)",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      até 30% off
                    </div>
                    <span
                      style={{
                        flexShrink: 0,
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "var(--green-text)",
                        backgroundColor: "rgba(31,164,89,0.12)",
                        borderRadius: "999px",
                        padding: "4px 12px",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.03em",
                        textTransform: "uppercase",
                      }}
                    >
                      A partir de 2027
                    </span>
                  </div>
                  <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Lightning size={20} weight="bold" style={{ color: "var(--green-text)", flexShrink: 0 }} />
                      <h3
                        style={{
                          fontFamily: "var(--app-font-display)",
                          fontWeight: 600,
                          fontSize: "20px",
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        Mercado Livre de Energia
                      </h3>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--app-font-sans)",
                        fontSize: "15px",
                        color: "rgba(26,36,16,0.65)",
                        lineHeight: "1.6",
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      Escolha seu fornecedor de energia com contrato direto e reduza
                      drasticamente os custos operacionais da sua empresa.
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "13px 24px",
                        borderRadius: "999px",
                        backgroundColor: "var(--ink)",
                        color: "#fff",
                        fontFamily: "var(--app-font-sans)",
                        fontWeight: 500,
                        fontSize: "15px",
                        marginTop: "4px",
                      }}
                    >
                      Ver mercado livre →
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. COMO FUNCIONA — two-col: heading+render | numbered steps */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="como-heading"
        style={{ backgroundColor: "var(--cream)", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="como-grid">
            {/* Left col */}
            <div>
              <Reveal>
                <h2
                  id="como-heading"
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: "32px",
                  }}
                >
                  Como funciona
                </h2>
              </Reveal>
              {/* 3D render image slot */}
              <Reveal delay={0.08}>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    backgroundColor: "var(--tint)",
                    backgroundImage: "url(/img/obj-raio.webp)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  aria-hidden="true"
                />
              </Reveal>
            </div>

            {/* Right col: numbered steps */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                {
                  n: "01",
                  title: "Informe",
                  desc: "Nos informe sua conta de luz e onde você mora. Leva menos de 1 minuto.",
                },
                {
                  n: "02",
                  title: "Compare",
                  desc: "Analisamos as melhores opções de GD e mercado livre disponíveis no seu estado.",
                },
                {
                  n: "03",
                  title: "Troque",
                  desc: "Nosso time cuida de tudo. Em até 72h você já começa a economizar.",
                },
              ].map((step, i) => (
                <Reveal key={step.n} delay={0.06 * i}>
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      padding: "clamp(20px, 3vw, 32px) 0",
                      borderTop: i === 0 ? "none" : "1px solid rgba(26,36,16,0.12)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--app-font-display)",
                        fontWeight: 700,
                        fontSize: "clamp(52px, 7vw, 72px)",
                        color: "var(--signal)",
                        lineHeight: 1,
                        flexShrink: 0,
                        letterSpacing: "-0.02em",
                        width: "72px",
                        textAlign: "right",
                      }}
                    >
                      {step.n}
                    </div>
                    <div style={{ paddingTop: "4px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--app-font-display)",
                          fontWeight: 700,
                          fontSize: "clamp(18px, 2vw, 22px)",
                          color: "var(--ink)",
                          margin: "0 0 8px",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "15px",
                          color: "rgba(26,36,16,0.65)",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. STATS — --tint band, count-up                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Números TrocarLuz"
        style={{ backgroundColor: "var(--tint)", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value={12000} suffix="+" label="Comparações feitas" />
            <StatItem value={18} suffix="%" label="Economia média" />
            <StatItem value={27} suffix="" label="Estados cobertos" />
            <StatItem value={100} suffix="%" label="Online — sem visita" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 6. POR QUÊ — full-bleed --env, ghost word, reason cards    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="porque-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--env)",
          padding: "var(--section-y) var(--gutter)",
          ...DOT_TEXTURE,
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          {/* Heading + ghost word block */}
          <div style={{ position: "relative", marginBottom: "clamp(48px, 7vw, 72px)" }}>
            {/* Ghost "Economia" behind heading */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(5rem, 18vw, 14rem)",
                color: "var(--env-soft)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 0,
              }}
            >
              Economia
            </div>

            {/* Scattered photo cutouts (hidden below 900px) */}
            {[
              { src: "/img/cutout-1.webp", style: { top: "-20px", left: "2%", transform: "rotate(-5deg)" } as React.CSSProperties },
              { src: "/img/cutout-2.webp", style: { top: "-10px", right: "4%", transform: "rotate(4deg)" } as React.CSSProperties },
              { src: "/img/cutout-3.webp", style: { top: "50%", left: "-1%", transform: "rotate(-3deg) translateY(-50%)" } as React.CSSProperties },
              { src: "/img/cutout-4.webp", style: { top: "55%", right: "-1%", transform: "rotate(6deg) translateY(-50%)" } as React.CSSProperties },
              { src: "/img/cutout-5.webp", style: { bottom: "-10px", left: "28%", transform: "rotate(-4deg)" } as React.CSSProperties },
            ].map((c, i) => (
              <div
                key={i}
                className="pq-cutout"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: "clamp(120px, 12vw, 180px)",
                  height: "clamp(140px, 14vw, 210px)",
                  borderRadius: "18px",
                  backgroundColor: "rgba(26,36,16,0.06)",
                  backgroundImage: `url(${c.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 12px 32px rgba(26,36,16,0.14)",
                  zIndex: 1,
                  ...c.style,
                }}
              />
            ))}

            {/* Heading centred, above ghost */}
            <Reveal>
              <h2
                id="porque-heading"
                style={{
                  position: "relative",
                  zIndex: 2,
                  fontFamily: "var(--app-font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 5vw, 3.75rem)",
                  color: "var(--ink)",
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                  padding: "clamp(20px, 4vw, 40px) clamp(120px, 18vw, 220px)",
                  lineHeight: 1.1,
                  marginBottom: 0,
                }}
              >
                Por que a TrocarLuz?
              </h2>
            </Reveal>
          </div>

          {/* Reason cards — 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_REASONS.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                    padding: "clamp(20px, 3vw, 28px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "0 4px 16px rgba(26,36,16,0.08)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      backgroundColor: "var(--tint)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} weight="bold" style={{ color: "var(--green-text)" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--app-font-display)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "14px",
                      color: "rgba(26,36,16,0.68)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "clamp(32px, 5vw, 48px)" }}>
              <Link
                href="/sobre"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "var(--app-font-sans)",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--green-text)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Fale com nosso time →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 7. LEAD FORM — --cream, two-col                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="lead-form-heading"
        style={{ backgroundColor: "var(--cream)", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <Reveal>
                <h2
                  id="lead-form-heading"
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "var(--ink)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "20px",
                  }}
                >
                  Sua conta de luz está alta demais?
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "16px",
                    color: "rgba(26,36,16,0.70)",
                    lineHeight: 1.65,
                    marginBottom: "32px",
                  }}
                >
                  Preencha o formulário e nosso time analisa gratuitamente as melhores opções
                  de economia para o seu perfil. Sem compromisso.
                </p>
              </Reveal>

              <Reveal delay={0.10}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
                  {[
                    "Sem obras, sem instalações no seu imóvel",
                    "Desconto direto na conta da distribuidora",
                    "Processo 100% online e sem burocracia",
                  ].map((benefit) => (
                    <div
                      key={benefit}
                      style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
                    >
                      <Lightning
                        size={18}
                        weight="fill"
                        style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "15px",
                          color: "rgba(26,36,16,0.75)",
                        }}
                      >
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "var(--green)",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "10px 20px",
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  <ShieldCheck size={16} weight="fill" />
                  Clientes economizam em média 18% na conta
                </div>
              </Reveal>
            </div>

            {/* Right: form card */}
            <Reveal delay={0.08}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "var(--r-card)",
                  padding: "clamp(24px, 4vw, 40px)",
                  boxShadow: "0 8px 32px rgba(26,36,16,0.10)",
                }}
              >
                <LeadForm type="residential" sourcePage="home" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 8. CTA BAND — full-bleed --env, giant "Pronto"             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--env)",
          padding: "var(--section-y) var(--gutter)",
          textAlign: "center",
          ...DOT_TEXTURE,
        }}
      >
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <h2
              id="cta-heading"
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  color: "var(--ink)",
                  lineHeight: 0.88,
                }}
              >
                Pronto
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "var(--env-soft)",
                  lineHeight: 1.15,
                  marginTop: "12px",
                }}
              >
                para pagar menos?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                color: "rgba(26,36,16,0.70)",
                lineHeight: "1.6",
                marginBottom: "36px",
              }}
            >
              Compare suas opções agora. Sem custo, sem compromisso.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Link
              href="/comparar-desconto"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "16px 48px",
                borderRadius: "999px",
                backgroundColor: "#fff",
                color: "var(--green-text)",
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(26,36,16,0.12)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 24px rgba(26,36,16,0.18)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "";
                el.style.boxShadow = "0 4px 16px rgba(26,36,16,0.12)";
              }}
            >
              Comparar agora
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 9. FAQ                                                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <FaqSection />
    </Layout>
  );
}
