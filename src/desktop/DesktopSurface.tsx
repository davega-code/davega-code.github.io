import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Background } from "./background/index.ts";
import { Toolbar } from "./toolbar/index.ts";
import { IconGrid } from "./icon/index.ts";
import { SECTIONS } from "../shared/types.ts";
import type { IconPosition } from "../shared/types.ts";

function calcInitialPositions(): IconPosition[] {
  return SECTIONS.map((s, i) => ({
    id: s.id,
    x: 24,
    y: 64 + i * 100,
  }));
}

export function DesktopSurface() {
  const [positions, setPositions] =
    useState<IconPosition[]>(calcInitialPositions);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, transform } = event.operation;
        if (!source || (!transform.x && !transform.y)) return;

        setPositions((prev) =>
          prev.map((p) =>
            p.id === String(source.id)
              ? { ...p, x: p.x + transform.x, y: p.y + transform.y }
              : p,
          ),
        );
      }}
    >
      <div className="relative min-h-svh overflow-hidden">
        <Background />
        <Toolbar />
        <IconGrid positions={positions} />
      </div>
    </DragDropProvider>
  );
}
