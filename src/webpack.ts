import path from "path";
import type { Compiler, WebpackPluginInstance } from "webpack";

const PLUGIN_NAME = "TypiaGenerationPlugin";

const loader = path.resolve(__dirname, "./webpack-loader.cjs");
const tsconfig = path.resolve("./tsconfig.json");
const targetMatcher = /\.tsx?$/;

export default class TypiaGenerationPlugin implements WebpackPluginInstance {
  apply(compiler: Compiler) {
    // 処理済みのモジュールを記録する
    const modifiedModules = new WeakSet();

    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      const hooks =
        compiler.webpack.NormalModule.getCompilationHooks(compilation);

      hooks.beforeLoaders.tap(PLUGIN_NAME, (loaders, normalModule) => {
        // 処理済みのモジュールはスキップする
        if (modifiedModules.has(normalModule)) {
          return;
        }

        // TypeScriptファイルでなければスキップする
        if (!targetMatcher.test(normalModule.resource)) {
          return;
        }

        // 後ろから実行されるので、最後に追加する
        loaders.push({
          loader,
          options: {
            resource: normalModule.resource,
            tsconfig,
          },
          ident: null,
          type: null,
        });
      });
    });
  }
}
