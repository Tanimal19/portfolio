import type { PageServerLoad } from "./$types";
import { getAllPosts, getTagIndex } from "$lib/blog";

export const load: PageServerLoad = async () => {
  const [posts, tags] = await Promise.all([getAllPosts(), getTagIndex()]);

  return { posts, tags };
};
