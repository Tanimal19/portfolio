import type { PageServerLoad } from "./$types";
import { getAllPosts, getPostsByTag, getTagIndex } from "$lib/blog";

export const load: PageServerLoad = async ({ url }) => {
  const tagParam = url.searchParams.get("tags")?.trim() ?? "";
  const [posts, tags] = await Promise.all([
    tagParam ? getPostsByTag(tagParam) : getAllPosts(),
    getTagIndex(),
  ]);

  return { posts, tags, activeTag: tagParam || null };
};
