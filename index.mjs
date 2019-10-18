'use strict';

import {
  initCanvas,
  pixel, rect, circle, ellipse, line, tri,
  stroke, noStroke, fill, noFill
} from './paint.mjs';

async function main() {
  const numPages = 1;
  const memory = new WebAssembly.Memory({initial: numPages });
  const table = new WebAssembly.Table({ initial: 1, element: 'anyfunc' });
  const importObj = {
    "env": {
      memory, table,
      abort(_msg, _file, line, column) {
        console.error("abort called at index.ts:" + line + ":" + column);
      },
    },
    "index": {
      initCanvas,
      pixel, rect, circle, ellipse, line, tri,
      fill, stroke, noFill, noStroke
    },
    Math
  };
  const wasm = await WebAssembly.instantiateStreaming(fetch('build/optimized.wasm'), importObj);
  const { exports } = wasm.instance;
  console.log(exports)
  exports.setup();
  const animLoop = (t = 0) => {
    exports.draw(t);
    setTimeout(() => {
      requestAnimationFrame(animLoop);
    }, 60)
  };
  animLoop();
}

main();