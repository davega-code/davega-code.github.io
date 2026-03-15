import { useDeviceLayout, Layout } from "./shared/index.ts";
import { DesktopSurface } from "./desktop/index.ts";
import { ComingSoon } from "./mobile/index.ts";

export default function App() {
  const { layout } = useDeviceLayout();

  return layout === Layout.DESKTOP ? <DesktopSurface /> : <ComingSoon />;
}
