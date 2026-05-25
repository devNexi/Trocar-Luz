import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

export default function About() {
  return (
    <Layout>
      <SEOHead 
        title="Sobre a TrocarLuz — Como ajudamos o Brasil a economizar" 
        description="A TrocarLuz é parceira da Ótima Energia, criada para democratizar o acesso à energia barata no Brasil."
      />
      
      <section className="bg-[#1A1F36] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-6">
            Nossa missão é colocar o poder de escolha nas suas mãos.
          </h1>
          <p className="text-xl text-gray-300">
            A energia no Brasil é cara e complexa. Nós simplificamos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg text-[#6B7080] max-w-none">
            <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-6">Quem somos</h2>
            <p>
              A <strong>TrocarLuz</strong> faz parte do ecossistema TrocarTudo e atua como um parceiro oficial da Ótima Energia. 
              Nós acreditamos que você não deveria precisar ser um engenheiro elétrico para saber se está pagando caro na conta de luz.
            </p>
            <p>
              Em um mercado onde a maioria das pessoas não sabe que pode escolher seu fornecedor de energia, nós entramos com informação clara, direta e sem juridiquês.
            </p>

            <h2 className="font-display font-bold text-3xl text-[#1A1F36] mt-12 mb-6">Como ganhamos dinheiro?</h2>
            <p>
              A transparência é nosso principal valor. O uso da plataforma TrocarLuz é <strong>100% gratuito para você</strong>. 
            </p>
            <p>
              Nós somos remunerados pelas empresas fornecedoras de energia (fazendas solares, comercializadoras no Mercado Livre) toda vez que conectamos um novo cliente a elas. Isso não encarece a sua conta — pelo contrário, as empresas nos pagam justamente porque conseguimos trazer volume e baratear o custo de encontrar clientes.
            </p>

            <div className="bg-[#F7F7F5] p-8 rounded-[16px] border border-[#E2E1DC] mt-12">
              <h3 className="font-display font-bold text-2xl text-[#1A1F36] mb-4">Nossos Pilares de Confiança</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-[#00B86B] font-bold">✓</span>
                  <div>
                    <strong className="text-[#1A1F36]">Comparação imparcial:</strong> Mostramos as opções reais disponíveis na sua região.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00B86B] font-bold">✓</span>
                  <div>
                    <strong className="text-[#1A1F36]">Sem custo pro usuário:</strong> Você nunca paga nada para nós.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00B86B] font-bold">✓</span>
                  <div>
                    <strong className="text-[#1A1F36]">Parceiros verificados:</strong> Só trabalhamos com empresas reguladas pela ANEEL e Câmara de Comercialização de Energia Elétrica (CCEE).
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F7F5]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-[#1A1F36] mb-4">
            Quer saber mais? Entre em contato.
          </h2>
          <p className="text-[#6B7080] mb-8">
            Nossa equipe está pronta para tirar suas dúvidas e ajudar você a economizar.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </Layout>
  );
}
