import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";

export default function Business() {
  return (
    <Layout>
      <SEOHead 
        title="Para sua empresa — TrocarLuz" 
        description="Reduza os custos operacionais da sua empresa com energia mais barata via Mercado Livre ou GD."
      />
      
      <section className="bg-[#1A1F36] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6">Pare de pagar caro na energia do seu negócio</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubra as melhores soluções para CNPJ: Mercado Livre de Energia ou Geração Distribuída. Economia direto no caixa.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-6">Soluções para CNPJ</h2>
              
              <div className="mb-8 p-6 bg-[#F7F7F5] rounded-[12px] border border-[#E2E1DC]">
                <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-2">1. Mercado Livre de Energia</h3>
                <p className="text-[#6B7080] mb-4">
                  Se a sua empresa consome em média mais de R$ 5.000 mensais (Grupo A - Alta Tensão), você já pode escolher de quem comprar energia livremente, negociando preços melhores que a tarifa padrão.
                </p>
                <div className="text-sm font-medium text-[#00B86B]">Economia de até 35%</div>
              </div>

              <div className="mb-8 p-6 bg-[#F7F7F5] rounded-[12px] border border-[#E2E1DC]">
                <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-2">2. Geração Distribuída (GD)</h3>
                <p className="text-[#6B7080] mb-4">
                  Para empresas de menor porte (padarias, farmácias, pequenas fábricas no Grupo B), o desconto em conta via consórcio solar é a solução imediata sem obras.
                </p>
                <div className="text-sm font-medium text-[#00B86B]">Economia de até 20%</div>
              </div>
            </div>
            
            <div>
              <LeadForm type="business" sourcePage="business-hub" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
