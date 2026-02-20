export type BlogFrontmatter = {
  title: string;
  date: string;
  tags?: string[];
  language?: string;
  published?: boolean;
};

type BlogModule = {
  metadata: BlogFrontmatter;
  default: unknown;
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  language: string;
};

export type BlogPostWithComponent = BlogPost & {
  component: BlogModule["default"];
};

const postModules = import.meta.glob<BlogModule>(
  "/src/content/blog/*.{svx,md}",
);

const normalizeTags = (tags?: string[]) =>
  (tags ?? []).map((tag) => tag.trim()).filter(Boolean);

const isPublished = (metadata: BlogFrontmatter) => metadata.published !== false;

const toPost = (slug: string, metadata: BlogFrontmatter): BlogPost => ({
  slug,
  title: metadata.title,
  date: metadata.date,
  tags: normalizeTags(metadata.tags),
  language: metadata.language ?? "en",
});

const sortByDateDesc = (a: BlogPost, b: BlogPost) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const entries = await Promise.all(
    Object.entries(postModules).map(async ([path, resolver]) => {
      const module = await resolver();
      const slug =
        path
          .split("/")
          .pop()
          ?.replace(/\.(svx|md)$/, "") ?? "";
      return { slug, metadata: module.metadata };
    }),
  );

  return entries
    .filter((entry) => entry.slug && isPublished(entry.metadata))
    .map((entry) => toPost(entry.slug, entry.metadata))
    .sort(sortByDateDesc);
};

export const getPostBySlugWithComponent = async (
  slug: string,
): Promise<BlogPostWithComponent | null> => {
  const match = Object.entries(postModules).find(([path]) =>
    path.endsWith(`/${slug}.svx`) || path.endsWith(`/${slug}.md`),
  );

  if (!match) return null;

  const module = await match[1]();

  if (!isPublished(module.metadata)) return null;

  return {
    ...toPost(slug, module.metadata),
    component: module.default,
  };
};

export const getTagIndex = async () => {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
};

export const getPostsByTag = async (tag: string) => {
  const posts = await getAllPosts();
  const normalized = tag.trim().toLowerCase();

  return posts.filter((post) =>
    post.tags.some((entry) => entry.toLowerCase() === normalized),
  );
};
