import * as Babel from "@babel/standalone";
import initSWC, { transformSync } from "../lib/wasm";

const ITERATIONS = 5;

let code = "";
async function fetchCode(url) {
  let fetchResponse = await fetch(url);
  code = await fetchResponse.text();
}

async function runSWC() {
  const startTime = Date.now();
  let result;
  for (let i = 0; i < ITERATIONS; i++) {
    result = transformSync(code, {
      filename: "input.js",
      sourceMaps: true,
      isModule: true,
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
        // transform: {},
        target: "es5",
      },
      module: {
        type: "commonjs",
        strict: true,
        strictMode: true,
      },
    });
  }
  console.log(result.code.length);
  let duration = Date.now() - startTime;
  console.log(
    `SWC Took ${duration}ms in total, ${(duration / ITERATIONS).toFixed(
      2
    )}ms per iteration`
  );
}

async function runBabel() {
  const startTime = Date.now();
  let result;
  for (let i = 0; i < ITERATIONS; i++) {
    result = Babel.transform(code, {
      presets: [["env", {}]],
      plugins: ["transform-react-jsx"],
    });
  }
  console.log(result.code.length);
  let duration = Date.now() - startTime;
  console.log(
    `Babel Took ${duration}ms in total, ${(duration / ITERATIONS).toFixed(
      2
    )}ms per iteration`
  );
}

async function run() {
  await initSWC();

  await fetchCode("https://unpkg.com/react@17.0.2/umd/react.development.js");
  await runSWC();
  await runBabel();

  await fetchCode(
    "https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"
  );
  await runSWC();
  await runBabel();

  code = "export const App = () => <div>Test</div>;";
  await runSWC();
  await runBabel();

  document.body.innerHTML = "<div>Transpilation benchmark finished!</div>";
}

run().catch(console.error);
