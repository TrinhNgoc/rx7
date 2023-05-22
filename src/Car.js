import React, { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useGLTF } from "@react-three/drei";

// This work is based on "Mazda RX-7 FC" (https://sketchfab.com/3d-models/mazda-rx-7-fc-8ac0df459f514950ab83ac37109a06ab)
// by Lexyc16 (https://sketchfab.com/Lexyc16) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

export function Car() {
  const gltf = useGLTF("/models/car/scene.gltf");

  useEffect(() => {
    // gltf.scene.scale.set(0, 0, 0);
    gltf.scene.position.set(0, -1.155, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime();

    let group = gltf.scene.children[0].children[0].children[0];
    group.children[2].rotation.x = t * 2;
    group.children[5].rotation.x = t * 2;
    group.children[4].rotation.x = t * 2;
    group.children[6].rotation.x = t * 2;
  });

  return <primitive object={gltf.scene} />;
}
