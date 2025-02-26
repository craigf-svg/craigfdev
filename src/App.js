import { Canvas } from "@react-three/fiber";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UniverseGroup from "./UniverseGroup";
import { FlyControls } from '@react-three/drei';
import PS2Audio from "./PS2Audio";
import MyDrawer from './MyDrawer'
import StartMenu from "./StartMenu";

export default function App() {
  const [startMenu, setStartMenu] = useState(true);
  const [flyControls, setFlyControls] = useState(false);
  const [camPosition, setCamPosition] = useState('one');
  const cameraRef = useRef();

  const cycleCamPosition = useCallback(() => {
    if (camPosition === 'one') {
      setCamPosition('two');
    } else if (camPosition === 'two') {
      setCamPosition('one');
    }
  }, [camPosition]);

  useEffect(() => {
    document.title = 'Craig F'
  }, [])

  return (
    <>
      <PS2Audio startMenu={startMenu} />
      <MyDrawer cycleCamPosition={(x) => cycleCamPosition()} enableFlyControls={(x) => setFlyControls(true)} />

      <Canvas
        style={{ background: '#000000' }}
        camera={{
          fov: 75, near: 0.1, far: 1000,
          position: [0, 2, 15]
        }}
      >
        <FlyControls movementSpeed={flyControls ? 10 : 0} dragToLook={true} rollSpeed={flyControls ? 0.5 : 0} />
        {startMenu &&
          <StartMenu start={() => { setStartMenu(false); }} />}
        {!startMenu &&
          <UniverseGroup camPosition={camPosition} cameraRef={cameraRef} />}
      </Canvas>
    </>
  );
}