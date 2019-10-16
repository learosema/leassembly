const fs = require('fs');

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
        pixel
      }
    };
    const module = await WebAssembly.instantiate(fs.readFileSync('build/optimized.wasm'), importObj);
    const { exports } = module.instance
    console.log(exports.add(1, 1));
  } catch(ex) {
    console.error(ex.message);
  }
  
}

main();
