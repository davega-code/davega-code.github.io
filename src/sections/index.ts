import type { ComponentType } from "react";
import { About } from "./about/index.ts";
import { Contact } from "./contact/index.ts";
import { Blog } from "./blog/index.ts";
import { Photography } from "./photography/index.ts";

/** Maps section IDs to their content components. Adding a section here makes it renderable in both layouts. */
export const SECTION_CONTENT: Record<string, ComponentType> = {
  about: About,
  contact: Contact,
  blog: Blog,
  photography: Photography,
};
