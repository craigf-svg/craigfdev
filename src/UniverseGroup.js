import React, { useState, useEffect } from 'react';
import { useFrame, extend } from "@react-three/fiber";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing'
import { PerspectiveCamera } from '@react-three/drei';

import Text from './Text.js';
import Space from "./Space.js";

extend({ TextGeometry })
const ROTATION_SPEED = .05;

export default function UniverseGroup(props) {
  const { camPosition, cameraRef } = props;

  const [zooming, setZooming] = useState(true);
  const spaceMesh = React.useRef();
  const textMesh = React.useRef();

  useFrame(({ clock }) => {
    if (spaceMesh.current) {
      spaceMesh.current.rotation.y = clock.getElapsedTime() * ROTATION_SPEED;
      spaceMesh.current.position.set(0, 0, 0);
    }
  })

  useEffect(() => {
    if (cameraRef.current && !zooming) {
      if (camPosition === 'one') {
        cameraRef.current.position.set(10.000000000000131, 5.9999999999996465, 37.960000000003895);
        cameraRef.current.rotation.set(-0.15676420585887205, 0.25455993400105126, 0.039781879577052454);
      } else {
        cameraRef.current.position.set(16.86008104106376, -3.2902824350818705, -8.921678538658027);
        cameraRef.current.rotation.set(3.10122463928674, -0.2030656821451082, 3.13344727150912);
      }
    }
  }, [camPosition, cameraRef, zooming]);

  //TODO: Update to be dependent on clock for speed instead of FPS
  useFrame(() => {
    if (zooming && cameraRef.current) {
      // Gradually decrease the z-position of the camera to zoom in
      if (cameraRef.current.position.z > 112) {
        cameraRef.current.position.z -= 0.04; // Slower zoom-in speed
      } else if (cameraRef.current.position.z > 38) {
        cameraRef.current.position.z -= 1; // Quicker zoom-in speed
      } else {
        setZooming(false);
      }
    }
  });

  return (
    <group>
      <group ref={spaceMesh}>
        <Space />
      </group>
      <group ref={textMesh}>
        <Text />
      </group>
      <PerspectiveCamera makeDefault position={[10, 6, 156]} fov={75} ref={cameraRef}>
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} intensity={2} angle={Math.PI / 4} />
      </PerspectiveCamera>

      {/* <gridHelper />
    <axesHelper args={[5]} /> */}

      <EffectComposer>
        <Bloom
          intensity={0.8}
          width={300}
          height={300}
          resolutionX={300}
          resolutionY={300}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.5}
          kernelSize={KernelSize.LARGE} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </group>
  );
}