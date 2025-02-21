import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  right: -340px;
  width: 300px;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(33, 150, 243, 0.3);
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.1);
  z-index: 1000;
  margin-top: 20px;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Global video zamanı
let globalVideoTime = 0;

function SimulationVideo() {
  const videoRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // İlk render'da veya sayfa yenilendiğinde global zamandan devam et
      if (isFirstRender.current) {
        video.currentTime = globalVideoTime;
        isFirstRender.current = false;
      }

      // Video zamanını sürekli güncelle
      const updateTime = () => {
        globalVideoTime = video.currentTime;
      };

      // Video bittiğinde devam et
      const handleEnded = () => {
        video.currentTime = 0;
        globalVideoTime = 0;
        video.play();
      };

      video.addEventListener('timeupdate', updateTime);
      video.addEventListener('ended', handleEnded);

      // Videoyu oynat
      video.play().catch(err => console.log('Video başlatma hatası:', err));

      // Cleanup
      return () => {
        globalVideoTime = video.currentTime; // Son pozisyonu kaydet
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <VideoContainer>
      <StyledVideo
        ref={videoRef}
        muted
        playsInline
        autoPlay
      >
        <source src="/src/assets/videos/phishing.mp4" type="video/mp4" />
      </StyledVideo>
    </VideoContainer>
  );
}

export default SimulationVideo;