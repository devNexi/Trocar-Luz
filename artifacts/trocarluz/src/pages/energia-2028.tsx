import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";

export default function Energia2028() {
  return (
    <Layout>
      <SEOHead 
        title="O Mercado Livre para Residências em 2028 — TrocarLuz" 
        description="Em 2028, 88 milhões de lares brasileiros poderão escolher seu próprio fornecedor de energia. Entenda."
      />
      
      <section className="bg-[#FFD000] py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-[#1A1F36] mb-6">
            A revolução de 2028
          </h1>
          <p className="text-xl md:text-2xl text-[#1A1F36] font-medium max-w-2xl mx-auto">
            Assim como aconteceu com os celulares, em breve você poderá escolher a sua operadora de energia elétrica.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-6">O que vai mudar?</h2>
              <p className="text-[#6B7080] mb-6">
                De acordo com as portarias do Ministério de Minas e Energia, o mercado brasileiro está passando por uma abertura gradual. 
                Em 2024, todas as empresas de alta tensão ganharam o direito de escolha.
              </p>
              <p className="text-[#6B7080] mb-8">
                A partir de <strong>janeiro de 2028</strong>, a previsão é que todos os consumidores, incluindo residenciais (Baixa Tensão - Grupo B), possam escolher seu fornecedor de energia no Mercado Livre.
              </p>
              
              <h3 className="font-display font-semibold text-xl text-[#1A1F36] mb-4">Por que isso é bom?</h3>
              <ul className="space-y-4 text-[#6B7080]">
                <li><strong>Competição de preços:</strong> Fornecedores vão disputar você oferecendo tarifas menores.</li>
                <li><strong>Planos sob medida:</strong> Energias 100% renováveis, descontos na madrugada, planos pré-pagos.</li>
                <li><strong>Fim do monopólio:</strong> Você não fica mais preso à tabela de preços de uma única distribuidora.</li>
              </ul>
            </div>
            
            <div className="bg-[#F7F7F5] p-8 rounded-2xl border border-[#E2E1DC]">
              <h3 className="font-display font-bold text-2xl text-[#1A1F36] mb-4">Mas você pode economizar hoje.</h3>
              <p className="text-[#6B7080] mb-8">
                Não espere até 2028 para parar de pagar caro. Enquanto o Mercado Livre residencial não chega, a Geração Distribuída (GD) já permite descontos de até 20% na sua conta de luz atual.
              </p>
              <LeadForm type="residential" sourcePage="energia-2028" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
