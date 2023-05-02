import { useEffect, useRef, useState } from "react";
import InstallButton from "./components/InstallButton";
import VibrateCamera from "./components/VibrateCamera";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
// import type { MediaStream, MediaStreamConstraints } from "@types/webrtc";
// import { MediaStream, MediaStreamConstraints } from "webrtc";

function App() {
  const [isLandscape, setIsLandscape] = useState(false);
  // const [isLandscape, setIsLandscape] = useState(
  //   window.matchMedia("(orientation: landscape)").matches
  // );
  // console.log("isLandscapt: ", isLandscape);
  const data = Array.from({ length: 1000000 }, (_, index) => `Item ${index}`);
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div
      style={style}
      className="bg-stone-100 p-1 w-full border border-green-600 rounded-md"
    >
      {data[index]}
    </div>
  );

  useEffect(() => {
    const orientationChangeHandler = (event: DeviceOrientationEvent) => {
      console.log("event: ", event);
      // window.alert(`gamma: ${event.gamma}`);
      if (event.gamma !== null && event.beta !== null) {
        const gamma = event.gamma * (Math.PI / 180);
        const beta = event.beta * (Math.PI / 180);
        // const radians = 90 * (Math.PI / 180);
        const radians = 45 * (Math.PI / 180);
        console.log("gamma: ", gamma);
        // window.alert(`gamma: ${gamma}`);
        console.log("abs(gamma): ", Math.abs(gamma));
        // setIsLandscape(Math.abs(gamma) > 90);
        // setIsLandscape(Math.abs(gamma) > 1.5708 && Math.abs(beta) < 1.5708);
        setIsLandscape(Math.abs(gamma) > radians && Math.abs(beta) < radians);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", orientationChangeHandler);
    }
    return () => {
      window.removeEventListener("deviceorientation", orientationChangeHandler);
    };
  }, []);

  useEffect(() => {
    function render() {
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return (
    <>
      <div
        className={`w-full min-h-screen flex flex-col items-center text-[#0d1d2c] pt-8 font-body ${
          isLandscape ? "bg-lime-100" : "bg-slate-100"
        }`}
      >
        <header className="font-bold text-xl m-4">
          <h2>Nobaan</h2>
        </header>
        {/* <section className="flex flex-col w-11/12 bg-white p-2.5 border border-solid border-gray-300 rounded-md mb-5"> */}

        <VibrateCamera />
        <InstallButton />
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box />
        </Canvas>
        <FixedSizeList
          height={500}
          width={500}
          itemCount={1000000}
          itemSize={35}
          className="!w-11/12 bg-red-100 border border-solid border-gray-300 rounded-md"
        >
          {Row}
        </FixedSizeList>
      </div>
    </>
  );
}

export default App;

function Box() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"#f472b6"} />
    </mesh>
  );
}
