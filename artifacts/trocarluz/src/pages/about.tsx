import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="Sobre a TrocarLuz — Energia mais barata para você"
        description="A TrocarLuz conecta residências e empresas a fontes de energia mais baratas. Parceira da Ótima Energia, operador certificado no mercado livre."
      />

      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(36px, 5vw, 52px)', lineHeight: '1.1' }}>
            A plataforma de energia que o consumidor brasileiro estava esperando.
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: '1.7' }}>
            Parceiros da Ótima Energia. Prontos para levar você ao mercado livre.
          </p>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: '#4B5066', lineHeight: '1.8' }}>
            <div>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: '36px', color: '#1A1F36' }}>Quem somos</h2>
              <p>
                A <strong style={{ color: '#1A1F36' }}>TrocarLuz</strong> é a plataforma de energia que o consumidor brasileiro estava esperando.
              </p>
              <p className="mt-4">
                Hoje, ajudamos residências e empresas a economizarem através da geração distribuída — sem obras, sem investimento, com desconto direto na conta.
              </p>
              <p className="mt-4">
                A partir de dezembro de 2027, milhões de lares brasileiros farão sua primeira migração para o mercado livre de energia. A lei exige um agente habilitado para essa transição (MP nº 1.300/2025). <strong style={{ color: '#1A1F36' }}>Através da Ótima Energia, nosso parceiro certificado, gerenciamos esse processo para você.</strong>
              </p>
              <p className="mt-4">
                Somos parceiros da Ótima Energia, operadores certificados no mercado de energia brasileiro, com clientes reais e economia comprovada.
              </p>
            </div>

            <div className="pt-8 border-t border-[#E2E1DC]">
              <h2 className="font-display font-bold mb-6" style={{ fontSize: '32px', color: '#1A1F36' }}>Como ganhamos dinheiro?</h2>
              <p>
                A transparência é nosso principal valor. O uso da plataforma TrocarLuz é <strong style={{ color: '#1A1F36' }}>100% gratuito para você</strong>.
              </p>
              <p className="mt-4">
                Somos remunerados pelas empresas fornecedoras de energia (fazendas solares, comercializadoras no Mercado Livre) toda vez que conectamos um novo cliente a elas. Isso não encarece a sua conta — pelo contrário, as empresas nos pagam justamente porque conseguimos trazer volume e baratear o custo de encontrar clientes.
              </p>
            </div>

            <div className="pt-8 border-t border-[#E2E1DC]">
              <h2 className="font-display font-bold mb-6" style={{ fontSize: '32px', color: '#1A1F36' }}>Por que você precisa de um broker</h2>
              <p>
                Ao contrário de consumidores industriais, os consumidores residenciais de baixa tensão não podem negociar diretamente na plataforma da CCEE. A lei exige que você seja representado por um comercializador varejista certificado e registrado na CCEE.
              </p>
              <p className="mt-4">
                Esse broker agrega o consumo de vários consumidores, negocia preços com os geradores em seu nome, e gerencia toda a transição — da notificação formal à distribuidora atual até a assinatura do contrato com o novo fornecedor.
              </p>
              <p className="mt-4">
                Não somos apenas uma plataforma de comparação — somos o veículo legal pelo qual você faz a migração.
              </p>
            </div>
          </div>

          {/* Trust pillars */}
          <div className="mt-16 p-10 rounded-2xl" style={{ backgroundColor: '#F7F7F5', border: '1px solid #E2E1DC' }}>
            <h3 className="font-display font-bold mb-8 text-center" style={{ fontSize: '28px', color: '#1A1F36' }}>Nossos pilares de confiança</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Parceiro Ótima Energia', desc: 'Operamos com a Ótima Energia, operador certificado e regulamentado no mercado livre de energia.' },
                { title: 'Sem custo pro usuário', desc: 'Você nunca paga nada para nós. Nossa remuneração vem dos fornecedores parceiros.' },
                { title: 'Parceiros verificados', desc: 'Só trabalhamos com empresas reguladas pela ANEEL.' },
              ].map((p) => (
                <div key={p.title} className="flex gap-3">
                  <span className="font-bold text-lg shrink-0 mt-0.5" style={{ color: '#00B86B' }}>✓</span>
                  <div>
                    <div className="font-display font-bold mb-1" style={{ fontSize: '16px', color: '#1A1F36' }}>{p.title}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#6B7080', lineHeight: '1.6' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F7F7F5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold mb-4" style={{ fontSize: '32px', color: '#1A1F36' }}>
            Quer saber mais? Entre em contato.
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7080' }}>
            Nossa equipe está pronta para tirar suas dúvidas e ajudar você a economizar.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00B86B', color: '#fff', fontSize: '16px', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none' }}
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
