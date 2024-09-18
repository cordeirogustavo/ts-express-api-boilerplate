import { defineConfig, UserConfigExport } from "vitest/config";
import path from "path";

async function getConfig() {
  const tsConfigPaths = (await import("vite-tsconfig-paths")).default;

  const config: UserConfigExport = {
    plugins: [tsConfigPaths()],
    test: {
      globals: true,
      environment: "node",
      include: ["src/**/*.{test,spec}.ts"],
      exclude: ["src/**/*.d.ts", "node_modules", "dist", "coverage"],
      coverage: {
        reporter: ["text", "json", "html"],
      },
      setupFiles: ["vitest.setup.ts"],
    },
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
    },
    build: {
      target: "esnext",
    },
  };

  return defineConfig(config);
}

export default getConfig();
