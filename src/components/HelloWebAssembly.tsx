import { useEffect } from "react";

const getInt = (heap: Uint8Array, offset: number): number => {
  return (
    heap[offset + 0] |
    (heap[offset + 1] << 8) |
    (heap[offset + 2] << 16) |
    (heap[offset + 3] << 24)
  );
};

const printMessage = (heap: Uint8Array, message: number): void => {
  const charArrayOffset = getInt(heap, message + 8);
  const charArrayLength = getInt(heap, charArrayOffset + 8);
  const arrayDataStart = charArrayOffset + 12;
  const arrayDataEnd = arrayDataStart + charArrayLength * 2;
  const string = new TextDecoder("utf-16").decode(
    heap.slice(arrayDataStart, arrayDataEnd)
  );

  const message2 = document.getElementById("message2");
  if (message2) {
    message2.innerHTML = string;
  }
};

const HelloWebAssembly: React.FC = () => {
  useEffect(() => {
    const memory = new WebAssembly.Memory({ initial: 2, maximum: 10 });
    let heap: Uint8Array;

    const importObject = {
      env: {
        memory,
        printMessage: (message: number) => printMessage(heap, message),
      },
    };

    // WebAssembly.instantiateStreaming(
    //   fetch("wasm/hello2.wasm"),
    //   importObject
    // ).then((module) => {
    //   heap = new Uint8Array((module.instance.exports.memory || memory).buffer);
    //   module.instance.exports.hello();
    // });

    fetch("wasm/hello2.wasm")
      .then((response) => response.arrayBuffer())
      .then((bytes) => WebAssembly.instantiate(bytes, importObject))
      .then((module) => {
        heap = new Uint8Array(
          (module.instance.exports.memory as WebAssembly.Memory).buffer
        );
        const hello = module.instance.exports.hello;
        if (typeof hello === "function") {
          hello();
        } else {
          console.error("hello is not a function");
        }
      });
  }, []);

  return (
    <div
      id="message2"
      className="py-1 px-3.5 bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
    ></div>
  );
};

export default HelloWebAssembly;
