import { Router, type IRouter } from "express";
import { db, articlesTable } from "@workspace/db";
import { eq, and, desc } from "drizzle-orm";
import { CreateArticleBody, ListArticlesQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/articles", async (req, res): Promise<void> => {
  const params = ListArticlesQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { category, estado, limit = 10, offset = 0 } = params.data;

  const conditions = [eq(articlesTable.published, true)];
  if (category) conditions.push(eq(articlesTable.category, category));
  if (estado) conditions.push(eq(articlesTable.estado, estado));

  const articles = await db
    .select({
      id: articlesTable.id,
      slug: articlesTable.slug,
      title: articlesTable.title,
      excerpt: articlesTable.excerpt,
      category: articlesTable.category,
      estado: articlesTable.estado,
      author: articlesTable.author,
      publishedAt: articlesTable.publishedAt,
      updatedAt: articlesTable.updatedAt,
    })
    .from(articlesTable)
    .where(and(...conditions))
    .orderBy(desc(articlesTable.publishedAt))
    .limit(limit)
    .offset(offset);

  res.json(
    articles.map((a) => ({
      ...a,
      publishedAt: a.publishedAt?.toISOString() ?? null,
      updatedAt: a.updatedAt.toISOString(),
    }))
  );
});

router.get("/articles/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

  const [article] = await db
    .select()
    .from(articlesTable)
    .where(and(eq(articlesTable.slug, rawSlug), eq(articlesTable.published, true)));

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }

  res.json({
    ...article,
    keywords: article.keywords ?? [],
    faqItems: article.faqItems ?? null,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    updatedAt: article.updatedAt.toISOString(),
    createdAt: article.createdAt.toISOString(),
  });
});

router.post("/articles", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!process.env.CONTENT_API_KEY || authHeader !== `Bearer ${process.env.CONTENT_API_KEY}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const now = new Date();

  const [article] = await db
    .insert(articlesTable)
    .values({
      slug: data.slug,
      title: data.title,
      metaDescription: data.metaDescription ?? null,
      content: data.content,
      excerpt: data.excerpt ?? null,
      category: data.category ?? null,
      estado: data.estado ?? null,
      keywords: data.keywords ?? [],
      author: data.author ?? "Equipe TrocaLuz",
      reviewer: data.reviewer ?? null,
      schemaType: data.schemaType ?? null,
      faqItems: data.faqItems ?? null,
      published: data.published ?? true,
      publishedAt: data.published !== false ? now : null,
    })
    .returning();

  req.log.info({ articleId: article.id, slug: article.slug }, "Article published");

  res.status(201).json({
    ...article,
    keywords: article.keywords ?? [],
    faqItems: article.faqItems ?? null,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    updatedAt: article.updatedAt.toISOString(),
    createdAt: article.createdAt.toISOString(),
  });
});

export default router;
