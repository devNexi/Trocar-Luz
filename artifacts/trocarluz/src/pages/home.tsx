import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Lightning, ShieldCheck, House, Buildings } from "@phosphor-icons/react";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";

/* ── Parallax hook ───────────────────────────────────────────────── */
function useParallax(factor = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const onScroll = () => setOffset(window.scrollY * factor);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);
  return offset;
}

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
          color: "var(--bg-invert)",
          letterSpacing: "-0.02em",
          marginBottom: "12px",
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
          color: "var(--text-muted)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Squircle tile card ──────────────────────────────────────────── */
function TileCard({
  href,
  discount,
  badge,
  title,
  description,
  cta,
  accentColor,
  Icon,
  svgBg,
}: {
  href: string;
  discount: string;
  badge: string;
  title: string;
  description: string;
  cta: string;
  accentColor: string;
  Icon: React.ElementType;
  svgBg?: React.ReactElement;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <article
        className="tile-card flex flex-col h-full cursor-pointer"
        style={{ borderLeft: `4px solid ${accentColor}` }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}
      >
        {/* Header band */}
        <div
          style={{
            background: `${accentColor}12`,
            padding: "28px 28px 20px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            minHeight: "160px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {svgBg && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-4px",
                right: "-4px",
                width: "130px",
                height: "100px",
                color: accentColor,
                opacity: 0.10,
                pointerEvents: "none",
              }}
            >
              {svgBg}
            </div>
          )}
          <div
            style={{
              fontFamily: "var(--app-font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 52px)",
              color: accentColor,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {discount}
          </div>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--app-font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              color: "#fff",
              backgroundColor: accentColor,
              borderRadius: "999px",
              padding: "4px 12px",
              whiteSpace: "nowrap",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon size={20} weight="bold" style={{ color: accentColor, flexShrink: 0 }} />
            <h3
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 600,
                fontSize: "20px",
                color: "var(--text)",
                margin: 0,
              }}
            >
              {title}
            </h3>
          </div>
          <p
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "15px",
              color: "var(--text-muted)",
              lineHeight: "1.6",
              margin: 0,
              flex: 1,
            }}
          >
            {description}
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
              transition: "background 0.15s ease",
              marginTop: "4px",
            }}
          >
            {cta}
          </div>
        </div>
      </article>
    </Link>
  );
}

/* ── Page ────────────────────────────────────────────────────────── */
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TrocarLuz",
  url: "https://trocarluz.com.br",
  logo: "https://trocarluz.com.br/favicon.png",
  description:
    "Compare e economize na conta de energia. Geração distribuída e mercado livre no Brasil.",
};

