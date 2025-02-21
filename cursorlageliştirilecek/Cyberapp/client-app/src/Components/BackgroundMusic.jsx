import React, { useRef, useEffect } from 'react';

const BackgroundMusic = ({ isPlaying, volume = 0.1 }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log("Audio autoplay failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  return (
    <audio
      ref={audioRef}
      src="/src/assets/sounds/twdilk.mp3"
      loop
      preload="auto"
    />
  );
};

export default React.memo(BackgroundMusic);
