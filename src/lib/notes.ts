import type { Component } from "svelte";

export type NoteFrontmatter = {
  /** Paper title. */
  title: string;
  /** Year the paper was published. */
  year?: number;
  /** Link to the paper. */
  link?: string;
  /** Date I read it. */
  date: string;
  tags?: string[];
  published?: boolean;
};

type NoteModule = {
  metadata: NoteFrontmatter;
  default: Component;
};

export type Note = NoteFrontmatter & {
  slug: string;
  tags: string[];
  component: Component;
};

// Files prefixed with "_" are drafts: excluded from the glob so they are
// neither listed nor bundled.
const noteModules = import.meta.glob<NoteModule>([
  "/src/content/notes/*.{svx,md}",
  "!/src/content/notes/_*",
]);

export const getAllNotes = async (): Promise<Note[]> => {
  const entries = await Promise.all(
    Object.entries(noteModules).map(async ([path, resolver]) => {
      const module = await resolver();
      const slug =
        path
          .split("/")
          .pop()
          ?.replace(/\.(svx|md)$/, "") ?? "";
      return { slug, metadata: module.metadata, component: module.default };
    }),
  );

  return entries
    .filter((entry) => entry.slug && entry.metadata.published !== false)
    .map(({ slug, metadata, component }) => ({
      ...metadata,
      slug,
      tags: (metadata.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
      component,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
