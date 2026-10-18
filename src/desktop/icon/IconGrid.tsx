import { Icon } from "./Icon.tsx";
import { SECTIONS } from "../../shared/types.ts";
import type { IconPosition } from "../../shared/types.ts";

interface IconGridProps {
  positions: IconPosition[];
  onIconClick: (sectionId: string) => void;
}

/**
 * IconGrid — renders all section icons at their current drag positions.
 * Positions are inline styles because they're runtime-computed pixel values
 * from the drag-and-drop system (cannot be expressed as static CSS classes).
 */
export function IconGrid({ positions, onIconClick }: IconGridProps) {
  return (
    <>
      {positions.map((pos) => {
        const section = SECTIONS.find((s) => s.id === pos.id)!;
        return (
          <Icon
            key={section.id}
            section={section}
            style={{ left: pos.x, top: pos.y }}
            onClick={() => onIconClick(section.id)}
          />
        );
      })}
    </>
  );
}
