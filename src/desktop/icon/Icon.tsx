import { useDraggable } from "@dnd-kit/react";
import { RestrictToWindow } from "@dnd-kit/dom/modifiers";
import type { SectionDefinition } from "../../shared/types.ts";

const ICON_GLYPHS: Record<string, string> = {
  user: "M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z",
  mail: "M2 6l10 7L22 6M2 6h20v12H2z",
  "file-text":
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6M8 13h8M8 17h8M8 9h2",
  camera:
    "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
};

interface IconProps {
  section: SectionDefinition;
  style?: React.CSSProperties;
}

export function Icon({ section, style }: IconProps) {
  const { ref, isDragSource } = useDraggable({
    id: section.id,
    modifiers: [RestrictToWindow],
  });

  const path = ICON_GLYPHS[section.icon] ?? ICON_GLYPHS.user;

  return (
    <div
      ref={ref}
      className={[
        "group absolute flex w-20 cursor-default select-none flex-col items-center gap-1.5 rounded-lg p-2 transition-colors",
        isDragSource
          ? "z-50 scale-105 opacity-80 shadow-lg"
          : "hover:bg-(--color-icon-hover)",
      ].join(" ")}
      style={style}
    >
      <div
        className={[
          "flex h-14 w-14 items-center justify-center rounded-xl border border-(--color-border) bg-(--color-icon-bg) backdrop-blur-sm transition-shadow",
          isDragSource ? "shadow-xl" : "shadow-sm group-hover:shadow-md",
        ].join(" ")}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-(--color-accent)"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={path} />
        </svg>
      </div>
      <span className="max-w-full font-mono text-[11px] font-medium text-(--color-icon-label)">
        {section.label}
      </span>
    </div>
  );
}
