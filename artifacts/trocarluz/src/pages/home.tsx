import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  TrendDown,
} from "@phosphor-icons/react";
import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";

/* ── Dot texture helper ──────────────────────────────────────────── */
const DOT_TEXTURE: React.CSSProperties = {
  backgroundImage: "radial-gradient(rgba(26,36,16,0.10) 1.5px, transparent 1.5px)",
  backgroundSize: "22px 22px",
};

/* ── Layered card shadow ─────────────────────────────────────────── */
const CARD_SHADOW = "0 10px 34px rgba(26,36,16,.10), 0 2px 6px rgba(26,36,16,.06)";
const CARD_SHADOW_HOVER = "0 24px 56px rgba(26,36,16,.16), 0 4px 10px rgba(26,36,16,.08)";

/* ── FloatImg ────────────────────────────────────────────────────── */
/* Three multi-axis float variants — A & B are energetic (hero/corners),
   C is slower with a big rotate sweep. Assigned by index at call sites. */
const FLOAT_VARIANTS = {
  a: {
    animate: { y: [0, -22, 0, -12, 0], x: [0, 8, 0, -6, 0], rotate: [-3, 4, -2, 3, -3], scale: [1, 1.04, 1, 1.02, 1] },
    transition: { duration: 7, ease: "easeInOut" as const, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] },
  },
  b: {
    animate: { y: [0, 18, 0, 24, 0], x: [0, -10, 0, 6, 0], rotate: [2, -5, 3, -3, 2], scale: [1, 1.03, 1, 1.05, 1] },
    transition: { duration: 8.5, ease: "easeInOut" as const, repeat: Infinity },
  },
  c: {
    animate: { y: [0, -16, 0], rotate: [-6, 6, -6], scale: [1, 1.05, 1] },
    transition: { duration: 6, ease: "easeInOut" as const, repeat: Infinity },
  },
};

interface FloatImgProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  floatVariant?: "a" | "b" | "c";
  animDelay?: string;
  parallaxStrength?: number;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  className?: string;
  loading?: "eager" | "lazy";
}

function FloatImg({
  src,
  alt = "",
  width,
  height,
  floatVariant = "a",
  animDelay = "0s",
  parallaxStrength = 16,
  style,
  imgStyle,
  className,
  loading = "lazy",
}: FloatImgProps) {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef(0);
  const rafRef = useRef<number>(0);
  const delaySeconds = parseFloat(animDelay) || 0;

  const variant = FLOAT_VARIANTS[floatVariant];
  const floatAnimate = prefersReduced ? {} : variant.animate;
  const floatTransition = prefersReduced
    ? {}
    : { ...variant.transition, delay: delaySeconds };

  /* ── scroll parallax ─────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReduced || parallaxStrength === 0) return;

    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const val = (center / window.innerHeight) * parallaxStrength * -1;
      if (Math.abs(val - parallaxRef.current) > 0.1) {
        parallaxRef.current = val;
        el.style.setProperty("--py", `${val.toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [parallaxStrength, prefersReduced]);

  /* Extract any transform from external style so we can combine it with parallax */
  const { transform: externalTransform, ...restStyle } = style ?? {};

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        transform: externalTransform
          ? `translateY(var(--py, 0px)) ${externalTransform}`
          : "translateY(var(--py, 0px))",
        transition: "transform 0.08s linear",
        width,
        height,
        ...restStyle,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        width={typeof width === "number" ? width : undefined}
        height={typeof height === "number" ? height : undefined}
        animate={floatAnimate}
        transition={floatTransition}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          transformBox: "fill-box",
          transformOrigin: "center",
          willChange: prefersReduced ? "auto" : "transform",
          ...imgStyle,
        }}
      />
    </div>
  );
}

/* ── CollageTile — floating photo/object for Payard-style "Por que" ─ */
interface CollageTileProps {
  src: string;
  size: string;
  baseRot: number;
  delay: number;
  duration: number;
  parallaxRange: [number, number];
  style?: React.CSSProperties;
  className?: string;
  energetic?: boolean;
  isPhoto?: boolean;
  calm?: boolean;
}

