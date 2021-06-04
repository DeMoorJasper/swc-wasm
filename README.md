# SWC WASM Tests

This repository has a bunch of tests for swc wasm, there's some interesting take-aways from this. The main one being that it's actually not a lot faster than Babel for larger files.

So I think a large part of the Babel transformer is spent processing the config. TODO: Profile it...

We could look into profiling and improving swc performance or contribute a bunch of performance improvements to Babel (although babel is very slow in approving and merging PRs...). In Node swc is insanely fast, like 1000x faster than Babel on the large files but it's unfortunately not true for wasm.

Run the build using `yarn build:release` and run the example/benchmark tests using `yarn start`
