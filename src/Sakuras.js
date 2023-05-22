import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Shape, ShapeGeometry, MeshBasicMaterial, Vector3 } from "three";

function Sakura({ color }) {
  const x = 0,
    y = 0;

  const sakuraShape = new Shape();
  sakuraShape.moveTo(x + 5, y + 5);
  sakuraShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  sakuraShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  sakuraShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x, y + 18);
  sakuraShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  sakuraShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x, y);
  sakuraShape.bezierCurveTo(x, y, x, y + 5, x + 5, y + 5);

  const geometry = new ShapeGeometry(sakuraShape);
  const material = new MeshBasicMaterial({
    color: color
  });

  const sakura = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 40) * 0.01 + 0.002);

  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    return v;
  }

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 3;
      let newZ = position.z - time.current;

      if (newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      sakura.current.position.set(position.x, position.y, newZ);
      sakura.current.rotation.x += delta * xRotSpeed * 4;
      sakura.current.rotation.y += delta * yRotSpeed * 2;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh
      ref={sakura}
      rotation-x={Math.PI * 0.5}
      scale={scale}
      geometry={geometry}
      material={material}
      castShadow
    />
  );
}

export function Sakuras() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 300; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Sakura key={i} color="#ffb7c5" />
      ))}
    </>
  );
}
