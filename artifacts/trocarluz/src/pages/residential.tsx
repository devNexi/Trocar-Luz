import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";

export default function Residential() {
  return (
    <Layout>
      <SEOHead 
        title="Para sua casa — TrocarLuz" 
        description="Economize na conta de luz da sua residência com Geração Distribuída. Sem investimento inicial."
      />
      
      <section className="bg-[#1A1F36] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6">Energia mais barata para sua casa</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Você não precisa de placas solares no telhado para economizar. Receba o desconto direto na conta da sua distribuidora atual.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-6">Como a Geração Distribuída ajuda você?</h2>
              <p className="text-[#6B7080] mb-4">
                Hoje, você compra energia apenas da distribuidora local. Com a Geração Distribuída Compartilhada (GD), você passa a alugar uma "cota" de uma fazenda solar distante.
              </p>
              <p className="text-[#6B7080] mb-8">
                A energia gerada lá é injetada na rede e vira créditos na sua conta. O resultado? Sua conta final (energia + aluguel da cota) fica mais barata do que pagar tudo para a distribuidora.
              </p>
              
              <h3 className="font-display font-semibold text-xl text-[#1A1F36] mb-4">Vantagens:</h3>
              <ul className="space-y-3 mb-8 text-[#1A1F36]">
                <li className="flex gap-2">✓ Sem quebrar paredes ou telhado</li>
                <li className="flex gap-2">✓ Zero taxa de adesão</li>
                <li className="flex gap-2">✓ Você continua com a mesma distribuidora (se faltar luz, eles arrumam)</li>
                <li className="flex gap-2">✓ Cancelamento simples se você se mudar</li>
              </ul>
            </div>
            
            <div>
              <LeadForm type="residential" sourcePage="residential-hub" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
