import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import typingSound from '../assets/sounds/typing.mp3';
import SimulationVideo from '../Components/SimulationVideo';
import BackgroundMusic from '../Components/BackgroundMusic';

const TypewriterText = ({ text, onComplete, delay = 0, volume }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio(typingSound));
  const startTime = 3; // Başlangıç saniyesi
  const endTime = 10; // Bitiş saniyesi
  const duration = endTime - startTime; // Toplam süre

  useEffect(() => {
    // Ses seviyesini 0-1 arasında tut
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

  // Component unmount olduğunda ses nesnesini temizle
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return <span>{displayedText}</span>;
};

const PhishingSimulatorPage = () => {
  const { user } = useContext(AuthContext);
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

  useEffect(() => {
    if (isStarted) {
      videoMounted.current = true;
      setIsMusicPlaying(true);
    }
  }, [isStarted]);

  useEffect(() => {
    return () => {
      setIsMusicPlaying(false);
    };
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
        <BackgroundMusic isPlaying={isMusicPlaying} volume={musicVolume} />
        <div style={styles.overlay}></div>
        <div style={styles.content}>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.infoContainer}
          >
            <h1 style={styles.title}>Oltalama (Phishing) Simülasyonu</h1>
            
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
                Bu simülasyonda, günlük hayatta karşılaşabileceğiniz çeşitli oltalama senaryolarıyla karşılaşacaksınız:
              </p>
              
              <ul style={styles.list}>
                <li>📧 Şüpheli E-postalar</li>
                <li>🌐 Sahte Web Siteleri</li>
                <li>💳 Banka Bildirimleri</li>
                <li>📱 SMS Dolandırıcılığı</li>
                <li>🔑 Hesap Güvenliği</li>
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

  const handleChoice = (option) => {
    setShowOptions(false);
    setCurrentFeedback(option.feedback);
    setShowFeedback(true);

    // 3 saniye feedback göster
    setTimeout(() => {
      const newScore = score + option.scoreImpact;
      setScore(newScore);
      setShowFeedback(false);
      
      // Reset all states
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
      type: 'wifi',
      title: 'Kafede WiFi Seçimi',
      description: 'Yoğun bir iş gününün ardından favori kafenize geldiniz. Laptopunuzla biraz çalışmak istiyorsunuz.',
      content: `Cafe'nin WiFi ağları listesinde birkaç seçenek var:
      - CafeWifi_Free
      - CafeWifi_Secure
      - FreePublicWifi`,
      options: [
        { 
          text: 'CafeWifi_Free - Açık Ağ', 
          nextScenario: 'unsecure_wifi',
          scoreImpact: -30,
          feedback: 'Açık ağa bağlandınız. Verileriniz şu anda risk altında olabilir. Birisi ağ trafiğinizi izliyor olabilir...'
        },
        { 
          text: 'Kafeye ait WiFi şifresini sor', 
          nextScenario: 'secure_wifi',
          scoreImpact: 20,
          feedback: 'Güvenli bir seçim yaptınız. Garson size şifreyi verdi ve güvenli ağa bağlandınız.'
        }
      ]
    },
    {
      id: 'unsecure_wifi',
      type: 'email',
      title: 'Şüpheli Mail',
      description: 'Tam bu sırada gelen kutunuza yeni bir mail düştü.',
      content: `Konu: Acil - Banka Hesabınız
      
      Sayın müşterimiz,
      Açık ağa bağlandığınızı tespit ettik. Güvenliğiniz için hesabınızı doğrulamanız gerekiyor.
      Hemen aşağıdaki bağlantıya tıklayın.`,
      options: [
        { 
          text: 'Bağlantıya tıkla ve giriş yap', 
          nextScenario: 'compromised_account',
          scoreImpact: -30,
          feedback: 'Maalesef bu bir tuzaktı. Bağlandığınız açık ağdaki kötü niyetli biri sizin banka bilgilerinizi ele geçirdi.'
        },
        { 
          text: 'Maili sil ve bankayı ara', 
          nextScenario: 'safe_banking',
          scoreImpact: 20,
          feedback: 'Çok akıllıca! Banka bu tür maillerle asla bilgi istemez. Bankanızı aradınız ve hesabınızın güvende olduğunu öğrendiniz.'
        }
      ]
    },
    {
      id: 'compromised_account',
      type: 'notification',
      title: 'Hesap Bildirimi',
      description: 'Az önce telefonunuza bir SMS geldi.',
      content: `Bankadan gelen SMS:
      "Hesabınızdan 5000TL tutarında bir EFT işlemi gerçekleştirildi.
      İşlemi siz yapmadıysanız hemen 0850XXX numaralı müşteri hizmetlerimizi arayın."`,
      options: [
        { 
          text: 'SMS\'teki numarayı ara', 
          nextScenario: 'phone_scam',
          scoreImpact: -30,
          feedback: 'Bu da ikinci bir tuzaktı. Dolandırıcılar şimdi de telefon üzerinden bilgilerinizi almaya çalıştı.'
        },
        { 
          text: 'Bankanın resmi numarasını internet sitesinden bul ve ara', 
          nextScenario: 'safe_call',
          scoreImpact: 20,
          feedback: 'Harika bir karar! Bankanın gerçek numarasını aradınız. Hesabınızda herhangi bir şüpheli işlem olmadığını öğrendiniz.'
        }
      ]
    },
    {
      id: 'phone_scam',
      type: 'recovery',
      title: 'Telefon Görüşmesi',
      description: 'Şüpheli numarayı aradınız ve karşınızdaki kişi banka yetkilisi olduğunu iddia ediyor.',
      content: `"Güvenliğiniz için hesap bilgilerinizi doğrulamamız gerekiyor. 
      Lütfen kart numaranızı ve telefonunuza gelecek onay kodunu bizimle paylaşın."`,
      options: [
        { 
          text: 'Bilgileri paylaş', 
          nextScenario: 'final_mistake',
          scoreImpact: -30,
          feedback: 'Dolandırıcılara bilgilerinizi verdiniz. Hesabınızdaki tüm para çekildi!'
        },
        { 
          text: 'Görüşmeyi sonlandır ve gerçek banka şubesine git', 
          nextScenario: 'safe_ending',
          scoreImpact: 20,
          feedback: 'Akıllıca! Şüpheli durumu fark ettiniz ve doğru hamleyi yaptınız.'
        }
      ]
    },
    {
      id: 'safe_call',
      type: 'payment',
      title: 'Güvenli Görüşme',
      description: 'Bankanın gerçek müşteri hizmetleriyle görüştünüz.',
      content: `Banka yetkilisi:
      "Hesabınızda herhangi bir şüpheli işlem görünmüyor. 
      Bu tür dolandırıcılık girişimlerine karşı dikkatli olduğunuz için teşekkür ederiz."`,
      options: [
        { 
          text: 'Teşekkür edip görüşmeyi sonlandır', 
          nextScenario: 'safe_ending',
          scoreImpact: 20,
          feedback: 'Güvenli bir şekilde durumu kontrol ettiniz. Artık kafeden ayrılma vakti.'
        },
        { 
          text: 'Ek güvenlik önlemleri hakkında bilgi al', 
          nextScenario: 'safe_ending',
          scoreImpact: 30,
          feedback: 'Harika! Güvenlik konusunda ekstra bilgi alarak kendinizi daha iyi korudunuz.'
        }
      ]
    },
    {
      id: 'safe_ending',
      type: 'payment',
      title: 'Kafe Ödemesi',
      description: 'Tüm bu olayların ardından artık kafeden ayrılma vakti geldi.',
      content: `Garson masanıza geldi:
      "Ödemeyi nasıl yapmak istersiniz? 
      Masada QR kod var ya da kasaya gelebilirsiniz."`,
      options: [
        { 
          text: 'Masadaki QR kodu kullan', 
          nextScenario: 'final_scene',
          scoreImpact: -30,
          feedback: 'Yaşadığınız onca şeyden sonra hala risk almayı seçtiniz. QR kod değiştirilmiş olabilirdi!'
        },
        { 
          text: 'Kasaya gidip nakit öde', 
          nextScenario: 'final_scene',
          scoreImpact: 20,
          feedback: 'Harika! Yaşadığınız olaylardan ders çıkardınız ve güvenli ödeme yöntemini seçtiniz.'
        }
      ]
    }
  ];

  const resetGame = () => {
    setCurrentScene(0);
    setScore(100);
    setGameOver(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <BackgroundMusic isPlaying={isMusicPlaying} volume={musicVolume} />
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        {!gameOver ? (
          <motion.div 
            key={currentScene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.gameContainer}
          >
            {videoMounted.current && <SimulationVideo />}
            
            <div style={styles.musicControl}>
              <button 
                onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                style={styles.musicButton}
              >
                {isMusicPlaying ? '🔊' : '🔇'}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={musicVolume}
                onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                style={styles.volumeSlider}
              />
            </div>

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
              {score >= 90 ? "Harika! Siber güvenlik konusunda çok bilinçlisiniz!" :
               score >= 70 ? "İyi! Ancak daha dikkatli olabilirsiniz." :
               "Biraz daha dikkatli olmalısınız. Siber güvenlik çok önemli!"}
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
  gameContainer: {
    background: 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  scenarioTitle: {
    marginBottom: '30px',
    '& h3': {
      color: '#ffffff',
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    '& p': {
      color: '#ffffff',
      fontSize: '18px',
      lineHeight: '1.6',
      opacity: 0.9,
    }
  },
  contentBox: {
    background: 'rgba(0,0,0,0.3)',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
  },
  contentText: {
    color: '#ffffff',
    whiteSpace: 'pre-wrap',
    fontSize: '18px',
    lineHeight: '1.6',
    letterSpacing: '0.5px',
    opacity: 0.9,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '30px',
  },
  optionButton: {
    padding: '20px',
    fontSize: '16px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    border: 'none',
    fontWeight: '500',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(33,150,243,0.3)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  },
  endScreen: {
    background: 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 0 50px rgba(0,0,0,0.5)',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  score: {
    color: '#2196f3',
    fontSize: '28px',
    marginBottom: '30px',
    fontWeight: '600',
    textShadow: '0 0 10px rgba(33,150,243,0.3)',
  },
  feedback: {
    margin: '20px 0',
    padding: '25px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '18px',
    lineHeight: '1.6',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  button: {
    padding: '15px 40px',
    fontSize: '18px',
    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(33,150,243,0.3)',
    },
    '&:active': {
      transform: 'translateY(1px)',
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
    animation: 'fadeIn 0.5s ease-in-out'
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
  },
  musicControl: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '10px',
    borderRadius: '8px',
  },
  musicButton: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  volumeSlider: {
    width: '100px',
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
};

export default PhishingSimulatorPage; 