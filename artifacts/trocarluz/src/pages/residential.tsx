import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { Lightning } from "@phosphor-icons/react";

export default function Residential() {
  return (
    <Layout>
      <SEOHead
        title="Para sua casa — TrocarLuz"
        description="Economize na conta de luz da sua residência com Geração Distribuída agora, e garanta sua vaga para o mercado livre em dezembro de 2027."
      />

      {/* Hero */}
      <section className="bg-[#0A1628] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold mb-6" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: '1.1' }}>
            Pare de pagar mais do que precisa na sua conta de luz.
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: '1.7' }}>
            Hoje: economize com geração distribuída. A partir de dezembro de 2027: migre para o mercado livre com a TrocarLuz como seu broker certificado.
          </p>
        </div>
      </section>

      {/* Duas formas de economizar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold mb-10 text-center" style={{ fontSize: '36px', color: '#1A1F36' }}>
            Duas formas de economizar
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Card 1 — GD */}
            <div style={{ border: '1px solid #E2E1DC', borderLeft: '4px solid #6ABF4B', borderRadius: '16px', padding: '36px' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-bold text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#6ABF4B', color: '#fff' }}>
                  Disponível agora
                </span>
              </div>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: '24px', color: '#1A1F36' }}>
                Agora: Geração Distribuída
              </h3>
              <p className="mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7080', lineHeight: '1.7' }}>
                Disponível hoje para qualquer residência no Brasil. A GD permite que você use energia solar de fazendas parceiras e receba um desconto direto na sua conta da distribuidora — sem instalar nada, sem obras, sem investimento inicial.
              </p>
              <p className="font-display font-semibold" style={{ fontSize: '15px', color: '#2D7A3A' }}>
                Clientes economizam em média 18% na conta mensalmente.
              </p>
            </div>

            {/* Card 2 — ACL 2027 */}
            <div style={{ border: '1px solid #E2E1DC', borderLeft: '4px solid #0A1628', borderRadius: '16px', padding: '36px', backgroundColor: '#F7F7F5' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display font-bold text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#0A1628', color: '#FFD000' }}>
                  A partir de dez/2027
                </span>
              </div>
              <h3 className="font-display font-bold mb-3" style={{ fontSize: '24px', color: '#1A1F36' }}>
                Em breve: Mercado Livre Residencial
              </h3>
              <p className="mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7080', lineHeight: '1.7' }}>
                Em dezembro de 2027, consumidores residenciais do Subgrupo B3 poderão começar a migrar. Em 2028, todos os consumidores residenciais (B1) terão acesso completo.
              </p>
              <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: '#fff', border: '1px solid #E2E1DC' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#1A1F36', lineHeight: '1.6' }}>
                  <strong>Importante:</strong> a lei brasileira exige que consumidores de baixa tensão usem um broker certificado (comercializador varejista) registrado na CCEE para fazer a migração. Você não pode fazer isso sozinho.
                </p>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#6B7080', lineHeight: '1.6' }}>
                A TrocarLuz é esse broker. Cadastre-se agora para ser notificado quando a migração abrir para o seu perfil — e entrar na fila na frente de todos.
              </p>
            </div>
          </div>

          {/* Lead form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold mb-3" style={{ fontSize: '32px', color: '#1A1F36' }}>
                Economize agora e garanta sua vaga para 2027
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#6B7080' }}>
                Analisamos sua elegibilidade para GD hoje e te avisamos quando o mercado livre abrir para você.
              </p>
            </div>
            <div style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <LeadForm type="residential" sourcePage="residential-hub" />
            </div>
          </div>

          {/* Advantages */}
          <div className="mt-16 pt-16 border-t border-[#E2E1DC]">
            <h3 className="font-display font-bold mb-6 text-center" style={{ fontSize: '24px', color: '#1A1F36' }}>
              Por que funciona sem nenhuma obra
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                'Sem quebrar paredes ou telhado',
                'Zero taxa de adesão',
                'Você continua com a mesma distribuidora',
                'Cancelamento simples se você se mudar',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Lightning size={20} weight="fill" className="shrink-0 mt-0.5" style={{ color: '#6ABF4B' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: '#1A1F36' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
