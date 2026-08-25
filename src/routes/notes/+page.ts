import type { PageLoad } from "./$types";
import { getAllNotes } from "$lib/notes";

// Notes are rendered inline as components, so load them in the browser.
export const ssr = false;

export const load: PageLoad = async () => ({ notes: await getAllNotes() });
