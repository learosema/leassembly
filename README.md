# Exploring WebAssembly

This repository contains my learnings about WebAssembly and AssemblyScript

 * [Slides to my talk](https://terabaud.github.io/leassembly/talk/)
 * [Demo](https://terabaud.github.io/leassembly/)

# Running it locally

 * `npm install`
 * Type `npm run asbuild` to compile AssemblyScript to WASM.
 * Type `npm start` to run a static web server and open http://localhost:1337/

There is also a demo of calling the WebAssembly module from node.js. `npm run node-demo` calls the WASM draw() function 1000 times and generates an SVG file.

# What is not covered here

This project does not cover the use of the AssemblyScript loader. As a cheat, the API just uses numeric types, so no demangling of pointers is necessary.

# More AssemblyScript examples

* https://github.com/AssemblyScript/assemblyscript/blob/master/examples/game-of-life/index.html
