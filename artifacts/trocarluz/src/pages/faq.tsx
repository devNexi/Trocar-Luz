import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { useListFaqs } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "wouter";

export default function FAQ() {
  const { data: faqs, isLoading } = useListFaqs();

  const faqSchema = faqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : undefined;

  return (
    <Layout>
      <SEOHead 
        title="Perguntas Frequentes — TrocarLuz" 
        description="Tire suas dúvidas sobre Geração Distribuída, Mercado Livre de Energia e como economizar na conta de luz."
        schema={faqSchema}
      />
      
      <section className="bg-white py-16 border-b border-[#E2E1DC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-extrabold text-4xl text-[#1A1F36] mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-xl text-[#6B7080]">
            Não encontrou o que procurava? Nossa equipe está pronta para ajudar.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F7F7F5] min-h-[500px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          )}

          {faqs && faqs.length > 0 && (
            <div className="bg-white rounded-[16px] border border-[#E2E1DC] overflow-hidden">
              <Accordion type="multiple" className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-b border-[#EEEDE8] px-6 last:border-0">
                    <AccordionTrigger className="font-display font-semibold text-lg text-[#1A1F36] hover:text-[#00B86B] py-6 text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6B7080] text-base leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          
          {faqs && faqs.length === 0 && (
             <div className="text-center py-12">
               <p className="text-[#6B7080]">As perguntas frequentes estão sendo atualizadas.</p>
             </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-[#1A1F36] font-medium mb-4">Ainda tem dúvidas?</p>
            <Link href="/para-sua-casa" className="btn-secondary inline-block bg-white">
              Fazer uma simulação
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
