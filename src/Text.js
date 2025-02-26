
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import EmotionEngine from './font/Emotion_Engine_Regular.json';

export default function Text() {
    const playstationFont = new FontLoader().parse(EmotionEngine);

    // Configure font geometry
    const textOptions = {
        font: playstationFont,
        size: 3,
        height: 1,
    };

    return (
        <>
            <mesh position={[-10.2, 10, -10]}>
                <textGeometry attach='geometry' args={['Craig Feola', textOptions]} />
                <meshStandardMaterial attach='material' color="black" emissive="#0A0" emissiveIntensity={1.5} />
            </mesh>
            <mesh position={[-15.2, 5, -10]}>
                <textGeometry attach='geometry' args={['Software Engineer', textOptions]} />
                <meshStandardMaterial attach='material' color="green" emissive="#00AA00" emissiveIntensity={1.5} />
            </mesh>
        </>
    );
}