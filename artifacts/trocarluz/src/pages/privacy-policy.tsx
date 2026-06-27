import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEOHead
        title="Política de Privacidade — TrocarLuz"
        description="Política de Privacidade da TrocarLuz. Como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD."
      />

      <section className="bg-[#0A1628] text-white py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="font-display font-extrabold mb-3" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
            Política de Privacidade
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>
            Última atualização: janeiro de 2025
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#4B5066", lineHeight: 1.8 }} className="space-y-8">

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>1. Quem somos</h2>
              <p>A TrocarLuz é um serviço operado em parceria com a Ótima Energia, atuando como broker certificado de energia elétrica no Brasil. Nosso CNPJ e dados de contato estão disponíveis sob solicitação pelo WhatsApp ou e-mail.</p>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>2. Dados que coletamos</h2>
              <ul className="space-y-2 pl-4">
                <li>• Nome e número de WhatsApp (obrigatórios para contato)</li>
                <li>• Estado, distribuidora e valor médio da conta de luz (para estimativa)</li>
                <li>• Imagem ou PDF da conta de luz (quando enviado voluntariamente)</li>
                <li>• CEP e tipo de imóvel (para qualificação regional)</li>
                <li>• Dados de origem (UTM source/campaign/parceiro) para atribuição</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>3. Como usamos seus dados</h2>
              <ul className="space-y-2 pl-4">
                <li>• Para calcular estimativas indicativas de economia por região</li>
                <li>• Para encaminhar sua solicitação ao parceiro GD mais adequado à sua região</li>
                <li>• Para enviar sua análise e proposta pelo WhatsApp (somente com seu consentimento)</li>
                <li>• Para cumprir obrigações legais e regulatórias</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>4. Compartilhamento de dados</h2>
              <p>Seus dados são compartilhados somente com parceiros de geração distribuída que cobrem a sua região, exclusivamente para geração de proposta comercial, e somente com o seu consentimento expresso. Não vendemos seus dados a terceiros. Não usamos seus dados para fins de marketing não solicitado.</p>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>5. Retenção de dados</h2>
              <p>Seus dados são retidos por até 5 anos após o encerramento de qualquer relacionamento comercial, conforme exigido pela legislação tributária e regulatória brasileira. Contas de luz enviadas são armazenadas com segurança e acesso restrito; arquivos não utilizados são excluídos após 2 anos.</p>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>6. Seus direitos (LGPD)</h2>
              <p>Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
              <ul className="space-y-2 pl-4 mt-3">
                <li>• Confirmação da existência de tratamento dos seus dados</li>
                <li>• Acesso aos seus dados</li>
                <li>• Correção de dados incompletos ou incorretos</li>
                <li>• Eliminação dos seus dados</li>
                <li>• Revogação do consentimento a qualquer momento</li>
              </ul>
              <p className="mt-4">Para exercer qualquer desses direitos, entre em contato pelo WhatsApp ou envie um e-mail para <strong>privacidade@trocarluz.com.br</strong>.</p>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>7. Segurança</h2>
              <p>Arquivos de conta de luz são armazenados com controle de acesso (URLs assinadas) e nunca são expostos publicamente. Nossos servidores utilizam HTTPS e criptografia em repouso. Acesso interno é restrito por função.</p>
            </div>

            <div>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "24px", color: "#1A1F36" }}>8. Contato</h2>
              <p>Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato: <strong>privacidade@trocarluz.com.br</strong></p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
