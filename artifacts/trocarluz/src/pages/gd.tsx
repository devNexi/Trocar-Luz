import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";

export default function GD() {
  return (
    <Layout>
      <SEOHead 
        title="O que é Geração Distribuída (GD) — TrocarLuz" 
        description="Entenda como funciona a Geração Distribuída e como você pode economizar até 20% na conta de luz sem instalar placas solares."
      />
      
      <section className="bg-white py-20 border-b border-[#E2E1DC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#1A1F36] mb-6">
            Geração Distribuída: <br/>Energia Solar por assinatura
          </h1>
          <p className="text-xl text-[#6B7080]">
            Não tem telhado próprio? Mora em apartamento? Você ainda pode ter os descontos da energia solar.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-6">Como isso é possível?</h2>
              <div className="prose prose-lg text-[#6B7080]">
                <p>
                  A Geração Distribuída (GD) permite que a energia gerada em um lugar (como uma grande fazenda solar no interior) seja consumida em outro lugar, desde que estejam na mesma área da distribuidora.
                </p>
                <p>
                  Funciona assim: empresas constroem grandes usinas solares. Elas não consomem essa energia, elas injetam na rede elétrica local. A distribuidora converte essa energia injetada em <strong>créditos</strong>.
                </p>
                <p>
                  Ao invés de comprar energia cara da distribuidora, você "aluga" parte dessa usina. Os créditos gerados por ela são abatidos da sua conta de luz.
                </p>
                <p>
                  Como o custo de gerar energia solar na fazenda é muito mais barato do que o preço que a distribuidora cobra, a conta final (aluguel da usina + taxa mínima da distribuidora) fica menor do que a sua conta antiga.
                </p>
              </div>
            </div>
            <div>
              <div className="sticky top-24">
                <LeadForm type="residential" sourcePage="gd-hub" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
