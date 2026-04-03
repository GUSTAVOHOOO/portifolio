import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const services = defineCollection({
  loader: file("src/data/services.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  }),
});

const team = defineCollection({
  loader: file("src/data/team.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: file("src/data/testimonials.json"),
  schema: z.object({
    id: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    photo: z.string().optional(),
    text: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["loja", "cardapio", "landing-page", "institucional"]),
    thumbnail: z.string(),
    liveUrl: z.string().url(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { services, team, testimonials, projects };
