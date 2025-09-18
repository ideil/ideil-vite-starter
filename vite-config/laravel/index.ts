import laravelVitePlugin from "laravel-vite-plugin";
import { PluginOption } from "vite";

import config from "../config";

type PluginConfig = Parameters<typeof laravelVitePlugin>[0];

export default function laravelPlugin(options: PluginConfig): PluginOption[] {
    return [
        laravelVitePlugin(options),
        {
            name: "laravel-fix",
            enforce: "post",
            config(userConfig) {
                userConfig.base = config.base;

                if (userConfig.server) {
                    userConfig.server.origin = undefined;
                }
            },
        } as PluginOption,
    ];
}