export default function Home() {

  return (
    <Layout>
      <SEOHead
        title="TrocarLuz — Compare e Economize na Conta de Energia"
        description="Veja se dá pra pagar menos. Compare opções reais de energia para sua casa ou empresa em poucos passos. Sem complicação."
        schema={schema}
      />

      {/* ── A. HERO ── flat yellow, no illustration */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--hero-env)",
          padding: "0 var(--gutter)",
          paddingTop: "120px",
          paddingBottom: "clamp(9rem, 20vw, 15rem)",
        }}
      >
        {/* Faint dot texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(26,36,16,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--container)", margin: "0 auto" }}>
          <h1
            id="hero-heading"
            style={{
              fontFamily: "var(--app-font-display)",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 8.5vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              marginBottom: "28px",
            }}
          >
            <span style={{ display: "block", color: "var(--ink-on-env)" }}>
              Compare e economize na sua conta
            </span>
            <span style={{ display: "block", color: "var(--hero-env-soft)" }}>
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
            Geração distribuída já disponível para reduzir sua conta agora. E a partir de dezembro de 2027, ajudamos você a migrar para o mercado livre de energia.
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
                transition: "background 0.15s ease, transform 0.1s ease",
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
                color: "var(--ink-on-env)",
                border: "1.5px solid var(--ink-on-env)",
                fontFamily: "var(--app-font-sans)",
                fontWeight: 600,
                fontSize: "15px",
                padding: "15px 32px",
                borderRadius: "999px",
                textDecoration: "none",
                transition: "background 0.15s ease, transform 0.1s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(26,36,16,0.08)";
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
            <span style={{ fontFamily: "var(--app-font-sans)", fontSize: "14px", color: "rgba(26,36,16,0.70)" }}>
              Broker certificado CCEE · Mais de 12 mil comparações feitas
            </span>
          </div>
        </div>
      </section>

      {/* ── A2. OVERLAP CARDS ── rise into hero/white boundary */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          marginTop: "calc(clamp(120px, 18vw, 180px) * -1)",
          padding: "0 var(--gutter)",
          paddingBottom: "var(--section-y)",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="grid md:grid-cols-2 gap-5">
            <Reveal delay={0.05}>
              <Link href="/para-sua-casa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    backgroundColor: "var(--bg-green-tint)",
                    borderRadius: "20px",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 20px 56px rgba(14,21,37,0.12)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 28px 72px rgba(14,21,37,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 20px 56px rgba(14,21,37,0.12)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Residências
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "15px",
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    Geração Distribuída já disponível para reduzir sua conta sem obras ou instalações. Conectamos você a energia solar de fazendas parceiras.
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
                    }}
                  >
                    Quero economizar →
                  </span>
                </article>
              </Link>
            </Reveal>

            <Reveal delay={0.12}>
              <Link href="/para-sua-empresa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  style={{
                    backgroundColor: "#EAF0F7",
                    borderRadius: "20px",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    boxShadow: "0 20px 56px rgba(14,21,37,0.12)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 28px 72px rgba(14,21,37,0.18)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 20px 56px rgba(14,21,37,0.12)";
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
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    Empresas
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "15px",
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                      margin: 0,
                      flex: 1,
                    }}
                  >
                    GD + Mercado Livre de Energia para reduzir custos operacionais. Análise gratuita do seu perfil de consumo e gestão completa da migração.
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

      {/* ── B. URGENCY BAR ─────────────────────────────────────────── */}
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
              style={{ color: "var(--yellow-ink)", flexShrink: 0, marginTop: "2px" }}
            />
            <p
              style={{
                fontFamily: "var(--app-font-sans)",
                fontWeight: 500,
                fontSize: "15px",
                color: "var(--yellow-ink)",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              A partir de dezembro de 2027, consumidores residenciais poderão escolher seu fornecedor — mas só através de um broker certificado. Somos esse broker.
            </p>
          </div>
          <Link
            href="/energia-2028"
            style={{
              fontFamily: "var(--app-font-sans)",
              fontWeight: 600,
              fontSize: "14px",
              color: "var(--yellow-ink)",
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

      {/* ── D. CATEGORY TILES ──────────────────────────────────────── */}
      <section aria-labelledby="compare-heading" style={{ backgroundColor: "#fff", padding: "var(--section-y) var(--gutter)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <Reveal>
            <h2
              id="compare-heading"
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text)",
                marginBottom: "clamp(32px, 5vw, 48px)",
                letterSpacing: "-0.02em",
              }}
            >
              O que você quer comparar?
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0.05}>
              <TileCard
                href="/para-sua-casa"
                discount="até 35% off"
                badge="Disponível agora"
                title="Geração Distribuída"
                description="Disponível agora para residências e empresas. Energia solar de fazendas parceiras com desconto direto na sua conta. Zero instalação, zero obras."
                cta="Quero economizar →"
                accentColor="var(--green)"
                Icon={House}
                svgBg={
                  <svg viewBox="0 0 130 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="65" cy="50" r="48" opacity="0.4"/>
                    <path d="M65 10 L55 30 L75 30 Z" opacity="0.7"/>
                    <path d="M65 90 L55 70 L75 70 Z" opacity="0.7"/>
                    <path d="M25 50 L45 40 L45 60 Z" opacity="0.7"/>
                    <path d="M105 50 L85 40 L85 60 Z" opacity="0.7"/>
                    <circle cx="65" cy="50" r="16" opacity="0.9"/>
                  </svg>
                }
              />
            </Reveal>
            <Reveal delay={0.12}>
              <TileCard
                href="/para-sua-empresa"
                discount="até 30% off"
                badge="Para empresas"
                title="Mercado Livre de Energia"
                description="Aberto para empresas agora. Para residências a partir de dezembro de 2027. Como broker certificado CCEE, gerenciamos toda a sua migração."
                cta="Analisar minha empresa →"
                accentColor="var(--green)"
                Icon={Buildings}
                svgBg={
                  <svg viewBox="0 0 130 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="20" y="30" width="50" height="55" rx="3" opacity="0.35"/>
                    <rect x="30" y="20" width="30" height="65" rx="2" opacity="0.55"/>
                    <rect x="40" y="10" width="10" height="75" rx="1" opacity="0.3"/>
                    <path d="M80 25 L72 48 L82 48 L70 75 L90 45 L79 45 Z" opacity="0.85"/>
                  </svg>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── C. HOW IT WORKS ────────────────────────────────────────── */}
      <section
        aria-labelledby="como-funciona-heading"
        style={{ backgroundColor: "#fff", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <Reveal>
            <h2
              id="como-funciona-heading"
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--text)",
                textAlign: "center",
                marginBottom: "clamp(48px, 8vw, 80px)",
                letterSpacing: "-0.02em",
              }}
            >
              Como funciona
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 relative">
            {/* Connecting line */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute"
              style={{
                top: "72px",
                left: "calc(100% / 6)",
                right: "calc(100% / 6)",
                height: "1px",
                backgroundColor: "rgba(14,21,37,0.12)",
              }}
            />

            {[
              {
                n: "01",
                title: "Informe",
                desc: "Nos diga seu estado, sua distribuidora e seu consumo médio. Analisamos sua elegibilidade para GD agora e para o mercado livre em 2027.",
              },
              {
                n: "02",
                title: "Compare",
                desc: "Mostramos as opções reais disponíveis para o seu perfil — economia garantida hoje via GD, e as melhores ofertas do mercado livre quando abrir para você.",
              },
              {
                n: "03",
                title: "Troque",
                desc: "A TrocarLuz é seu broker certificado. Cuidamos de todo o processo de migração — da notificação à distribuidora até a assinatura com seu novo fornecedor.",
              },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 0.1}>
                <div
                  className="relative z-10 flex flex-col items-center text-center"
                  style={{ padding: "0 clamp(16px, 3vw, 40px)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--app-font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(64px, 9vw, 96px)",
                      color: "var(--signal)",
                      lineHeight: 1,
                      marginBottom: "20px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.n}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--app-font-display)",
                      fontWeight: 600,
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      color: "var(--text)",
                      marginBottom: "12px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--app-font-sans)",
                      fontSize: "16px",
                      color: "var(--text-muted)",
                      lineHeight: "1.65",
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── E. STATS BAND ──────────────────────────────────────────── */}
      <section
        aria-label="Números da TrocarLuz"
        style={{ backgroundColor: "var(--bg-green-tint)", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal delay={0}>
              <StatItem value={12000} suffix="+" label="Comparações feitas" />
            </Reveal>
            <Reveal delay={0.07}>
              <StatItem value={18} suffix="%" label="Economia média por cliente" />
            </Reveal>
            <Reveal delay={0.14}>
              <StatItem value={27} suffix="" label="Estados cobertos" />
            </Reveal>
            <Reveal delay={0.21}>
              <StatItem value={100} suffix="%" label="Parceiros verificados" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── G. LEAD FORM ───────────────────────────────────────────── */}
      <section
        aria-labelledby="lead-form-heading"
        style={{ backgroundColor: "var(--bg-alt)", padding: "var(--section-y) var(--gutter)" }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="grid md:grid-cols-[55fr_45fr] gap-12 items-start">
            {/* Left: copy */}
            <div>
              <Reveal>
                <h2
                  id="lead-form-heading"
                  style={{
                    fontFamily: "var(--app-font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "var(--text)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "0 0 20px",
                  }}
                >
                  Sua conta de luz está alta demais?
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p
                  style={{
                    fontFamily: "var(--app-font-sans)",
                    fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
                    color: "var(--text-muted)",
                    lineHeight: "1.7",
                    marginBottom: "28px",
                  }}
                >
                  A Geração Distribuída (GD) permite que você use energia solar de fazendas parceiras e receba desconto direto na conta da sua distribuidora.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    "Zero investimento ou obras",
                    "A energia continua chegando pela mesma rede",
                    "Economia garantida todos os meses",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <Lightning
                        size={20}
                        weight="fill"
                        style={{ color: "var(--lime)", flexShrink: 0, marginTop: "2px" }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--app-font-sans)",
                          fontSize: "16px",
                          color: "var(--text)",
                          lineHeight: "1.6",
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "var(--green)",
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "9px 20px",
                    fontFamily: "var(--app-font-sans)",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.01em",
                  }}
                >
                  Clientes economizam em média 18% na conta
                </span>
              </Reveal>
            </div>

            {/* Right: form card */}
            <Reveal delay={0.08}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "var(--r-card)",
                  boxShadow: "var(--shadow-md)",
                  overflow: "hidden",
                }}
              >
                <LeadForm type="residential" sourcePage="home" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── I. CTA BAND ── flat hero-env, oversized two-tone word */}
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--hero-env)",
          padding: "var(--section-y) var(--gutter)",
          textAlign: "center",
        }}
      >
        {/* Dot texture matching hero */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(26,36,16,0.06) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <h2
              id="cta-heading"
              style={{
                fontFamily: "var(--app-font-display)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  color: "var(--ink-on-env)",
                  lineHeight: 0.88,
                }}
              >
                Pronto
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  color: "rgba(26,36,16,0.45)",
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

      {/* ── J. FAQ ─────────────────────────────────────────────────── */}
      <FaqSection />
    </Layout>
  );
}

/* ── Accordion FAQ ───────────────────────────────────────────────── */
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
              color: "var(--text)",
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
                    border: "1px solid var(--border-light)",
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
                        color: "var(--text)",
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
                          color: "var(--text-muted)",
                        }}
                      >
                        <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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
                        color: "var(--text-muted)",
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
