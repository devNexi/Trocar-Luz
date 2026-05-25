import { Router, type IRouter } from "express";
import { brazilianStates, getStateBySlug } from "../lib/states";

const router: IRouter = Router();

router.get("/states", async (_req, res): Promise<void> => {
  res.json(brazilianStates);
});

router.get("/states/:slug", async (req, res): Promise<void> => {
  const rawSlug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const state = getStateBySlug(rawSlug);

  if (!state) {
    res.status(404).json({ error: "State not found" });
    return;
  }

  res.json(state);
});

export default router;
