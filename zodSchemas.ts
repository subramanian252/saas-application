import { z } from "zod";

export const siteCreationSchema = (options: {
  isSubDirectoryUnique: (subdirectory: string) => boolean;
}) =>
  z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(100),
    subdirectory: z
      .string()
      .min(1)
      .max(50)
      .regex(/^[a-z]+$/, "Subdirectory can only contain lowercase letters")
      .transform((subdirectory) => subdirectory.toLowerCase())
      .refine((subdirectory) => options.isSubDirectoryUnique(subdirectory), {
        message: "Subdirectory already exists",
      }),
  });

export const postSchema = z.object({
  title: z.string().min(1).max(50),
  slug: z.string().min(1).max(50),
  smallDescription: z.string().min(1).max(100),
  image: z.string().min(1),
  articleContent: z.string().min(1).max(10000),
  siteId: z.string().min(1),
});

export const siteSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
  subdirectory: z.string().min(1).max(50),
});
