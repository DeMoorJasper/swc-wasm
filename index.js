const fetch = require("node-fetch");
const swc = require("@swc/core");

const ITERATIONS = 10;

let code = "";
async function fetchCode(url) {
  let fetchResponse = await fetch(url);
  code = await fetchResponse.text();
}

async function runSWC() {
  const startTime = Date.now();
  let result;
  for (let i = 0; i < ITERATIONS; i++) {
    result = swc.transformSync(code, {
      filename: "input.js",
      sourceMaps: true,
      isModule: true,
      jsc: {
        parser: {
          syntax: "ecmascript",
          jsx: true,
        },
        target: "es5",
      },
      module: {
        type: "commonjs",
        strict: true,
        strictMode: true,
      },
    });
  }
  console.log("code size:", result.code.length);
  let duration = Date.now() - startTime;
  console.log(
    `SWC Took ${duration}ms in total, ${(duration / ITERATIONS).toFixed(
      2
    )}ms per iteration`
  );
}

async function run() {
  code = "export const App = () => <div>Test</div>;";
  await runSWC();

  await fetchCode("https://unpkg.com/react@17.0.2/umd/react.development.js");
  await runSWC();

  await fetchCode(
    "https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"
  );
  await runSWC();

  process.exit(0);
}

run().catch(console.error);
