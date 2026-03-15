import { Icon } from "./Icon.tsx";
import { SECTIONS } from "../../shared/types.ts";
import type { IconPosition } from "../../shared/types.ts";

const COLUMN_X = 24;
const START_Y = 64; // below toolbar
const ROW_GAP = 100;

export function calcInitialPositions(): IconPosition[] {
  return SECTIONS.map((s, i) => ({
    id: s.id,
    x: COLUMN_X,
    y: START_Y + i * ROW_GAP,
  }));
}

interface IconGridProps {
  positions: IconPosition[];
}

export function IconGrid({ positions }: IconGridProps) {
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
          />
        );
      })}
    </>
  );
}
