import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import { useEffect, useRef } from "react";

const Animation = () => {
  useEffect(() => {
    function render() {
      requestAnimationFrame(render);
    }
    render();
  }, []);

  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </>
  );
};

export default Animation;

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
