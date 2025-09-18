import path from "node:path";
import type { Plugin } from "vite";

import { configureTwig, parseHTML } from "./tasks";
import type { PluginOptions } from "./types";

export async function viteTwigPlugin(options: PluginOptions): Promise<Plugin> {
    configureTwig(options);

    return {
        name: "vite-plugin-twig",
        transformIndexHtml: {
            order: "pre",
            handler: async (html, ctx) => {
                return await parseHTML(html, ctx, options);
            },
        },
        handleHotUpdate({ file, server }) {
            if (path.extname(file) === ".twig") {
                server.ws.send({ type: "full-reload" });
            }
        },
    };
}
