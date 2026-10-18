import { useDeviceLayout, Layout } from "./shared/index.ts";
import { DesktopSurface } from "./desktop/index.ts";
import { MobileLayout } from "./mobile/index.ts";

export default function App() {
  // Called once here: each hook call keeps its own override, so children get the toggle as a prop
  const { layout, toggleLayout } = useDeviceLayout();

  return layout === Layout.DESKTOP ? (
    <DesktopSurface onToggleLayout={toggleLayout} />
  ) : (
    <MobileLayout onToggleLayout={toggleLayout} />
  );
}
