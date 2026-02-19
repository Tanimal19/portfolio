import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getPostBySlugWithComponent } from "$lib/blog";

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
  const post = await getPostBySlugWithComponent(params.slug);

  if (!post) {
    throw error(404, "Post not found");
  }

  return { post };
};
