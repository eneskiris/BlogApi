import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/express";
import * as blogService from "../services/blog.service";

export const createBlog = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;

  try {
    const blog = await blogService.createBlog(title, content, req.userId);

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const blog = await blogService.getBlogById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ blog });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await blogService.getAllBlogs();

    res.status(200).json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const blog = await blogService.updateBlog(id, title, content);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const blog = await blogService.deleteBlog(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
