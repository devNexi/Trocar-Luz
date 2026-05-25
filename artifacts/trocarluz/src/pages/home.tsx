import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Link } from "wouter";
import { Lightning, ShieldCheck } from "@phosphor-icons/react";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TrocarLuz",
    "url": "https://trocarluz.com.br",
    "logo": "https://trocarluz.com.br/favicon.png",
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
        style={{ minHeight: '85vh', marginTop: '-64px' }}
      >
        <img
          src="/illustrations/heroes/trocarluz-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.55 }}
        />
        {/* Dark veil on left third so text is always readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, rgba(10,22,40,0.72) 0%, rgba(10,22,40,0.35) 55%, transparent 100%)' }}
        />

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center"
          style={{ minHeight: '85vh', zIndex: 1, paddingTop: '80px' }}
        >
          <div style={{ maxWidth: '560px' }}>
            <h1
              className="font-display font-extrabold text-white leading-[1.05] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}
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
              }}
            >
              Veja as opções reais disponíveis na sua região. Mude para uma energia mais barata, sem burocracia e sem alterar sua instalação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/para-sua-casa"
                className="text-center text-white font-display font-semibold transition-opacity hover:opacity-90"
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

      {/* ── 2028 BANNER — #FFD000 ────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#FFD000' }} className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lightning size={26} weight="fill" style={{ color: '#0A1628' }} className="shrink-0" />
              <p className="font-display font-semibold" style={{ color: '#0A1628', fontSize: '17px' }}>
                Em 2028, 88 milhões de lares poderão escolher seu fornecedor de energia.
              </p>
            </div>
            <Link
              href="/energia-2028"
              className="shrink-0 font-medium hover:opacity-70 transition-opacity"
              style={{ color: '#0A1628', borderBottom: '2px solid #0A1628', paddingBottom: '2px', textDecoration: 'none', fontSize: '15px' }}
            >
              Prepare-se agora
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUICK-ACTION CARDS — #0A1628 navy ────────────────────────────── */}
      <section style={{ backgroundColor: '#0A1628' }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/para-sua-casa" style={{ textDecoration: 'none' }}>
              <div
                className="flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderLeft: '4px solid #00B86B',
                  borderRadius: '12px',
                  padding: '22px 28px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.10)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div>
                  <div className="font-display font-bold mb-1" style={{ fontSize: '18px', color: '#FFFFFF' }}>
                    Para sua casa
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.60)' }}>
                    Geração Distribuída — economia solar sem instalação
                  </div>
                </div>
                <div className="shrink-0 font-display font-semibold whitespace-nowrap" style={{ fontSize: '14px', color: '#00B86B' }}>
                  Quero economizar →
                </div>
              </div>
            </Link>

            <Link href="/para-sua-empresa" style={{ textDecoration: 'none' }}>
              <div
                className="flex items-center justify-between gap-4 transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderLeft: '4px solid #FFD000',
                  borderRadius: '12px',
                  padding: '22px 28px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.10)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div>
                  <div className="font-display font-bold mb-1" style={{ fontSize: '18px', color: '#FFFFFF' }}>
                    Para sua empresa
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.60)' }}>
                    Mercado Livre + GD — reduza custos operacionais
                  </div>
                </div>
                <div className="shrink-0 font-display font-semibold whitespace-nowrap" style={{ fontSize: '14px', color: '#FFD000' }}>
                  Analisar minha empresa →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GD LEAD CAPTURE — #F7F7F5 ────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#F7F7F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[55fr_45fr] gap-12 items-start">
            <div className="pt-4">
              <h2 className="font-display font-bold mb-4" style={{ fontSize: '40px', color: '#1A1F36', lineHeight: '1.15' }}>
                Sua conta de luz está alta demais?
              </h2>
              <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: '#6B7080', lineHeight: '1.7' }}>
                A Geração Distribuída (GD) permite que você use energia solar de fazendas parceiras e receba desconto direto na conta da sua distribuidora.
              </p>
              <ul className="space-y-5 mb-8">
                {[
                  'Zero investimento ou obras',
                  'A energia continua chegando pela mesma rede',
                  'Economia garantida todos os meses',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Lightning size={22} weight="fill" className="shrink-0 mt-0.5" style={{ color: '#6ABF4B' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#1A1F36', lineHeight: '1.6' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <span
                className="inline-block font-display font-bold"
                style={{ backgroundColor: '#6ABF4B', color: '#FFFFFF', borderRadius: '999px', padding: '8px 20px', fontSize: '15px' }}
              >
                Clientes economizam em média 18% na conta
              </span>
            </div>
            <div style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <LeadForm type="residential" sourcePage="home" />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — #0A1628 navy ──────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-white text-center mb-20" style={{ fontSize: '36px' }}>
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 relative">
            {/* Yellow connecting line at number baseline */}
            <div
              className="hidden md:block absolute left-[calc(16.67%)] right-[calc(16.67%)]"
              style={{ top: '62px', height: '2px', backgroundColor: '#FFD000', zIndex: 0 }}
            />
            {[
              { n: '01', title: 'Informe', desc: 'Diga seu estado e média de consumo para vermos as ofertas da sua região.' },
              { n: '02', title: 'Compare', desc: 'Veja as opções reais, parceiros verificados e entenda o desconto projetado.' },
              { n: '03', title: 'Troque', desc: 'Faça a adesão digital rápida, sem quebrar paredes ou mudar a instalação.' },
            ].map((step) => (
              <div key={step.n} className="relative z-10 flex flex-col items-center text-center px-6 md:px-10">
                <div
                  className="font-display font-extrabold leading-none mb-5"
                  style={{ fontSize: '96px', color: '#FFD000', lineHeight: '1' }}
                >
                  {step.n}
                </div>
                <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '28px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.70)', lineHeight: '1.7' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY TILES — white ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10" style={{ fontSize: '36px', color: '#1A1F36' }}>
            O que você quer comparar?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* GD tile */}
            <Link href="/para-sua-casa" style={{ textDecoration: 'none' }}>
              <div
                className="flex flex-col transition-all duration-200 cursor-pointer"
                style={{
                  border: '1px solid #E2E1DC',
                  borderLeft: '4px solid #6ABF4B',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  minHeight: '300px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
              >
                <div className="p-8 pb-6 flex items-start justify-between" style={{ backgroundColor: 'rgba(106,191,75,0.07)' }}>
                  <div
                    className="font-display font-extrabold leading-none"
                    style={{ fontSize: '56px', color: '#2D7A3A' }}
                  >
                    até 20% off
                  </div>
                  <span
                    className="shrink-0 font-display font-bold"
                    style={{
                      fontSize: '12px',
                      color: '#FFFFFF',
                      backgroundColor: '#6ABF4B',
                      borderRadius: '999px',
                      padding: '4px 12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Disponível agora
                  </span>
                </div>
                <div className="px-8 pt-2 pb-8 flex flex-col flex-1">
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: '22px', color: '#1A1F36' }}>
                    Geração Distribuída
                  </h3>
                  <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.6' }}>
                    Energia solar sem instalação. Para casa e empresa.
                  </p>
                  <div
                    className="w-full text-center font-display font-bold mt-auto"
                    style={{
                      backgroundColor: '#6ABF4B',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      padding: '14px 24px',
                      borderRadius: '8px',
                    }}
                  >
                    Quero economizar →
                  </div>
                </div>
              </div>
            </Link>

            {/* ACL tile */}
            <Link href="/para-sua-empresa" style={{ textDecoration: 'none' }}>
              <div
                className="flex flex-col transition-all duration-200 cursor-pointer"
                style={{
                  border: '1px solid #E2E1DC',
                  borderLeft: '4px solid #00B86B',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  minHeight: '300px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'; }}
              >
                <div className="p-8 pb-6 flex items-start justify-between" style={{ backgroundColor: 'rgba(0,184,107,0.06)' }}>
                  <div
                    className="font-display font-extrabold leading-none"
                    style={{ fontSize: '56px', color: '#007A47' }}
                  >
                    até 30% off
                  </div>
                  <span
                    className="shrink-0 font-display font-bold"
                    style={{
                      fontSize: '12px',
                      color: '#FFFFFF',
                      backgroundColor: '#00B86B',
                      borderRadius: '999px',
                      padding: '4px 12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Para empresas
                  </span>
                </div>
                <div className="px-8 pt-2 pb-8 flex flex-col flex-1">
                  <h3 className="font-display font-bold mb-2" style={{ fontSize: '22px', color: '#1A1F36' }}>
                    Mercado Livre de Energia
                  </h3>
                  <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.6' }}>
                    Para empresas com CNPJ. Migre do mercado cativo.
                  </p>
                  <div
                    className="w-full text-center font-display font-bold mt-auto"
                    style={{
                      backgroundColor: '#00B86B',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      padding: '14px 24px',
                      borderRadius: '8px',
                    }}
                  >
                    Analisar minha empresa →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS — #6ABF4B lime green ─────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: '#6ABF4B' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '12k+', label: 'Comparações feitas' },
              { value: '18%', label: 'Economia média por cliente' },
              { value: '27', label: 'Estados cobertos' },
              { value: '100%', label: 'Parceiros verificados' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-display font-extrabold leading-none mb-3"
                  style={{ fontSize: '72px', color: '#FFFFFF' }}
                >
                  {stat.value}
                </div>
                <div
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '16px', color: 'rgba(255,255,255,0.82)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA — #00B86B green ─────────────────────────────────────── */}
      <section className="py-24 text-center text-white" style={{ backgroundColor: '#00B86B' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="font-display font-extrabold text-white mb-5"
            style={{ fontSize: 'clamp(40px, 5vw, 56px)', lineHeight: '1.05' }}
          >
            Pronto para pagar menos?
          </h2>
          <p
            className="mb-10"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '20px', color: 'rgba(255,255,255,0.82)', lineHeight: '1.6' }}
          >
            Compare suas opções agora. Sem custo, sem compromisso.
          </p>
          <Link
            href="/para-sua-casa"
            className="inline-block font-display font-bold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#00B86B',
              fontSize: '18px',
              padding: '18px 52px',
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
