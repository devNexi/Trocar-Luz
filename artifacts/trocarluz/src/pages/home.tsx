import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Link } from "wouter";
import { Lightning, ShieldCheck } from "@phosphor-icons/react";
import { useListArticles, useListFaqs } from "@workspace/api-client-react";

export default function Home() {
  const { data: articles } = useListArticles({ limit: 3 });
  const { data: faqs } = useListFaqs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrocarLuz",
    "url": "https://trocarluz.com.br",
    "logo": "https://trocarluz.com.br/favicon.svg",
    "description": "Compare e economize na conta de energia. Geração distribuída e mercado livre no Brasil."
  };

  return (
    <Layout>
      <SEOHead
        title="TrocarLuz — Compare e Economize na Conta de Energia"
        description="Veja se dá pra pagar menos. Compare opções reais de energia para sua casa ou empresa em poucos passos. Sem complicação."
        schema={schema}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ minHeight: '85vh' }}
      >
        {/* Illustration IS the hero — full colour, opacity 1 */}
        <img
          src="/illustrations/heroes/trocarluz-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Content — left-aligned, sits on top */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
          style={{ minHeight: '85vh', zIndex: 1 }}
        >
          <div style={{ maxWidth: '560px' }}>
            <h1
              className="font-display font-extrabold text-white leading-[1.05] mb-6 tracking-tight"
              style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
              }}
            >
              Compare e economize na sua conta de energia.
            </h1>
            <p
              className="mb-10 leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                color: 'rgba(255,255,255,0.90)',
                maxWidth: '480px',
                textShadow: '0 1px 8px rgba(0,0,0,0.35)',
              }}
            >
              Veja as opções reais disponíveis na sua região. Mude para uma energia mais barata, sem burocracia e sem alterar sua instalação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/para-sua-casa"
                className="text-center text-white font-display font-semibold rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: '#00B86B',
                  fontSize: '16px',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Quero economizar em casa
              </Link>
              <Link
                href="/para-sua-empresa"
                className="text-center text-white font-display font-semibold transition-colors hover:bg-white/10"
                style={{
                  border: '2px solid rgba(255,255,255,0.9)',
                  fontSize: '16px',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                Para minha empresa
              </Link>
            </div>
            <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
              <ShieldCheck size={20} weight="fill" style={{ color: '#00B86B' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                Mais de 12 mil comparações feitas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2028 BANNER ──────────────────────────────────────────────────── */}
      <section className="bg-[#FFD000] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lightning size={28} weight="fill" className="text-[#1A1F36] shrink-0" />
              <p className="font-display font-semibold text-[#1A1F36] md:text-lg">
                Em 2028, 88 milhões de lares poderão escolher seu fornecedor de energia.
              </p>
            </div>
            <Link
              href="/energia-2028"
              className="shrink-0 text-[#1A1F36] font-medium border-b-2 border-[#1A1F36] pb-0.5 hover:opacity-70 transition-opacity"
            >
              Prepare-se agora
            </Link>
          </div>
        </div>
      </section>

      {/* ── GD LEAD CAPTURE ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#F7F7F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[55fr_45fr] gap-12 items-start">
            {/* Left */}
            <div className="pt-4">
              <h2
                className="font-display font-bold mb-4"
                style={{ fontSize: '40px', color: '#1A1F36', lineHeight: '1.15' }}
              >
                Sua conta de luz está alta demais?
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#6B7080' }}
              >
                A Geração Distribuída (GD) permite que você use energia solar de fazendas parceiras e receba desconto direto na conta da sua distribuidora.
              </p>
              <ul className="space-y-5 mb-8">
                {[
                  'Zero investimento ou obras',
                  'A energia continua chegando pela mesma rede',
                  'Economia garantida todos os meses',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Lightning
                      size={22}
                      weight="fill"
                      className="shrink-0 mt-0.5"
                      style={{ color: '#FFD000' }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#1A1F36' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <span
                className="inline-block font-display font-bold"
                style={{
                  backgroundColor: '#FFD000',
                  color: '#1A1F36',
                  borderRadius: '999px',
                  padding: '8px 20px',
                  fontSize: '15px',
                }}
              >
                Clientes economizam em média 18% na conta
              </span>
            </div>
            {/* Right — form card */}
            <div style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <LeadForm type="residential" sourcePage="home" />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-bold text-white text-center mb-20"
            style={{ fontSize: '36px' }}
          >
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Yellow connecting line — desktop only */}
            <div
              className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)]"
              style={{ height: '2px', backgroundColor: '#FFD000', zIndex: 0 }}
            />

            {[
              {
                n: '1',
                title: 'Informe',
                desc: 'Diga seu estado e média de consumo para vermos as ofertas da sua região.',
              },
              {
                n: '2',
                title: 'Compare',
                desc: 'Veja as opções reais, parceiros verificados e entenda o desconto projetado.',
              },
              {
                n: '3',
                title: 'Troque',
                desc: 'Faça a adesão digital rápida, sem quebrar paredes ou mudar a instalação.',
              },
            ].map((step) => (
              <div key={step.n} className="relative z-10 flex flex-col items-center text-center px-8">
                <div
                  className="font-display font-extrabold leading-none mb-6"
                  style={{ fontSize: '80px', color: '#FFD000' }}
                >
                  {step.n}
                </div>
                <h3
                  className="font-display font-bold text-white mb-3"
                  style={{ fontSize: '24px' }}
                >
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.70)', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TILES ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#F7F7F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-bold mb-10"
            style={{ fontSize: '36px', color: '#1A1F36' }}
          >
            O que você quer comparar?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CategoryTile
              href="/para-sua-casa"
              accent="#FFD000"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 4L3 14h3v12h8v-7h4v7h8V14h3L16 4z" fill="#FFD000"/>
                </svg>
              }
              title="Geração Distribuída"
              desc="Economia solar sem instalação"
              cta="Comparar agora"
              live
            />
            <CategoryTile
              href="/para-sua-empresa"
              accent="#00B86B"
              icon={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="3" y="10" width="10" height="18" rx="1" fill="#00B86B"/>
                  <rect x="15" y="4" width="14" height="24" rx="1" fill="#00B86B" opacity="0.7"/>
                </svg>
              }
              title="Mercado Livre ACL"
              desc="Energia livre para empresas"
              cta="Comparar agora"
              live
            />
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12k+', label: 'Comparações feitas', desc: 'Desde o lançamento' },
              { value: '18%', label: 'Economia média', desc: 'Por cliente ao mês' },
              { value: '27', label: 'Estados cobertos', desc: 'Todo o Brasil' },
              { value: '✓', label: 'Parceiros verificados', desc: 'Transparência total' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display font-extrabold leading-none mb-2"
                  style={{ fontSize: '48px', color: '#00B86B' }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-medium mb-1"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#1A1F36' }}
                >
                  {stat.label}
                </div>
                <div
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7080' }}
                >
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 text-center text-white" style={{ backgroundColor: '#00B86B' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-extrabold text-white mb-10"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: '1.1' }}
          >
            Pronto para pagar menos?
          </h2>
          <Link
            href="/para-sua-casa"
            className="inline-block font-display font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#00B86B',
              fontSize: '18px',
              padding: '18px 48px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Comparar agora
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function CategoryTile({
  href,
  accent,
  icon,
  title,
  desc,
  cta,
  live,
}: {
  href: string;
  accent: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  live?: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        className="group bg-white transition-all duration-200 cursor-pointer"
        style={{
          border: `1px solid #E2E1DC`,
          borderLeft: `4px solid ${accent}`,
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = accent;
          el.style.borderLeftColor = accent;
          el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.borderColor = '#E2E1DC';
          el.style.borderLeftColor = accent;
          el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>{icon}</div>
          {live ? (
            <span
              className="font-medium"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: accent,
              }}
            >
              Comparar agora →
            </span>
          ) : (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: '#6B7080',
                backgroundColor: '#EEEDE8',
                borderRadius: '999px',
                padding: '3px 12px',
              }}
            >
              Em breve
            </span>
          )}
        </div>
        <h3
          className="font-display font-bold mb-2"
          style={{ fontSize: '22px', color: '#1A1F36' }}
        >
          {title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080' }}>
          {desc}
        </p>
      </div>
    </Link>
  );
}
