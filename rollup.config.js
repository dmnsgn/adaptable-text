import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/index.js",
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ],
  moduleName: "AdaptableText",
  targets: [
    {
      format: "umd",
      dest: "lib/adaptable-text.js"
    },
    {
      format: "es",
      dest: "lib/adaptable-text.module.js"
    }
  ],
  external: [
    'clamp'
  ]
};
