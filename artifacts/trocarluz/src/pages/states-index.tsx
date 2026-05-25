import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { useListStates } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin } from "@phosphor-icons/react";

export default function StatesIndex() {
  const { data: states, isLoading, error } = useListStates();

  return (
    <Layout>
      <SEOHead 
        title="Opções de Energia por Estado Brasileiro — TrocarLuz" 
        description="Veja as distribuidoras, tarifas e disponibilidade de GD para o seu estado no Brasil."
      />
      
      <section className="bg-white py-16 border-b border-[#E2E1DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl text-[#1A1F36] mb-4">
            Energia em seu Estado
          </h1>
          <p className="text-xl text-[#6B7080]">
            Selecione seu estado para ver tarifas, distribuidoras e como economizar.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-[12px]" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium">Erro ao carregar os estados. Tente novamente mais tarde.</div>
          )}

          {states && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {states.map((state) => (
                <Link 
                  key={state.slug} 
                  href={`/estados/${state.slug}`}
                  className="bg-white p-6 rounded-[12px] border border-[#E2E1DC] hover:border-[#00B86B] hover:shadow-md transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#1A1F36] group-hover:text-[#00B86B] transition-colors">{state.name}</h3>
                    <span className="text-sm text-[#6B7080]">{state.uf}</span>
                  </div>
                  <MapPin size={24} className="text-[#E2E1DC] group-hover:text-[#FFD000] transition-colors" weight="fill" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
