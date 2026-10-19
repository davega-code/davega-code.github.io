import { useEffect, useRef } from "react";
import { createPainter, type Scene } from "./engine.ts";
import * as css from "./pixel-canvas.css.ts";

/** Advance Wars-style choppy frame rate */
const FRAME_MS = 1000 / 12;

interface PixelCanvasProps {
  scene: Scene;
  /** Accessible description; omit for decorative canvases */
  label?: string;
  /** Fixed CSS scale; when omitted the largest crisp scale that fits the parent (up to maxScale) is used */
  scale?: number;
  maxScale?: number;
}

/** Plays a pixel scene in a loop while it is on screen; shows its poster frame under reduced motion. */
export function PixelCanvas({ scene, label, scale: fixedScale, maxScale = 4 }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const parent = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now();
    /** Device pixels per art pixel; a whole number so every art pixel stays square and crisp */
    let units = 0;
    let dpr = 0;
    let dprQuery: MediaQueryList | undefined;
    let visible = false;
    let raf = 0;
    let lastFrame = -1;
    let lastT = scene.poster;

    function paint(t: number) {
      lastT = t;
      ctx.setTransform(units, 0, 0, units, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, scene.width, scene.height);
      scene.paint(createPainter(ctx, t, document.documentElement.classList.contains("dark")));
    }

    function tick(now: number) {
      raf = requestAnimationFrame(tick);
      const f = Math.floor(((now - start) % scene.duration) / FRAME_MS);
      if (f === lastFrame) return;
      lastFrame = f;
      paint(f * FRAME_MS);
    }

    function sync() {
      cancelAnimationFrame(raf);
      raf = 0;
      if (reducedMotion.matches) paint(scene.poster);
      else if (visible) raf = requestAnimationFrame(tick);
    }

    function resize() {
      const nextDpr = window.devicePixelRatio || 1;
      const fit = Math.floor((parent.clientWidth * nextDpr) / scene.width);
      const next = fixedScale ? Math.round(fixedScale * nextDpr) : Math.min(Math.round(maxScale * nextDpr), Math.max(1, fit));
      if (next === units && nextDpr === dpr) return;
      units = next;
      dpr = nextDpr;
      canvas.width = scene.width * units;
      canvas.height = scene.height * units;
      canvas.style.width = `${(scene.width * units) / dpr}px`;
      canvas.style.height = `${(scene.height * units) / dpr}px`;
      paint(lastT);
    }

    /** Moving to a screen with a different pixel density doesn't resize the parent, so watch the density itself */
    function watchDpr() {
      dprQuery?.removeEventListener("change", onDprChange);
      dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      dprQuery.addEventListener("change", onDprChange);
    }

    function onDprChange() {
      resize();
      watchDpr();
    }

    resize();
    watchDpr();
    sync();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(canvas);
    // Repaint a still frame when the theme flips while paused
    const themeObserver = new MutationObserver(() => {
      if (!raf) paint(lastT);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    reducedMotion.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      reducedMotion.removeEventListener("change", sync);
      dprQuery?.removeEventListener("change", onDprChange);
    };
  }, [scene, fixedScale, maxScale]);

  return label ? (
    <canvas ref={canvasRef} className={css.canvas} role="img" aria-label={label} />
  ) : (
    <canvas ref={canvasRef} className={css.canvas} aria-hidden="true" />
  );
}
