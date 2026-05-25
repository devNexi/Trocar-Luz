import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { useListArticles, getListArticlesQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarBlank } from "@phosphor-icons/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function GuidesIndex() {
  const { data: articles, isLoading, error } = useListArticles();

  return (
    <Layout>
      <SEOHead 
        title="Guias de Energia — TrocarLuz" 
        description="Aprenda tudo sobre mercado livre de energia, geração distribuída e como reduzir sua conta de luz."
      />
      
      <section className="bg-white py-16 border-b border-[#E2E1DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-4xl text-[#1A1F36] mb-4">
            Guias TrocarLuz
          </h1>
          <p className="text-xl text-[#6B7080] max-w-2xl">
            Tudo o que você precisa saber para tomar a melhor decisão e pagar menos na conta de luz. Sem complicação.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7F7F5] min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-64 rounded-[16px]" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-red-500 font-medium">Erro ao carregar os guias.</div>
          )}

          {articles && articles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[16px] border border-[#E2E1DC]">
              <h3 className="font-display text-xl font-bold text-[#1A1F36] mb-2">Nenhum guia encontrado</h3>
              <p className="text-[#6B7080]">Em breve publicaremos novos conteúdos.</p>
            </div>
          )}

          {articles && articles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link 
                  key={article.id} 
                  href={`/guias/${article.slug}`}
                  className="bg-white rounded-[16px] border border-[#E2E1DC] overflow-hidden group hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-40 bg-[#EEEDE8] flex items-center justify-center p-6 relative overflow-hidden">
                     {/* Decorative background for article card */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B86B] rounded-full blur-[40px] opacity-20" />
                     <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FFD000] rounded-full blur-[30px] opacity-20" />
                     <div className="font-display font-bold text-2xl text-[#1A1F36] opacity-30 text-center z-10 line-clamp-2">
                       {article.title}
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    {article.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#00B86B] mb-2">
                        {article.category}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-xl text-[#1A1F36] mb-3 group-hover:text-[#00B86B] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[#6B7080] text-sm line-clamp-3 mb-6 flex-1">
                      {article.excerpt || "Leia mais sobre este assunto."}
                    </p>
                    <div className="flex items-center text-xs text-[#9EA3B0] mt-auto">
                      <CalendarBlank size={16} className="mr-1.5" />
                      {article.publishedAt ? format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : 'Recente'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
