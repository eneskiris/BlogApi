import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import * as blogService from "../services/blog.service";
import { asyncHandler } from "../utils/asyncHandler";

export const createBlog = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    const blog = await blogService.createBlog(title, content, req.userId);

    res.status(201).json({ message: "Blog created successfully", blog });
  }
);

export const getBlogById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const blog = await blogService.getBlogById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  }
);

export const getAllBlogs = asyncHandler(
  async (_req: Request, res: Response, next: NextFunction) => {
    const blogs = await blogService.getAllBlogs();

    res.status(200).json({ blogs });
  }
);

export const updateBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await blogService.updateBlog(id, title, content);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  }
);

export const deleteBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const blog = await blogService.deleteBlog(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  }
);
