import { Icon } from "./Icon.tsx";
import { SECTIONS } from "../../shared/types.ts";
import type { IconPosition } from "../../shared/types.ts";

/** Default icon column — left edge with padding */
const COLUMN_X = 24;
/** Default first icon top — below the toolbar */
const START_Y = 64;

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
      {SECTIONS.map((section) => {
        const pos = positions.find((p) => p.id === section.id);
        return (
          <Icon
            key={section.id}
            section={section}
            style={{
              left: pos?.x ?? COLUMN_X,
              top: pos?.y ?? START_Y,
            }}
            onClick={() => onIconClick(section.id)}
          />
        );
      })}
    </>
  );
}
