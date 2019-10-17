import {
  initCanvas,
  pixel, rect, circle, ellipse, line, tri,
  stroke, noStroke, fill, noFill, render
} from './node-paint.js';

import * as fs from 'fs';

async function main() {
  try {
    const memory = new WebAssembly.Memory({ initial: 1 });
    const table = new WebAssembly.Table({ initial: 0, element: 'anyfunc'});
    const importObj = {
      "env": {
        memory, table,
        abort() {
          console.error('Oh no!');
        }
      },
      Math,
      "index": {
        initCanvas,
        pixel, rect, circle, ellipse, line, tri,
        fill, stroke, noFill, noStroke
      }
    };
    const module = await WebAssembly.instantiate(fs.readFileSync('../build/optimized.wasm'), importObj);
    const { exports } = module.instance
    exports.setup();
    for(let i = 0; i < 1000; i++) {
      exports.draw(i);
    }
    console.log(render());
  } catch(ex) {
    console.error(ex.message);
  }
  
}

main();
