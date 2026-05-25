import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { LeadForm } from "@/components/lead-form";
import { useGetState } from "@workspace/api-client-react";
import { getGetStateQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

export default function StateDetail() {
  const params = useParams();
  const slug = params.estado || "";
  
  const { data: state, isLoading, error } = useGetState(slug, { 
    query: { 
      enabled: !!slug,
      queryKey: getGetStateQueryKey(slug)
    } 
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20">
          <Skeleton className="h-16 w-1/3 mb-8" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </Layout>
    );
  }

  if (error || !state) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-[#1A1F36] mb-4">Estado não encontrado</h1>
          <Link href="/estados" className="text-[#00B86B] hover:underline">Voltar para a lista de estados</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead 
        title={`Energia no ${state.name} (${state.uf}) — TrocarLuz`}
        description={`Saiba como economizar na conta de luz no estado de ${state.name}. Distribuidora: ${state.distributor}.`}
      />
      
      <section className="bg-[#1A1F36] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-4">
            {state.region}
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-4">
            Energia em {state.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Distribuidora principal: <strong>{state.distributor}</strong>
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-6">
              
              <div className="bg-white p-8 rounded-[12px] border border-[#E2E1DC]">
                <h2 className="font-display font-bold text-2xl text-[#1A1F36] mb-6">Panorama de Economia</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start justify-between border-b border-[#EEEDE8] pb-4">
                    <div>
                      <div className="font-medium text-[#1A1F36]">Tarifa Média Residencial</div>
                      <div className="text-sm text-[#6B7080]">Estimativa R$/kWh (sem impostos)</div>
                    </div>
                    <div className="font-display font-bold text-xl">
                      {state.avgTariffResidential ? `R$ ${state.avgTariffResidential.toFixed(2)}` : 'N/A'}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#EEEDE8] pb-4">
                    <div>
                      <div className="font-medium text-[#1A1F36]">Disponibilidade de GD (Desconto Imediato)</div>
                      <div className="text-sm text-[#6B7080]">Fazendas solares disponíveis no estado</div>
                    </div>
                    <div>
                      {state.gdAvailable ? 
                        <CheckCircle size={28} weight="fill" className="text-[#00B86B]" /> : 
                        <XCircle size={28} weight="fill" className="text-[#F05A28]" />
                      }
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <div className="font-medium text-[#1A1F36]">Mercado Livre Residencial</div>
                      <div className="text-sm text-[#6B7080]">Abertura total prevista para todos os estados</div>
                    </div>
                    <div>
                      {state.aclAvailable2028 ? 
                        <div className="px-3 py-1 bg-[#FFD000]/20 text-[#1A1F36] font-medium rounded-full text-sm">2028</div> : 
                        "N/A"
                      }
                    </div>
                  </div>
                </div>

                {state.description && (
                  <div className="mt-8 pt-6 border-t border-[#EEEDE8] text-[#6B7080]">
                    {state.description}
                  </div>
                )}
              </div>

            </div>

            <div>
              <div className="sticky top-24">
                <LeadForm type="residential" sourcePage={`state-${state.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
