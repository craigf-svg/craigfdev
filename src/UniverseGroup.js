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
// Values for intro sequence
const STARTPOINT = 156;
const MIDPOINT = 112;
const ENDPOINT = 38;
const QUICK_ZOOM_START_TIME = 9.1287;
const SLOW_ZOOM_SPEED = 4.82;
const QUICK_ZOOM_SPEED = 100.5;

export default function UniverseGroup(props) {
  const { camPosition, cameraRef } = props;

  const [zooming, setZooming] = useState(true);
  const [startTime, setStartTime] = useState();
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
        cameraRef.current.position.set(-3, 6, 37.96);
        cameraRef.current.rotation.set(0, -0.05, 0);
      } else {
        cameraRef.current.position.set(16.86008104106376, -3.2902824350818705, -8.921678538658027);
        cameraRef.current.rotation.set(3.10122463928674, -0.2030656821451082, 3.13344727150912);
      }
    }
  }, [camPosition, cameraRef, zooming]);

  const updateCameraPosition = (zCoord, speed, camera, elapsedTime, timeToOffset = 0) => {
    const distanceDelta = (elapsedTime - timeToOffset) * speed;
    camera.position.z = zCoord - distanceDelta;
  };

  //Zoom intro sequence
  useFrame(({ clock }) => {
    if (startTime == null) setStartTime(clock.getElapsedTime());

    if (!zooming || !cameraRef.current || startTime == null) return;
    const camera = cameraRef.current;
    const elapsedTime = clock.getElapsedTime() - startTime;
    // Gradually decrease the z-position of the camera to zoom in
    if (camera.position.z > MIDPOINT) {
      updateCameraPosition(STARTPOINT, SLOW_ZOOM_SPEED, camera, elapsedTime);
    } else if (camera.position.z > ENDPOINT) {
      updateCameraPosition(MIDPOINT, QUICK_ZOOM_SPEED, camera, elapsedTime, QUICK_ZOOM_START_TIME);
    } else {
      setZooming(false);
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
      <PerspectiveCamera makeDefault position={[-3, 6, 156]} rotation={[0, -0.05, 0]} fov={75} ref={cameraRef}>
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