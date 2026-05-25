import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import { sendLeadNotification } from "../lib/email";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  const [lead] = await db
    .insert(leadsTable)
    .values({
      type: data.type,
      nome: data.nome,
      whatsapp: data.whatsapp,
      estado: data.estado,
      distribuidora: data.distribuidora ?? null,
      consumoBand: data.consumoBand ?? null,
      empresa: data.empresa ?? null,
      valorContaBand: data.valorContaBand ?? null,
      segmento: data.segmento ?? null,
      pageSource: data.pageSource ?? null,
      utmSource: data.utmSource ?? null,
      utmMedium: data.utmMedium ?? null,
      utmCampaign: data.utmCampaign ?? null,
      status: "new",
    })
    .returning();

  await sendLeadNotification({
    type: data.type as "residential" | "business",
    nome: data.nome,
    whatsapp: data.whatsapp,
    estado: data.estado,
    distribuidora: data.distribuidora,
    consumoBand: data.consumoBand,
    empresa: data.empresa,
    valorContaBand: data.valorContaBand,
    segmento: data.segmento,
    pageSource: data.pageSource,
  });

  req.log.info({ leadId: lead.id, estado: lead.estado, type: lead.type }, "Lead created");

  res.status(201).json({
    id: lead.id,
    type: lead.type,
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    estado: lead.estado,
    distribuidora: lead.distribuidora,
    consumoBand: lead.consumoBand,
    empresa: lead.empresa,
    valorContaBand: lead.valorContaBand,
    segmento: lead.segmento,
    pageSource: lead.pageSource,
    utmSource: lead.utmSource,
    utmMedium: lead.utmMedium,
    utmCampaign: lead.utmCampaign,
    status: lead.status,
    createdAt: lead.createdAt.toISOString(),
  });
});

export default router;
