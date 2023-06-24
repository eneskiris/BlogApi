import { Router } from "express";
import { blogRoutes } from "./blog.routes";
import { authRoutes } from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);

export default router;