function CollageTile({
  src,
  size,
  baseRot,
  delay,
  duration,
  parallaxRange,
  style,
  className,
  energetic = false,
  isPhoto = false,
  calm = false,
}: CollageTileProps) {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], parallaxRange);

  const floatAnim = prefersReduced
    ? {}
    : calm
    ? { y: [0, -10, 0], rotate: [baseRot, baseRot, baseRot] }
    : energetic
    ? {
        y: [0, -22, 0, -12, 0],
        x: [0, 10, 0, -6, 0],
        rotate: [baseRot - 5, baseRot + 5, baseRot - 3, baseRot + 4, baseRot - 5],
        scale: [1, 1.05, 1, 1.03, 1],
      }
    : {
        y: [0, -14, 0, -8, 0],
        x: [0, 6, 0, -5, 0],
        rotate: [baseRot - 2, baseRot + 2.5, baseRot - 1, baseRot + 1.5, baseRot - 2],
        scale: [1, 1.03, 1, 1.02, 1],
      };

  const floatTransition = prefersReduced
    ? {}
    : { duration, ease: "easeInOut" as const, repeat: Infinity, delay };

  return (
    <motion.div
      ref={wrapRef}
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        zIndex: 1,
        ...(prefersReduced ? {} : { y: scrollY }),
        ...style,
      }}
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        animate={floatAnim}
        transition={floatTransition}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: isPhoto ? "22%" : "20px",
          boxShadow: "0 18px 40px rgba(0,0,0,.12)",
          display: "block",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    </motion.div>
  );
}

