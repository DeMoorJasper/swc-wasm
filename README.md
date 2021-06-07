# SWC WASM Tests

This is a repo that I'm using to do some experiments with SWC in the browser and comparing it to Babel.

## Results

These are the results of running 3 tests: small, medium and large code snippets. Ran these tests 10 times each to allow javascript to do some optimizations. Changing the optimizations in `cargo.toml` have very little effect on performance, only real difference is speed.

| Description                   | SWC (wasm) | SWC (napi) | @babel/standalone |
| ----------------------------- | :--------: | ---------: | ----------------: |
| Small file                    |   0.60ms   |     0.90ms |           46.10ms |
| react#development (medium)    |  141.90ms  |    19.50ms |          204.00ms |
| react-dom#development (large) | 1179.70ms  |   242.70ms |         1243.70ms |
