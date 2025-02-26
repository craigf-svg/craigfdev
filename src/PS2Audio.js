import React, { useEffect, useRef } from 'react';

const PS2Audio = (props) => {
  const { startMenu } = props;
  const ps2StartAudioRef = useRef();
  const ambianceRef = useRef();

  useEffect(() => {
    if (startMenu === false) {
      ps2StartAudioRef.current.volume = 0.4;
      ps2StartAudioRef.current.play();
      // Switch to ambiance
      setTimeout(() => {
        ps2StartAudioRef.current.pause();
      }, 10000);
      setTimeout(() => {
        ambianceRef.current.currentTime = 13;
        ambianceRef.current.play();
      }, 9900);
    }

    ambianceRef.current.addEventListener('ended', () => {
      ambianceRef.current.currentTime = 13;
      ambianceRef.current.play();
    });
  }, [startMenu]);

  return (
    <div>
      <audio autoPlay={false} ref={ps2StartAudioRef}>
        <source src="PS2Startup.mp4" type="video/mp4" />
      </audio>
      <audio autoPlay={false} ref={ambianceRef}>
        <source src="ambiance.mp4" type="video/mp4" />
      </audio>
    </div>
  );
};

export default PS2Audio;