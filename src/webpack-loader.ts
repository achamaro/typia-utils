/**
 * This source code refers to the source code of Typia.
 * https://github.com/samchon/typia/blob/v3.8.6/src/programmers/TypiaProgrammer.ts
 */

import { dirname } from "path";
import ts from "typescript";
import { transform } from "typia/lib/transform";

interface LoaderOptions {
  resource: string;
  tsconfig: string;
}

interface WebpackLoader {
  getOptions(): LoaderOptions;
  async(): (err: Error | null, source?: string) => void;
}

export default function webpackLoader(this: WebpackLoader, source: string) {
  const { resource, tsconfig } = this.getOptions();

  if (!source.includes("typia.")) return source;

  const cb = this.async();

  (async () => {
    const { options: compilerOptions } = ts.parseJsonConfigFileContent(
      ts.readConfigFile(tsconfig, ts.sys.readFile).config,
      {
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
        useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames,
      },
      dirname(tsconfig)
    );

    const program = ts.createProgram([resource], compilerOptions);

    // DO TRANSFORM
    const result = ts.transform(
      program.getSourceFile(resource)!,
      [
        transform(
          program,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ((compilerOptions.plugins as any[]) ?? []).find(
            (p) =>
              p.transform === "typia/lib/transform" ||
              p.transform === "../src/transform.ts"
          ) ?? {}
        ),
      ],
      compilerOptions
    );

    // ARCHIVE TRANSFORMED FILES
    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
    });
    for (const file of result.transformed) {
      const content = printer.printFile(file);
      return cb(null, content);
    }

    cb(null, source);
  })();
}
