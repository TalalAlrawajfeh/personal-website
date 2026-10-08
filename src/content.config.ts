import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["published", "preprint", "ongoing"]),
    authors: z.array(z.string()).default([]),
    venue: z.string().optional(),
    year: z.number().optional(),
    paperUrl: z.url().optional(),
    arxivUrl: z.url().optional(),
    codeUrl: z.url().optional(),
    projectUrl: z.url().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    abstract: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const publications = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/publications",
  }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    details: z.string().optional(),
    note: z.string().optional(),
    paperUrl: z.url().optional(),
    arxivUrl: z.url().optional(),
    codeUrl: z.url().optional(),
    bibtex: z.string().optional(),
    researchSlug: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
  }),
});

export const collections = { research, publications, blog };
