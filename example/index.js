import initSWC, { transformSync } from "../lib/wasm";

const ITERATIONS = 250;

async function run() {
  await initSWC();
  const startTime = Date.now();
  let result;
  for (let i = 0; i < ITERATIONS; i++) {
    result = transformSync("export default function test() {}", {
      filename: "input.js",
      sourceMaps: false,
      isModule: true,
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
        transform: {},
        target: "es5",
      },
      module: {
        type: "commonjs",
        strict: true,
        strictMode: true,
      },
    });
  }
  console.log(result);
  let duration = Date.now() - startTime;
  console.log(
    `Took ${duration}ms in total, ${(duration / ITERATIONS).toFixed(
      2
    )}ms per iteration`
  );
}

run().catch(console.error);
