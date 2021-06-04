import wasmURL from "url:../../pkg/swc.wasm";

let imports = {
  transformSync,
};

async function run() {
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch(wasmURL)
  ).then((obj) => obj.instance.exports);
}
