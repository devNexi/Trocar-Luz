import { Router, type IRouter } from "express";
import { db, articlesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const STATIC_ROUTES = [
  "/",
  "/para-sua-casa",
  "/para-sua-empresa",
  "/geracao-distribuida",
  "/mercado-livre-energia",
  "/energia-2028",
  "/comparar-desconto",
  "/enviar-conta",
  "/carro-eletrico",
  "/parceiros/veiculos-eletricos",
  "/estados",
  "/guias",
  "/perguntas-frequentes",
  "/sobre",
  "/politica-de-privacidade",
];

const STATE_SLUGS = [
  "sao-paulo","rio-de-janeiro","minas-gerais","bahia","rio-grande-do-sul","parana",
  "santa-catarina","goias","pernambuco","ceara","para","mato-grosso","espirito-santo",
  "amazonas","mato-grosso-do-sul","maranhao","rio-grande-do-norte","alagoas","piauI",
  "paraiba","sergipe","rondonia","tocantins","acre","amapa","roraima","distrito-federal",
];

router.get("/sitemap.xml", async (req, res): Promise<void> => {
  const domain = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
    : "https://trocarluz.com.br";

  const articles = await db
    .select({ slug: articlesTable.slug, updatedAt: articlesTable.updatedAt })
    .from(articlesTable)
    .where(eq(articlesTable.published, true));

  const urls: string[] = [];

  const addUrl = (path: string, priority = "0.8", changefreq = "weekly") => {
    urls.push(`
  <url>
    <loc>${domain}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  };

  addUrl("/", "1.0", "daily");
  addUrl("/comparar-desconto", "0.9", "daily");
  addUrl("/enviar-conta", "0.9", "daily");
  addUrl("/para-sua-casa", "0.9", "weekly");
  addUrl("/para-sua-empresa", "0.9", "weekly");
  addUrl("/carro-eletrico", "0.8", "weekly");
  addUrl("/geracao-distribuida", "0.8", "weekly");
  addUrl("/mercado-livre-energia", "0.8", "weekly");
  addUrl("/energia-2028", "0.8", "weekly");
  addUrl("/estados", "0.7", "monthly");
  addUrl("/guias", "0.7", "weekly");
  addUrl("/perguntas-frequentes", "0.7", "monthly");
  addUrl("/sobre", "0.5", "monthly");
  addUrl("/politica-de-privacidade", "0.3", "monthly");
  addUrl("/parceiros/veiculos-eletricos", "0.6", "monthly");

  for (const slug of STATE_SLUGS) {
    addUrl(`/estados/${slug}`, "0.6", "monthly");
  }

  for (const article of articles) {
    urls.push(`
  <url>
    <loc>${domain}/guias/${article.slug}</loc>
    <lastmod>${article.updatedAt.toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

router.get("/robots.txt", (_req, res): void => {
  const domain = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0]}`
    : "https://trocarluz.com.br";

  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: ${domain}/api/sitemap.xml
`);
});

export default router;
