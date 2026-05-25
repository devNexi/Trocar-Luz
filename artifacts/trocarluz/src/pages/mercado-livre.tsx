import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

export default function MercadoLivre() {
  return (
    <Layout>
      <SEOHead 
        title="Mercado Livre de Energia (ACL) — TrocarLuz" 
        description="Entenda o que é o Ambiente de Contratação Livre de energia e como ele permite escolher seu fornecedor."
      />
      
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#1A1F36] mb-6">
            O que é o Mercado Livre de Energia?
          </h1>
          <p className="text-xl text-[#6B7080] mb-12">
            Também conhecido como Ambiente de Contratação Livre (ACL), é onde o consumidor pode escolher de quem comprar sua energia elétrica.
          </p>

          <div className="space-y-8 text-[#1A1F36]">
            <div>
              <h2 className="font-display font-bold text-2xl mb-4">A Diferença: Mercado Cativo vs. Livre</h2>
              <p className="text-[#6B7080]">
                No <strong>Mercado Cativo</strong> (onde a maioria de nós está), você é obrigado a comprar a energia da distribuidora da sua região (ex: Enel, Light, Cemig) pelos preços definidos pelo governo (Aneel).
              </p>
              <p className="text-[#6B7080] mt-4">
                No <strong>Mercado Livre</strong>, você negocia preço, prazo, quantidade e fonte de energia diretamente com quem gera ou comercializa. A distribuidora continua entregando a energia, mas você só paga um "pedágio" (o fio) pra ela.
              </p>
            </div>

            <div className="bg-[#F7F7F5] p-6 rounded-2xl border border-[#E2E1DC]">
              <h2 className="font-display font-bold text-2xl mb-4">Quem pode participar?</h2>
              <ul className="list-disc pl-5 space-y-2 text-[#6B7080]">
                <li><strong>Hoje:</strong> Apenas empresas de Alta Tensão (Grupo A). O limite mínimo caiu em 2024, permitindo que todas as empresas do Grupo A participem, independentemente do consumo.</li>
                <li><strong>Em breve (2028):</strong> A previsão é que a abertura total aconteça até 2028, permitindo que consumidores residenciais (Grupo B) também possam escolher de quem comprar.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
