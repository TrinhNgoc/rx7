import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./styles.css";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { Rings } from "./Rings";
import { Sakuras } from "./Sakuras";
import { FloatingGrid } from "./FloatingGrid";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Sakuras />

      <spotLight
        color={[6, 3, 0.2]}
        intensity={0.2}
        angle={0.6}
        penumbra={0.8}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <FloatingGrid />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.8} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.55} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.46} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          // offset={[0.0002, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