/* ── Count-up hook ───────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1200) {
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
  {
    Icon: TrendDown,
    title: "Economia desde o 1º mês",
    desc: "Desconto na conta de luz já na primeira fatura. Sem espera, sem surpresa.",
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
      style={{ backgroundColor: "#fff", padding: "clamp(6rem,12vw,10rem) var(--gutter)" }}
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
              lineHeight: 0.96,
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
                      transition: "max-height 0.32s ease",
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
  /* ── Hero card hover state (to nudge internal image) ─── */
  const prefersReduced = useReducedMotion();
  const [casaHover, setCasaHover] = useState(false);
  const [empresaHover, setEmpresaHover] = useState(false);
  const [gdHover, setGdHover] = useState(false);
  const [mercadoHover, setMercadoHover] = useState(false);

  /* ── Giant-word parallax refs ──────────────────────────── */
  const compareSectionRef = useRef<HTMLElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const porqueSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: compareProg } = useScroll({
    target: compareSectionRef,
    offset: ["start end", "end start"],
  });
  const compareWordY = useTransform(compareProg, [0, 1], [28, -28]);

  const { scrollYProgress: ctaProg } = useScroll({
    target: ctaSectionRef,
    offset: ["start end", "end start"],
  });
  const ctaWordY = useTransform(ctaProg, [0, 1], [24, -24]);

  const { scrollYProgress: porqueProg } = useScroll({
    target: porqueSectionRef,
    offset: ["start end", "end start"],
  });
  const economiaY = useTransform(porqueProg, [0, 1], [20, -20]);

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
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1 id="hero-heading" style={{ margin: 0 }}>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
              style={{
                display: "block",
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(3.25rem, 8vw, 6rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: "4px",
              }}
            >
              Compare e economize na sua conta
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              style={{
                display: "block",
                fontFamily: "var(--app-font-display)",
                fontWeight: 700,
                fontSize: "clamp(3.25rem, 8vw, 6rem)",
                lineHeight: 0.96,
                letterSpacing: "-0.02em",
                color: "var(--env-soft)",
                marginBottom: "28px",
              }}
            >
              de energia.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.22 }}
            style={{
              fontFamily: "var(--app-font-sans)",
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              lineHeight: 1.6,
              color: "rgba(26,36,16,0.75)",
              maxWidth: "560px",
              marginBottom: "20px",
            }}
          >
            Geração distribuída já disponível para reduzir sua conta agora. E a partir de
            dezembro de 2027, ajudamos você a migrar para o mercado livre de energia.
          </motion.p>

          {/* ── Social-proof avatar cluster ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28 }}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}
          >
            <div style={{ display: "flex" }}>
              {["/img/person-1.webp", "/img/person-5.webp", "/img/person-8.webp"].map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--env)",
                    marginLeft: i === 0 ? 0 : "-12px",
                    position: "relative",
                    zIndex: 3 - i,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--ink)",
                lineHeight: 1.3,
              }}
            >
              Mais de 12 mil comparações feitas
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.34 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
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
                transition: "background 0.15s, transform 0.12s, box-shadow 0.12s",
                boxShadow: "0 2px 8px rgba(26,36,16,0.10)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#F5F5F0";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 6px 20px rgba(26,36,16,0.14)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#fff";
                el.style.transform = "";
                el.style.boxShadow = "0 2px 8px rgba(26,36,16,0.10)";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
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
                transition: "background 0.15s, transform 0.12s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(26,36,16,0.07)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.transform = "";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            >
              Enviar conta de luz
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.44 }}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <ShieldCheck size={18} weight="fill" style={{ color: "var(--green)", flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--app-font-sans)",
                fontSize: "14px",
                color: "rgba(26,36,16,0.70)",
              }}
            >
              Broker certificado CCEE
            </span>
          </motion.div>
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
          paddingBottom: "clamp(6rem,12vw,10rem)",
          background: "transparent",
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.54 }}
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
          </motion.p>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Card — Residências: 2-col grid — text left, render right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.56 }}
              style={{ height: "100%" }}
            >
              <Link href="/para-sua-casa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  className="hero-card-grid"
                  style={{
                    backgroundColor: "#E8F4E2",
                    borderRadius: "var(--r-card)",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "grid",
                    gridTemplateColumns: "58fr 42fr",
                    gap: "0",
                    boxShadow: CARD_SHADOW,
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    minHeight: "260px",
                  }}
                  onMouseEnter={(e) => {
                    setCasaHover(true);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = CARD_SHADOW_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    setCasaHover(false);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = CARD_SHADOW;
                  }}
                >
                  {/* LEFT: text column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center" }}>
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
                        color: "var(--ink)",
                        margin: 0,
                        lineHeight: 1.05,
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
                        transition: "background 0.15s",
                        marginTop: "4px",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.background = "var(--green-hover)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.background = "var(--green)"; }}
                    >
                      Quero economizar →
                    </span>
                  </div>

                  {/* RIGHT: render column — its own zone, no text behind it */}
                  <div
                    aria-hidden="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      transition: "transform 0.2s ease-out",
                      transform: casaHover ? "translateY(-5px)" : "translateY(0)",
                    }}
                  >
                    <motion.img
                      src="/img/hero-casa.webp"
                      alt=""
                      loading="eager"
                      decoding="async"
                      animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                      transition={prefersReduced ? {} : { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0 }}
                      style={{ width: "100%", maxWidth: "220px", aspectRatio: "1", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </article>
              </Link>
            </motion.div>

            {/* Card — Empresas: 2-col grid — text left, render right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
              style={{ height: "100%" }}
            >
              <Link href="/para-sua-empresa" style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <article
                  className="hero-card-grid"
                  style={{
                    backgroundColor: "#EAF0F7",
                    borderRadius: "var(--r-card)",
                    padding: "clamp(28px, 4vw, 44px)",
                    display: "grid",
                    gridTemplateColumns: "58fr 42fr",
                    gap: "0",
                    boxShadow: CARD_SHADOW,
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    height: "100%",
                    minHeight: "260px",
                  }}
                  onMouseEnter={(e) => {
                    setEmpresaHover(true);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = CARD_SHADOW_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    setEmpresaHover(false);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = CARD_SHADOW;
                  }}
                >
                  {/* LEFT: text column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px", justifyContent: "center" }}>
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
                        lineHeight: 1.05,
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
                        transition: "background 0.15s",
                        marginTop: "4px",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.background = "#2e3d20"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.background = "var(--ink)"; }}
                    >
                      Analisar minha empresa →
                    </span>
                  </div>

                  {/* RIGHT: render column — its own zone, no text behind it */}
                  <div
                    aria-hidden="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px",
                      transition: "transform 0.2s ease-out",
                      transform: empresaHover ? "translateY(-5px)" : "translateY(0)",
                    }}
                  >
                    <motion.img
                      src="/img/hero-empresa.webp"
                      alt=""
                      loading="eager"
                      decoding="async"
                      animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                      transition={prefersReduced ? {} : { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 0.6 }}
                      style={{ width: "100%", maxWidth: "220px", aspectRatio: "1", objectFit: "contain", display: "block" }}
                    />
                  </div>
                </article>
              </Link>
            </motion.div>
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
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Saiba como →
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. COMPARE — WHITE, giant two-tone word + parallax          */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        ref={compareSectionRef}
        aria-labelledby="compare-heading"
        style={{
          backgroundColor: "#fff",
          padding: "clamp(6rem, 12vw, 10rem) var(--gutter)",
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
            <motion.div
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
                y: compareWordY,
              }}
            >
              <span style={{ color: "var(--ink)" }}>Compa</span>
              <span style={{ color: "var(--green)" }}>re</span>
            </motion.div>
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
                    setGdHover(true);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = CARD_SHADOW_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    setGdHover(false);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 2px 8px rgba(26,36,16,0.06)";
                  }}
                >
                  {/* Header: discount heading | badge — no object here */}
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
                      até 25% off
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
                        marginTop: "6px",
                      }}
                    >
                      Disponível agora
                    </span>
                  </div>
                  {/* Body: text constrained to ~65%; render in its own right zone */}
                  <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
                    {/* obj-credito — right zone, y-only calm float + nudge on card hover */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "20px",
                        width: 110,
                        height: 110,
                        pointerEvents: "none",
                        transition: "transform 0.2s ease-out",
                        transform: gdHover ? "translateY(-5px)" : "translateY(0)",
                      }}
                    >
                      <motion.img
                        src="/img/obj-credito.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                        transition={prefersReduced ? {} : { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </div>
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
                        maxWidth: "65%",
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
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--green-hover)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--green)"; }}
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
                    setMercadoHover(true);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = CARD_SHADOW_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    setMercadoHover(false);
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "0 2px 8px rgba(26,36,16,0.06)";
                  }}
                >
                  {/* Header: discount heading | badge — no object here */}
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
                        marginTop: "6px",
                      }}
                    >
                      A partir de 2027
                    </span>
                  </div>
                  {/* Body: text constrained to ~65%; obj-mercado in its own right zone */}
                  <div style={{ padding: "20px 28px 28px", flex: 1, display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
                    {/* obj-mercado — right zone, y-only calm float + nudge on card hover */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "20px",
                        width: 110,
                        height: 110,
                        pointerEvents: "none",
                        transition: "transform 0.2s ease-out",
                        transform: mercadoHover ? "translateY(-5px)" : "translateY(0)",
                      }}
                    >
                      <motion.img
                        src="/img/obj-mercado.webp"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                        transition={prefersReduced ? {} : { duration: 5.5, ease: "easeInOut", repeat: Infinity, delay: 1.8 }}
                        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                      />
                    </div>
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
                        maxWidth: "65%",
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
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#2e3d20"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--ink)"; }}
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
      {/* 4. COMO FUNCIONA — two-col: heading+obj-fazenda | steps     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="como-heading"
        style={{ backgroundColor: "var(--cream)", padding: "clamp(6rem,12vw,10rem) var(--gutter)" }}
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
                    lineHeight: 0.96,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: "32px",
                  }}
                >
                  Como funciona
                </h2>
              </Reveal>
              {/* obj-fazenda — fills the large render box, static */}
              <Reveal delay={0.08}>
                <div
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                    backgroundColor: "var(--tint)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  aria-hidden="true"
                >
                  <img
                    src="/img/obj-fazenda.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "90%",
                      height: "90%",
                      objectFit: "contain",
                      padding: "16px",
                      display: "block",
                    }}
                  />
                </div>
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
        style={{ backgroundColor: "var(--tint)", padding: "clamp(6rem,12vw,10rem) var(--gutter)" }}
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
      {/* 6. POR QUÊ — full-bleed --env, ghost word, 3D objects       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        ref={porqueSectionRef}
        aria-labelledby="porque-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--env)",
          padding: "clamp(6rem,12vw,10rem) var(--gutter)",
          ...DOT_TEXTURE,
        }}
      >
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          {/* Collage container — 10 tiles, scattered positions, heading centred */}
          <div
            style={{
              position: "relative",
              minHeight: "680px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "clamp(48px, 7vw, 72px)",
            }}
          >
            {/* A — person-1, top-left, 188px */}
            <CollageTile
              src="/img/person-1.webp"
              size="clamp(96px,17vw,188px)"
              baseRot={-6}
              delay={0}
              duration={7}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              style={{ top: "4%", left: "5%" }}
            />
            {/* B — person-2, top-centre, 110px — desktop only */}
            <CollageTile
              src="/img/person-2.webp"
              size="110px"
              baseRot={10}
              delay={0.4}
              duration={7.2}
              parallaxRange={[10, -10]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "7%", left: "33%" }}
            />
            {/* C — person-5, upper-centre-right, 200px — desktop only */}
            <CollageTile
              src="/img/person-5.webp"
              size="200px"
              baseRot={0}
              delay={1.0}
              duration={6.8}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "3%", left: "56%" }}
            />
            {/* D — person-3, top-right, 120px */}
            <CollageTile
              src="/img/person-3.webp"
              size="clamp(84px,11vw,120px)"
              baseRot={7}
              delay={0.3}
              duration={7.5}
              parallaxRange={[10, -10]}
              isPhoto
              calm
              style={{ top: "9%", right: "4%" }}
            />
            {/* E — person-4, far-left flank, 130px — desktop only */}
            <CollageTile
              src="/img/person-4.webp"
              size="130px"
              baseRot={-8}
              delay={0.6}
              duration={8}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "49%", left: "2%" }}
            />
            {/* F — person-6, far-right flank, 152px — desktop only */}
            <CollageTile
              src="/img/person-6.webp"
              size="152px"
              baseRot={4}
              delay={0.9}
              duration={7}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "38%", right: "2%" }}
            />
            {/* G — person-7, lower-left, 100px */}
            <CollageTile
              src="/img/person-7.webp"
              size="clamp(70px,9vw,100px)"
              baseRot={11}
              delay={1.2}
              duration={8.5}
              parallaxRange={[10, -10]}
              isPhoto
              calm
              style={{ top: "71%", left: "6%" }}
            />
            {/* H — person-9, lower-centre-left, 164px — desktop only */}
            <CollageTile
              src="/img/person-9.webp"
              size="164px"
              baseRot={-7}
              delay={1.6}
              duration={7.6}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "74%", left: "30%" }}
            />
            {/* I — person-10, lower-centre-right, 142px — desktop only */}
            <CollageTile
              src="/img/person-10.webp"
              size="142px"
              baseRot={0}
              delay={0.8}
              duration={8.2}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              className="collage-hide-mobile"
              style={{ top: "73%", left: "55%" }}
            />
            {/* J — person-8, lower-right, 176px */}
            <CollageTile
              src="/img/person-8.webp"
              size="clamp(112px,16vw,176px)"
              baseRot={-5}
              delay={1.5}
              duration={6.8}
              parallaxRange={[12, -12]}
              isPhoto
              calm
              style={{ top: "68%", right: "5%" }}
            />

            {/* Heading — centered, always above tiles */}
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
                  padding: "clamp(16px, 3vw, 40px) clamp(80px, 14vw, 220px)",
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Por que a TrocarLuz?
              </h2>
            </Reveal>
          </div>

          {/* Reason cards */}
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
                    boxShadow: CARD_SHADOW,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-3px)";
                    el.style.boxShadow = CARD_SHADOW_HOVER;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = CARD_SHADOW;
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
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
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
        style={{ backgroundColor: "var(--cream)", padding: "clamp(6rem,12vw,10rem) var(--gutter)" }}
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
                    lineHeight: 0.96,
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
                  boxShadow: CARD_SHADOW,
                }}
              >
                <LeadForm type="residential" sourcePage="home" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 8. CTA BAND — full-bleed --env, giant "Pronto" + parallax  */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        ref={ctaSectionRef}
        aria-labelledby="cta-heading"
        className="relative overflow-hidden"
        style={{
          backgroundColor: "var(--env)",
          padding: "clamp(6rem,12vw,10rem) var(--gutter)",
          textAlign: "center",
          ...DOT_TEXTURE,
        }}
      >
        {/* ── CTA band 3D accents — z-index 0, behind all text ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "clamp(0px, 4%, 56px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(60px, 10vw, 125px)",
            height: "clamp(60px, 10vw, 125px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <motion.img
            src="/img/obj-sol.webp"
            alt=""
            loading="lazy"
            decoding="async"
            animate={prefersReduced ? {} : { y: [0, -8, 0], rotate: [8, 8, 8] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 0 }}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
        <div
          aria-hidden="true"
          className="cta-bolt"
          style={{
            position: "absolute",
            right: "clamp(0px, 4%, 56px)",
            bottom: "22%",
            width: "clamp(50px, 8vw, 90px)",
            height: "clamp(50px, 8vw, 90px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <motion.img
            src="/img/obj-raio.webp"
            alt=""
            loading="lazy"
            decoding="async"
            animate={prefersReduced ? {} : { y: [0, -6, 0], rotate: [-10, -10, -10] }}
            transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <h2 id="cta-heading" style={{ letterSpacing: "-0.02em", marginBottom: "20px" }}>
              <motion.span
                style={{
                  display: "block",
                  fontFamily: "var(--app-font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  color: "var(--ink)",
                  lineHeight: 0.88,
                  y: ctaWordY,
                }}
              >
                Pronto
              </motion.span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--app-font-display)",
                  fontWeight: 700,
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
                padding: "18px 56px",
                borderRadius: "999px",
                backgroundColor: "var(--green)",
                color: "#fff",
                fontFamily: "var(--app-font-sans)",
                fontWeight: 700,
                fontSize: "17px",
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(0,184,107,0.35)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 32px rgba(0,184,107,0.45)";
                el.style.background = "#00a85f";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "";
                el.style.boxShadow = "0 6px 24px rgba(0,184,107,0.35)";
                el.style.background = "var(--green)";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
            >
              Comparar agora
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 9. FAQ — with flanking 3D accents                          */}
      {/* ─────────────────────────────────────────────────────────── */}
      <FaqSection />
    </Layout>
  );
}
