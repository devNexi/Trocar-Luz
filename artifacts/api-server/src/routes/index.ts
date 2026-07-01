import { Router, type IRouter } from "express";
import healthRouter from "./health";
import leadsRouter from "./leads";
import articlesRouter from "./articles";
import faqsRouter from "./faqs";
import statesRouter from "./states";
import switchRequestsRouter from "./switch-requests";
import billOffersRouter from "./bill-offers";
import storageRouter from "./storage";
import sitemapRouter from "./sitemap";

const router: IRouter = Router();

router.use(healthRouter);
router.use(leadsRouter);
router.use(articlesRouter);
router.use(faqsRouter);
router.use(statesRouter);
router.use(switchRequestsRouter);
router.use(billOffersRouter);
router.use(storageRouter);
router.use(sitemapRouter);

export default router;
