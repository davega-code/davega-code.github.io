import { useDeviceLayout, Layout } from "./shared/index.ts";
import { DesktopSurface } from "./desktop/index.ts";
import { MobileLayout } from "./mobile/index.ts";

export default function App() {
  return useDeviceLayout() === Layout.DESKTOP ? <DesktopSurface /> : <MobileLayout />;
}
