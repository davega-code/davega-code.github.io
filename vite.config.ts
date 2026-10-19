import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Lists this dev/preview server's PID so the Copilot CLI sessionEnd hook (.github/hooks/) can stop it. */
function recordPid(): Plugin {
  const dir = join(tmpdir(), 'davega-net-dev-servers')
  const file = join(dir, String(process.pid))
  const record = () => {
    mkdirSync(dir, { recursive: true })
    writeFileSync(file, '')
    process.once('exit', () => rmSync(file, { force: true }))
  }
  return { name: 'record-pid', configureServer: record, configurePreviewServer: record }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), recordPid()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    open: true,
  },
})
