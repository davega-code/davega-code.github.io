import type { ComponentType } from "react";
import { About } from "./about/index.ts";
import { Contact } from "./contact/index.ts";
import { Newsletter } from "./newsletter/index.ts";
import { Photography } from "./photography/index.ts";

/** Maps section IDs to their content components. Adding a section here makes it renderable in both layouts. */
export const SECTION_CONTENT: Record<string, ComponentType> = {
  about: About,
  contact: Contact,
  newsletter: Newsletter,
  photography: Photography,
};
