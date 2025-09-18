import {
    configureVueProject,
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import importPlugin from "eslint-plugin-import";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";
import pluginVue from "eslint-plugin-vue";

configureVueProject({
    tsSyntaxInTemplates: true,
    scriptLangs: ["ts"],
    rootDir: import.meta.dirname,
});

export default defineConfigWithVueTs(
    pluginVue.configs["flat/essential"],
    vueTsConfigs.recommended,
    importPlugin.flatConfigs.recommended,
    prettierConfigRecommended,
    {
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/no-undef-components": "error",

            // import
            "sort-imports": ["error", { ignoreDeclarationSort: true }],
            "import/no-unresolved": "off",
            "import/newline-after-import": ["error", { count: 1 }],
            "import/no-duplicates": "off",
            "import/no-named-as-default": "off",
            "import/no-anonymous-default-export": "off",
            "import/namespace": "off",
            "import/named": "off",
            "import/order": [
                "error",
                {
                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },
                    "newlines-between": "always",
                    groups: [
                        ["builtin", "external"],
                        "internal",
                        "parent",
                        ["sibling", "index"],
                    ],
                    pathGroups: [
                        {
                            pattern: "@src/**",
                            group: "internal",
                        },
                        {
                            pattern: "@pub/**",
                            group: "internal",
                        },
                        {
                            pattern: "@/**",
                            group: "internal",
                        },
                        {
                            pattern: "~/**",
                            group: "internal",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],
        },
    },
);
