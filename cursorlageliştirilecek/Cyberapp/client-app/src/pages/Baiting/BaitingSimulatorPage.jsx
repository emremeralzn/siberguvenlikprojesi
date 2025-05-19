import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import typingSound from '../../assets/sounds/typing.mp3';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

const TypewriterText = ({ text, onComplete, delay = 0, volume }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio(typingSound));
  const startTime = 3;
  const endTime = 10;
  const duration = endTime - startTime;

  useEffect(() => {
    audioRef.current.volume = Math.min(1, Math.max(0, volume));
    audioRef.current.currentTime = 2.5;
    
    if (currentIndex === text.length) {
      onComplete && onComplete();
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + text[currentIndex]);
      audioRef.current.currentTime = 2.5;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      
      setCurrentIndex(currentIndex + 1);
    }, delay === 0 ? 50 : delay);

    return () => {
      clearTimeout(timeout);
      audioRef.current.pause();
    };
  }, [currentIndex, text, onComplete, delay, volume]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return <span>{displayedText}</span>;
};

const BaitingSimulatorPage = () => {
  const { user, updateScore } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [score, setScore] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [volume, setVolume] = useState(0.2);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.1);
  const videoMounted = useRef(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isStarted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.container}
      >
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.infoContainer}
          >
            <h1 style={styles.title}>Tuzak (Baiting) Simülasyonu</h1>
            
            <div style={styles.infoSection}>
              <div style={styles.volumeControl}>
                <label style={styles.volumeLabel}>
                  Ses Seviyesi: {Math.round(volume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={styles.volumeSlider}
                />
              </div>

              <h2 style={styles.subtitle}>Simülasyon Hakkında</h2>
              <p style={styles.text}>
                Bu simülasyonda, günlük hayatta karşılaşabileceğiniz çeşitli tuzak senaryolarıyla karşılaşacaksınız:
              </p>
              
              <ul style={styles.list}>
                <li>💾 USB Bellekler</li>
                <li>💿 CD/DVD'ler</li>
                <li>📦 Şüpheli Paketler</li>
                <li>🎁 Bedava Teklifler</li>
                <li>💻 İkinci El Cihazlar</li>
              </ul>

              <h2 style={styles.subtitle}>Nasıl Oynanır?</h2>
              <p style={styles.text}>
                - Her senaryoda size bir durum sunulacak<br/>
                - İki seçenek arasında karar vermeniz gerekecek<br/>
                - Doğru kararlar puanınızı artıracak<br/>
                - Yanlış kararlar puanınızı düşürecek<br/>
                - Başlangıç puanınız: 100
              </p>

              <h2 style={styles.subtitle}>Hazır mısınız?</h2>
              <p style={styles.text}>
                Simülasyonu başlatmak için aşağıdaki butona tıklayın.
              </p>
            </div>

            <motion.button
              onClick={() => setIsStarted(true)}
              style={styles.startButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Simülasyonu Başlat
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const handleTitleComplete = () => {
    setShowDescription(true);
  };

  const handleDescriptionComplete = () => {
    setShowContent(true);
  };

  const handleContentComplete = () => {
    setShowOptions(true);
  };

  const handleChoice = async (option) => {
    setShowOptions(false);
    setCurrentFeedback(option.feedback);
    setShowFeedback(true);

    const scoreChange = option.scoreImpact;
    const newScore = Math.max(0, score + scoreChange);
    setScore(newScore);

    try {
      // Simülasyon logunu kaydet
      const simulationLog = {
        userId: user.id,
        simulationName: `Baiting Simulation - ${scenarios[currentScene].title}`,
        isSuccessful: scoreChange > 0,
        attemptedOn: new Date().toISOString()
      };

      await fetch(`http://localhost:5079/api/user/${user.id}/SimulationLogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simulationLog),
      });

      // Skoru güncelle
      await fetch(`http://localhost:5079/api/user/${user.id}/updateScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          newScore: newScore
        }),
      });

      updateScore(newScore);
    } catch (error) {
      console.error('İşlem hatası:', error);
    }

    setTimeout(() => {
      setShowFeedback(false);
      setShowTitle(true);
      setShowDescription(false);
      setShowContent(false);
      setShowOptions(false);

      if (currentScene === scenarios.length - 1 || newScore <= 0) {
        setGameOver(true);
      } else {
        setCurrentScene(currentScene + 1);
      }
    }, 3000);
  };

  const scenarios = [
    {
      type: 'usb',
      title: 'Şüpheli USB Bellek',
      description: 'Ofis masanızda üzerinde "Yıllık Performans Primleri 2024" yazan bir USB bellek buldunuz.',
      content: `USB belleğin detayları:
      - Yeni ve temiz görünüyor
      - Şirket logosu var gibi
      - Hiçbir çizik veya hasar yok
      - Masanıza kimin bıraktığı belli değil`,
      options: [
        { 
          text: 'USB belleği bilgisayarınıza takıp içeriğine bakın', 
          scoreImpact: -10,
          feedback: 'Tehlikeli bir seçim! USB bellekler zararlı yazılım bulaştırmak için sıkça kullanılan bir yöntemdir.'
        },
        { 
          text: 'USB belleği IT departmanına teslim edin', 
          scoreImpact: 20,
          feedback: 'Mükemmel! IT departmanı USB belleği güvenli bir ortamda inceleyebilir.'
        }
      ]
    },
    {
      type: 'cd',
      title: 'Ücretsiz Film CD\'si',
      description: 'Otoparkta arabanızın camında "Ücretsiz Film Koleksiyonu" yazılı bir CD buldunuz.',
      content: `CD'nin özellikleri:
      - Profesyonel görünümlü baskı
      - "En Yeni Filmler - 2024" yazısı
      - Şeffaf plastik kılıf içinde
      - Hiçbir çizik yok`,
      options: [
        { 
          text: 'CD\'yi bilgisayarınıza takın', 
          scoreImpact: -10,
          feedback: 'Yanlış seçim! Bu tür CD\'ler genellikle zararlı yazılım içerir.'
        },
        { 
          text: 'CD\'yi güvenli bir şekilde imha edin', 
          scoreImpact: 20,
          feedback: 'Harika! Kaynağı belirsiz medya araçlarını asla kullanmamalısınız.'
        }
      ]
    },
    {
      type: 'package',
      title: 'Beklenmeyen Paket',
      description: 'Eve geldiğinizde kapınızın önünde adınıza gönderilmiş bir paket buldunuz. Sipariş verdiğinizi hatırlamıyorsunuz.',
      content: `Paketin özellikleri:
      - İsim ve adres doğru yazılmış
      - Gönderici bilgisi belirsiz
      - "Hediyeniz!" notu var
      - Orta boy bir kutu`,
      options: [
        { 
          text: 'Paketi açıp içine bakın', 
          scoreImpact: -10,
          feedback: 'Riskli! Beklenmeyen paketler tehlikeli olabilir. Önce göndericiyi doğrulamalısınız.'
        },
        { 
          text: 'Güvenlik birimlerine haber verin', 
          scoreImpact: 20,
          feedback: 'Çok doğru! Şüpheli paketler için her zaman güvenlik birimlerine danışın.'
        }
      ]
    },
    {
      type: 'harddisk',
      title: 'İkinci El Hard Disk',
      description: 'Bir arkadaşınız size çok uygun fiyata bir harici hard disk satmak istiyor. "İçinde değerli yazılımlar var" diyor.',
      content: `Hard disk hakkında:
      - 2TB depolama
      - Çok uygun fiyat
      - "Lisanslı yazılımlar yüklü"
      - "Hemen kullanıma hazır"`,
      options: [
        { 
          text: 'Hard diski satın alıp kullanmaya başlayın', 
          scoreImpact: -10,
          feedback: 'Yanlış karar! İkinci el depolama cihazları zararlı yazılım içerebilir.'
        },
        { 
          text: 'Teklifi reddedip kendi hard diskinizi alın', 
          scoreImpact: 20,
          feedback: 'Akıllıca! Güvenilir kaynaklardan yeni ürün almak her zaman daha güvenlidir.'
        }
      ]
    },
    {
      type: 'prize',
      title: 'Bedava Tablet',
      description: 'Alışveriş merkezinde bir stant "Anketi doldurana tablet hediye!" diye duyuru yapıyor.',
      content: `Stanttaki detaylar:
      - 5 dakikalık anket
      - Kişisel bilgiler isteniyor
      - Hemen tablet teslimi
      - "Son 3 tablet kaldı!"`,
      options: [
        { 
          text: 'Anketi doldurup tableti almaya çalışın', 
          scoreImpact: -10,
          feedback: 'Bu bir tuzak! Bedava tablet vaadi ile kişisel bilgilerinizi toplamaya çalışıyorlar.'
        },
        { 
          text: 'Teklifi görmezden gelip yolunuza devam edin', 
          scoreImpact: 20,
          feedback: 'Mükemmel! "Bedava" teklifler genellikle bir tuzaktır.'
        }
      ]
    }
  ];

  const resetGame = () => {
    setCurrentScene(0);
    setScore(100);
    setGameOver(false);
    setShowTitle(true);
    setShowDescription(false);
    setShowContent(false);
    setShowOptions(false);
    setShowFeedback(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <div style={styles.volumeControl}>
          <label style={styles.volumeLabel}>
            Ses Seviyesi: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={styles.volumeSlider}
          />
        </div>

        {!gameOver ? (
          <motion.div 
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.gameContainer}
          >
            <div style={styles.scenarioTitle}>
              {showTitle && (
                <h3>
                  <TypewriterText 
                    text={scenarios[currentScene].title}
                    onComplete={handleTitleComplete}
                    delay={50}
                    volume={volume}
                  />
                </h3>
              )}
              
              {showDescription && (
                <p>
                  <TypewriterText 
                    text={scenarios[currentScene].description}
                    onComplete={handleDescriptionComplete}
                    delay={50}
                    volume={volume}
                  />
                </p>
              )}
            </div>

            {showContent && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.contentBox}
              >
                <p style={styles.contentText}>
                  <TypewriterText 
                    text={scenarios[currentScene].content}
                    onComplete={handleContentComplete}
                    delay={50}
                    volume={volume}
                  />
                </p>
              </motion.div>
            )}

            {showFeedback && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.feedbackBox}
              >
                <p>{currentFeedback}</p>
              </motion.div>
            )}

            {showOptions && !showFeedback && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.optionsContainer}
              >
                {scenarios[currentScene].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleChoice(option)}
                    style={styles.optionButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.endScreen}
          >
            <h2>Simülasyon Tamamlandı!</h2>
            <div style={styles.score}>Final Puanınız: {score}</div>
            <div style={styles.feedback}>
              {score >= 90 ? "Harika! Tuzaklara karşı çok dikkatlisiniz!" :
               score >= 70 ? "İyi! Ancak daha dikkatli olabilirsiniz." :
               "Tuzaklara karşı daha dikkatli olmalısınız!"}
            </div>
            <div style={styles.buttonContainer}>
              <motion.button
                onClick={resetGame}
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tekrar Dene
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    color: '#ffffff'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)',
    pointerEvents: 'none'
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    width: '100%',
    margin: '0 auto',
  },
  volumeControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    padding: '15px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  volumeLabel: {
    color: '#fff',
    fontSize: '14px',
  },
  volumeSlider: {
    width: '200px',
    height: '4px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    outline: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    '&::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: '12px',
      height: '12px',
      background: '#2196f3',
      borderRadius: '50%',
      cursor: 'pointer',
    },
    '&::-moz-range-thumb': {
      width: '12px',
      height: '12px',
      background: '#2196f3',
      borderRadius: '50%',
      cursor: 'pointer',
      border: 'none',
    },
  },
  gameContainer: {
    background: 'rgba(0,0,0,0.5)',
    padding: '30px',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  },
  scenarioTitle: {
    marginBottom: '30px',
    '& h3': {
      fontSize: '24px',
      marginBottom: '15px',
      color: '#2196f3'
    }
  },
  contentBox: {
    background: 'rgba(0,0,0,0.3)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  contentText: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6'
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '30px'
  },
  optionButton: {
    padding: '15px 20px',
    background: 'rgba(33,150,243,0.2)',
    border: '1px solid rgba(33,150,243,0.3)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(33,150,243,0.3)',
    }
  },
  feedbackBox: {
    background: 'rgba(0,0,0,0.8)',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    fontSize: '18px',
    textAlign: 'center',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
  },
  endScreen: {
    textAlign: 'center',
    padding: '40px',
    background: 'rgba(0,0,0,0.7)',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  score: {
    fontSize: '24px',
    margin: '20px 0',
    color: '#2196f3'
  },
  feedback: {
    fontSize: '18px',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  buttonContainer: {
    marginTop: '20px'
  },
  button: {
    padding: '15px 30px',
    background: '#2196f3',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: '#1976d2'
    }
  },
  infoContainer: {
    background: 'rgba(0,0,0,0.7)',
    padding: '40px',
    borderRadius: '15px',
    maxWidth: '800px',
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '32px',
    color: '#2196f3',
    marginBottom: '30px',
    textAlign: 'center',
    textShadow: '0 0 10px rgba(33,150,243,0.3)',
  },
  subtitle: {
    fontSize: '24px',
    color: '#ffffff',
    marginBottom: '15px',
    marginTop: '30px',
  },
  text: {
    fontSize: '16px',
    color: '#ffffff',
    lineHeight: '1.6',
    marginBottom: '20px',
    opacity: '0.9',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '20px 0',
    '& li': {
      margin: '10px 0',
      fontSize: '16px',
      color: '#ffffff',
      opacity: '0.9',
    }
  },
  startButton: {
    padding: '15px 40px',
    fontSize: '18px',
    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '30px',
    fontWeight: '600',
    display: 'block',
    margin: '30px auto 0',
    boxShadow: '0 4px 15px rgba(33,150,243,0.3)',
    transition: 'all 0.3s ease',
  },
  infoSection: {
    background: 'rgba(0,0,0,0.3)',
    padding: '30px',
    borderRadius: '10px',
    marginTop: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  }
};

export default BaitingSimulatorPage; 