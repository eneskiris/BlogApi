import { Blog, BlogModel } from "../models/blog.model";

export const createBlog = async (
  title: string,
  content: string,
  createdBy: string | undefined
): Promise<Blog> => {
  const blog: Blog = new BlogModel({
    title,
    content,
    createdBy: createdBy || "",
  });

  return blog.save();
};

export const getBlogById = async (id: string): Promise<Blog | null> => {
  return BlogModel.findById(id);
};

export const getAllBlogs = async (): Promise<Blog[]> => {
  return BlogModel.find();
};

export const updateBlog = async (
  id: string,
  title: string,
  content: string
): Promise<Blog | null> => {
  return BlogModel.findByIdAndUpdate(id, { title, content }, { new: true });
};

export const deleteBlog = async (id: string): Promise<Blog | null> => {
  return BlogModel.findByIdAndDelete(id);
};
