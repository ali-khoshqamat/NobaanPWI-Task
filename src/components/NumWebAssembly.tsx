import { useEffect } from "react";

function printMessage(message: string) {
  const messageElem = document.getElementById("message");
  if (messageElem) {
    messageElem.innerHTML = message;
  }
}

const importObject = {
  env: {
    memory: new WebAssembly.Memory({ initial: 2, maximum: 10 }),
    printMessage,
  },
};

const NumWebAssembly: React.FC = () => {
  useEffect(() => {
    // WebAssembly.instantiateStreaming(fetch('wasm/hello.wasm'), importObject)
    //     .then(module => { module.instance.exports.hello() });

    fetch("wasm/hello.wasm")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const wasmModule = new WebAssembly.Module(buffer);
        const wasmInstance = new WebAssembly.Instance(wasmModule, importObject);
        const hello = wasmInstance.exports.hello;
        if (typeof hello === "function") {
          hello();
        } else {
          console.error("hello is not a function");
        }
      });
  }, []);

  return (
    <div
      id="message"
      className="py-1 px-3.5 bg-red-700 text-stone-50 border border-solid border-red-700 rounded-md font-bold"
    ></div>
  );
};

export default NumWebAssembly;
