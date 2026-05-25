import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Link } from "wouter";
import { ArrowRight, Lightning, House, Buildings, ShieldCheck, CurrencyDollar, FileText, CaretDown } from "@phosphor-icons/react";
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

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white pt-20 pb-24 md:pt-32 md:pb-40" style={{ backgroundColor: '#0A1628' }}>
        {/* Full-bleed hero illustration at 30% opacity — no gradient overlay */}
        <img
          src="/illustrations/heroes/trocarluz-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: 0.30 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-[64px] leading-[1.1] mb-6 tracking-tight">
              Compare e economize na sua conta de energia.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Veja as opções reais disponíveis na sua região. Mude para uma energia mais barata, sem burocracia e sem alterar sua instalação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/para-sua-casa" className="btn-primary text-center">
                Quero economizar em casa
              </Link>
              <Link href="/para-sua-empresa" className="btn-secondary text-center !text-white !border-white hover:!bg-white/10">
                Economizar para minha empresa
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <ShieldCheck size={20} weight="fill" className="text-[#00B86B]" />
              Mais de 12 mil comparações feitas
            </div>
          </div>
        </div>
      </section>

      {/* 2028 Banner */}
      <section className="bg-[#FFD000] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Lightning size={28} weight="fill" className="text-[#1A1F36] shrink-0" />
              <p className="font-display font-semibold text-[#1A1F36] md:text-lg">
                Em 2028, 88 milhões de lares poderão escolher seu fornecedor de energia.
              </p>
            </div>
            <Link href="/energia-2028" className="shrink-0 text-[#1A1F36] font-medium border-b-2 border-[#1A1F36] pb-0.5 hover:opacity-70 transition-opacity">
              Prepare-se agora
            </Link>
          </div>
        </div>
      </section>

      {/* GD Lead Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1A1F36] mb-6">
                Sua conta de luz está alta demais?
              </h2>
              <p className="text-[#6B7080] text-lg mb-6 leading-relaxed">
                A Geração Distribuída (GD) permite que você use energia solar de fazendas parceiras e receba desconto direto na conta da sua distribuidora. 
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon />
                  <span className="text-[#1A1F36]">Zero investimento inicial ou obras</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon />
                  <span className="text-[#1A1F36]">A energia continua chegando pela mesma rede</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon />
                  <span className="text-[#1A1F36]">Economia garantida todos os meses</span>
                </li>
              </ul>
            </div>
            <div>
              <LeadForm type="residential" sourcePage="home" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1A1F36] mb-16">
            Como funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 pt-10 rounded-2xl border border-[#E2E1DC] relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFD000] text-[#1A1F36] rounded-full flex items-center justify-center font-display font-extrabold text-2xl" style={{ boxShadow: '0 0 0 4px #F7F7F5, 0 4px 16px rgba(255,208,0,0.45)' }}>
                1
              </div>
              <FileText size={48} weight="light" className="text-[#00B86B] mx-auto mb-4 mt-2" />
              <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-2">Informe</h3>
              <p className="text-[#6B7080]">Diga seu estado e média de consumo para vermos as ofertas da sua região.</p>
            </div>
            <div className="bg-white p-8 pt-10 rounded-2xl border border-[#E2E1DC] relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFD000] text-[#1A1F36] rounded-full flex items-center justify-center font-display font-extrabold text-2xl" style={{ boxShadow: '0 0 0 4px #F7F7F5, 0 4px 16px rgba(255,208,0,0.45)' }}>
                2
              </div>
              <CurrencyDollar size={48} weight="light" className="text-[#00B86B] mx-auto mb-4 mt-2" />
              <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-2">Compare</h3>
              <p className="text-[#6B7080]">Veja as opções reais, parceiros verificados e entenda o desconto projetado.</p>
            </div>
            <div className="bg-white p-8 pt-10 rounded-2xl border border-[#E2E1DC] relative">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 bg-[#FFD000] text-[#1A1F36] rounded-full flex items-center justify-center font-display font-extrabold text-2xl" style={{ boxShadow: '0 0 0 4px #F7F7F5, 0 4px 16px rgba(255,208,0,0.45)' }}>
                3
              </div>
              <Lightning size={48} weight="light" className="text-[#00B86B] mx-auto mb-4 mt-2" />
              <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-2">Troque</h3>
              <p className="text-[#6B7080]">Faça a adesão digital rápida, sem quebrar paredes ou mudar a instalação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Home / Business Tiles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/para-sua-casa" className="category-tile group block">
              <House size={64} weight="duotone" className="text-[#FFD000] mb-6" />
              <h3 className="font-display font-bold text-2xl text-[#1A1F36] mb-2 group-hover:text-[#00B86B] transition-colors">
                Para sua casa
              </h3>
              <p className="text-[#6B7080] mb-6">
                Soluções de energia compartilhada para residências. Economia na conta sem investimento inicial.
              </p>
              <div className="flex items-center text-[#00B86B] font-medium group-hover:translate-x-1 transition-transform">
                Ver opções residenciais <ArrowRight className="ml-2" />
              </div>
            </Link>
            
            <Link href="/para-sua-empresa" className="category-tile group block">
              <Buildings size={64} weight="duotone" className="text-[#0066FF] mb-6" />
              <h3 className="font-display font-bold text-2xl text-[#1A1F36] mb-2 group-hover:text-[#00B86B] transition-colors">
                Para sua empresa
              </h3>
              <p className="text-[#6B7080] mb-6">
                Mercado Livre de Energia e GD para CNPJ. Maximize a redução de custos operacionais.
              </p>
              <div className="flex items-center text-[#00B86B] font-medium group-hover:translate-x-1 transition-transform">
                Ver opções empresariais <ArrowRight className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#1A1F36] text-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00B86B] opacity-10 blur-[120px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">Pronto para parar de perder dinheiro?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Descubra em menos de 2 minutos se dá pra pagar menos.
          </p>
          <Link href="/para-sua-casa" className="btn-primary inline-flex text-lg px-8 py-4">
            Começar a comparar agora
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function CheckCircleIcon() {
  return (
    <div className="shrink-0 mt-0.5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="12" fill="#E6F8F0"/>
        <path d="M16.5 8.25L10.3125 15.0625L7.5 11.9688" stroke="#00B86B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
