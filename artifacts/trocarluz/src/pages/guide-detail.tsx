import { Layout } from "@/components/layout";
import { SEOHead } from "@/components/seo-head";
import { useGetArticle, getGetArticleQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { MiniLeadForm } from "@/components/mini-lead-form";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function GuideDetail() {
  const params = useParams();
  const slug = params.slug || "";
  
  const { data: article, isLoading, error } = useGetArticle(slug, { 
    query: { 
      enabled: !!slug,
      queryKey: getGetArticleQueryKey(slug)
    } 
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-6 w-32 mb-12" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-[#1A1F36] mb-4">Artigo não encontrado</h1>
          <Link href="/guias" className="text-[#00B86B] hover:underline">Ver todos os guias</Link>
        </div>
      </Layout>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription || article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.publishedAt || article.createdAt
  };

  // Setup FAQ schema if available
  const faqSchema = article.faqItems ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Object.entries(article.faqItems).map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  } : undefined;

  return (
    <Layout>
      <SEOHead 
        title={`${article.title} — Guias TrocaLuz`}
        description={article.metaDescription || article.excerpt || ""}
        schema={schema}
      />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      
      <article className="bg-white min-h-screen">
        <header className="bg-[#F7F7F5] py-16 border-b border-[#E2E1DC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {article.category && (
              <span className="text-sm font-semibold uppercase tracking-wider text-[#00B86B] mb-4 block">
                {article.category}
              </span>
            )}
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#1A1F36] leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center text-[#6B7080] text-sm">
              <span className="font-medium mr-4">Por {article.author}</span>
              <span>
                {article.publishedAt ? format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ''}
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1 max-w-3xl prose prose-lg prose-headings:font-display prose-headings:font-bold prose-headings:text-[#1A1F36] prose-a:text-[#00B86B] prose-p:text-[#6B7080] prose-li:text-[#6B7080]">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <aside className="w-full lg:w-[320px] shrink-0">
            <div className="sticky top-24 bg-[#1A1F36] rounded-[16px] p-6 text-white border border-[#2a3047]">
              <MiniLeadForm
                heading="Ficou com dúvida? Fale com um especialista."
                sourcePage="guias-slug"
              />
            </div>
          </aside>
          
        </div>
      </article>
    </Layout>
  );
}
