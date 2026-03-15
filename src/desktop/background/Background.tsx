export function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-(--color-surface)">
      {/* Subtle noise texture via dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-text-primary) 0.5px, transparent 0.5px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Warm gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-(--color-accent)/3 via-transparent to-(--color-surface-overlay)/30" />
    </div>
  );
}
