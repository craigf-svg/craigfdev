import React from 'react';
import { extend } from "@react-three/fiber";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing'
import { PerspectiveCamera } from '@react-three/drei';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import EmotionEngine from './font/Emotion_Engine_Regular.json';

extend({ TextGeometry })

export default function StartMenu(props) {
    const { start } = props;
    const playstationFont = new FontLoader().parse(EmotionEngine);

    // configure font geometry
    const textOptions = {
        font: playstationFont,
        size: 3,
        height: 1,
    };
    return (
        <group>
            <mesh position={[-2.5, 0, 0]} onClick={() => start()}>
                <textGeometry attach='geometry' args={['Start', textOptions]} />
                <meshStandardMaterial attach='material' color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>
            <PerspectiveCamera makeDefault position={[0, 1, 19]} fov={75} >
                <ambientLight intensity={0.3} />
                <spotLight position={[10, 10, 10]} intensity={2} angle={Math.PI / 4} />
            </PerspectiveCamera>
            {/*
            <gridHelper />
            <axesHelper args={[5]} /> */}

            <EffectComposer>
                <Bloom
                    intensity={0.02}
                    width={300}
                    height={300}
                    resolutionX={300}
                    resolutionY={300} // The vertical resolution.
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.5}
                    kernelSize={KernelSize.MEDIUM}
                />
                <Vignette eskil={false} offset={0.1} darkness={1.2} />
            </EffectComposer>
        </group>
    );
}