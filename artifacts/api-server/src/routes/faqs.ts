import { Router, type IRouter } from "express";
import { db, faqsTable } from "@workspace/db";
import { eq, and, asc } from "drizzle-orm";
import { CreateFaqBody, ListFaqsQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/faqs", async (req, res): Promise<void> => {
  const params = ListFaqsQueryParams.safeParse(req.query);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { category } = params.data;

  const faqs = await db
    .select()
    .from(faqsTable)
    .where(
      category
        ? and(eq(faqsTable.published, true), eq(faqsTable.category, category))
        : eq(faqsTable.published, true)
    )
    .orderBy(asc(faqsTable.displayOrder), asc(faqsTable.createdAt));

  res.json(
    faqs.map((f) => ({
      ...f,
      createdAt: f.createdAt.toISOString(),
    }))
  );
});

router.post("/faqs", async (req, res): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!process.env.CONTENT_API_KEY || authHeader !== `Bearer ${process.env.CONTENT_API_KEY}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const parsed = CreateFaqBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  const [faq] = await db
    .insert(faqsTable)
    .values({
      question: data.question,
      answer: data.answer,
      category: data.category ?? null,
      displayOrder: data.displayOrder ?? null,
      published: data.published ?? true,
    })
    .returning();

  req.log.info({ faqId: faq.id }, "FAQ created");

  res.status(201).json({
    ...faq,
    createdAt: faq.createdAt.toISOString(),
  });
});

export default router;
