import * as mdx from "eslint-plugin-mdx";

export default [
  {
    ...mdx.flat,
    files: ["**/*.mdx"],
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {
      "mdx/remark": "warn",
    },
  },
  {
    ignores: [
      "**/*.js",
      "**/*.mjs",
      "**/*.ts",
      "**/*.tsx",
      "**/*.jsx",
      "node_modules/**",
      "build/**",
      ".docusaurus/**",
    ],
  },
];
