import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Link } from "wouter";

export default function GD() {
  return (
    <Layout>
      <SEOHead
        title="O que é Geração Distribuída (GD) — TrocaLuz"
        description="Entenda como funciona a Geração Distribuída e como você pode economizar até 35% na conta de luz sem instalar placas solares. Disponível agora."
      />

      {/* Hero */}
      <section className="bg-white py-20 border-b border-[#E2E1DC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block font-display font-bold text-sm px-3 py-1 rounded-full mb-6" style={{ backgroundColor: '#6ABF4B', color: '#fff' }}>
            Disponível agora
          </span>
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(36px, 5vw, 52px)', color: '#1A1F36', lineHeight: '1.1' }}>
            Geração Distribuída: energia solar por assinatura
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#6B7080', lineHeight: '1.7' }}>
            Não tem telhado próprio? Mora em apartamento? Você ainda pode ter os descontos da energia solar — sem obras, sem esperar 2027.
          </p>
        </div>
      </section>

      {/* GD vs Mercado Livre explainer */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-white mb-3" style={{ fontSize: '28px' }}>
            GD é diferente do mercado livre — e está disponível agora
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.70)', lineHeight: '1.7' }}>
            Muita gente confunde geração distribuída com o mercado livre de energia. São produtos diferentes:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: '4px solid #6ABF4B', borderRadius: '16px', padding: '28px' }}>
              <div className="font-display font-bold mb-2" style={{ fontSize: '13px', color: '#6ABF4B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Disponível hoje</div>
              <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '20px' }}>Geração Distribuída (GD)</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.70)', lineHeight: '1.7' }}>
                Você assina energia solar gerada em fazendas parceiras e recebe créditos na sua conta da distribuidora. Disponível hoje, para qualquer pessoa, sem obras, sem esperar 2027.
              </p>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderLeft: '4px solid #FFD000', borderRadius: '16px', padding: '28px' }}>
              <div className="font-display font-bold mb-2" style={{ fontSize: '13px', color: '#FFD000', textTransform: 'uppercase', letterSpacing: '0.08em' }}>A partir de dezembro de 2027</div>
              <h3 className="font-display font-bold text-white mb-3" style={{ fontSize: '20px' }}>Mercado Livre (ACL)</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.70)', lineHeight: '1.7' }}>
                Você troca de fornecedor de energia. Para residências, isso só será possível a partir de dezembro de 2027 — e exige um broker certificado como a TrocaLuz.
              </p>
            </div>
          </div>
          <p className="mt-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.60)' }}>
            Se você quer economizar agora, a GD é o caminho. Se você quer estar pronto para 2027,{' '}
            <Link href="/energia-2028" style={{ color: '#6ABF4B', textDecoration: 'underline' }}>cadastre-se e nós te avisamos</Link>.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold mb-6" style={{ fontSize: '36px', color: '#1A1F36' }}>Como isso é possível?</h2>
              <div className="space-y-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7080', lineHeight: '1.8' }}>
                <p>
                  A Geração Distribuída (GD) permite que a energia gerada em um lugar — como uma grande fazenda solar no interior — seja consumida em outro lugar, desde que estejam na mesma área da distribuidora.
                </p>
                <p>
                  Funciona assim: empresas constroem grandes usinas solares e injetam a energia gerada na rede elétrica local. A distribuidora converte essa energia injetada em <strong style={{ color: '#1A1F36' }}>créditos</strong>.
                </p>
                <p>
                  Ao invés de comprar energia cara da distribuidora, você "aluga" parte dessa usina. Os créditos gerados por ela são abatidos da sua conta de luz.
                </p>
                <p>
                  Como o custo de gerar energia solar na fazenda é muito mais barato do que o preço que a distribuidora cobra, a conta final fica menor do que a sua conta antiga.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { v: 'até 35% off', l: 'Economia na conta' },
                  { v: 'R$ 0', l: 'Investimento inicial' },
                  { v: '0 obras', l: 'Instalação necessária' },
                  { v: '27', l: 'Estados cobertos' },
                ].map((s) => (
                  <div key={s.l} style={{ backgroundColor: '#fff', border: '1px solid #E2E1DC', borderRadius: '12px', padding: '20px' }}>
                    <div className="font-display font-extrabold mb-1" style={{ fontSize: '28px', color: '#6ABF4B' }}>{s.v}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B7080' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sticky top-24" style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <LeadForm type="residential" sourcePage="gd-hub" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
