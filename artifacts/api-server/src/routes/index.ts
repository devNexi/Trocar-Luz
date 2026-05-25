import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import articlesRouter from "./articles";
import faqsRouter from "./faqs";
import statesRouter from "./states";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(articlesRouter);
router.use(faqsRouter);
router.use(statesRouter);

export default router;
