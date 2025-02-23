import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import typingSound from '../../assets/sounds/typing.mp3';

const TypewriterText = ({ text, onComplete, delay = 0, volume }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(new Audio(typingSound));

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

const scenarios = [
  {
    type: 'bank',
    title: 'Banka Güvenlik Araması',
    description: 'Bankanızdan aradığını söyleyen biri, hesabınızda şüpheli işlemler tespit edildiğini belirtiyor.',
    content: `Arayanın söyledikleri:
    - Bankanızın güvenlik biriminden arıyorum
    - Hesabınızda şüpheli işlemler tespit ettik
    - Hesabınızı korumak için hemen işlem yapmamız gerek
    - Kart bilgilerinizi ve şifrenizi teyit etmeliyiz
    - İşlemi hemen yapmazsak hesabınız bloke olacak`,
    options: [
      { 
        text: 'Kart bilgilerinizi ve şifrenizi paylaşın', 
        scoreImpact: -30,
        feedback: 'Yanlış! Bankalar asla telefonla kart bilgisi ve şifre istemez. Bu bir vishing (sesli dolandırıcılık) saldırısı.'
      },
      { 
        text: 'Aramayı sonlandırıp bankanızın resmi numarasını arayın', 
        scoreImpact: 20,
        feedback: 'Doğru karar! Banka işlemlerini her zaman resmi kanallardan yapmalısınız.'
      }
    ]
  },
  {
    type: 'tech_support',
    title: 'Microsoft Teknik Destek Araması',
    description: 'Microsoft\'tan aradığını söyleyen biri, bilgisayarınızda virüs tespit edildiğini söylüyor.',
    content: `Arayanın söyledikleri:
    - Microsoft güvenlik ekibinden arıyorum
    - Bilgisayarınızda tehlikeli bir virüs tespit ettik
    - Uzaktan erişimle sorunu çözebiliriz
    - Hemen müdahale etmezsek verileriniz risk altında
    - Size özel indirimli güvenlik paketi sunabiliriz`,
    options: [
      { 
        text: 'Uzaktan erişime izin verin ve kredi kartı bilgilerinizi paylaşın', 
        scoreImpact: -30,
        feedback: 'Yanlış! Microsoft sizi asla aramaz. Bu yaygın bir vishing dolandırıcılığı yöntemidir.'
      },
      { 
        text: 'Aramayı reddedip görüşmeyi sonlandırın', 
        scoreImpact: 20,
        feedback: 'Mükemmel! Beklenmedik teknik destek aramaları genellikle dolandırıcılıktır.'
      }
    ]
  },
  {
    type: 'prize',
    title: 'Büyük Ödül Kazandınız!',
    description: 'Bir yarışmadan büyük ödül kazandığınızı söyleyen biri arıyor.',
    content: `Arayanın söyledikleri:
    - Tebrikler! 100.000 TL değerinde ödül kazandınız
    - Katılmadığınız bir çekilişte şanslı kişi sizsiniz
    - Ödülü almak için hemen işlem yapmalıyız
    - Sadece küçük bir transfer ücreti gerekiyor
    - Bu fırsatı kaçırmayın, süre kısıtlı`,
    options: [
      { 
        text: 'Transfer ücretini ödeyin ve ödülü almayı kabul edin', 
        scoreImpact: -30,
        feedback: 'Yanlış! Katılmadığınız bir çekilişten ödül kazanamazsınız. Bu klasik bir dolandırıcılık yöntemi.'
      },
      { 
        text: 'Aramayı reddedip görüşmeyi sonlandırın', 
        scoreImpact: 20,
        feedback: 'Harika! Beklenmedik ödül aramaları genellikle dolandırıcılık amaçlıdır.'
      }
    ]
  }
];

const VishingSimulatorPage = () => {
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
  const [contentComplete, setContentComplete] = useState(false);

  const handleTitleComplete = () => {
    setShowDescription(true);
  };

  const handleDescriptionComplete = () => {
    setShowContent(true);
  };

  const handleContentComplete = () => {
    setContentComplete(true);
    setShowOptions(true);
  };

  const handleChoice = (option) => {
    setShowOptions(false);
    setCurrentFeedback(option.feedback);
    setShowFeedback(true);

    setTimeout(() => {
      const newScore = score + option.scoreImpact;
      setScore(newScore);
      setShowFeedback(false);
      
      if (currentScene === scenarios.length - 1 || newScore <= 0) {
        setGameOver(true);
      } else {
        setCurrentScene(currentScene + 1);
        setShowTitle(true);
        setShowDescription(false);
        setShowContent(false);
        setContentComplete(false);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentScene(0);
    setScore(100);
    setGameOver(false);
    setShowTitle(true);
    setShowDescription(false);
    setShowContent(false);
    setShowOptions(false);
    setShowFeedback(false);
    setContentComplete(false);
  };

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
            <div style={styles.volumeControl}>
              <label style={styles.volumeLabel}>
                Ses Seviyesi
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={styles.volumeSlider}
              />
            </div>

            <h1 style={styles.title}>Sesli Dolandırıcılık (Vishing) Simülasyonu</h1>
            
            <div style={styles.infoSection}>
              <h2 style={styles.subtitle}>Simülasyon Hakkında</h2>
              <p style={styles.text}>
                Bu simülasyonda, telefonla yapılan dolandırıcılık girişimleriyle karşılaşacaksınız:
              </p>
              
              <ul style={styles.list}>
                <li>🏦 Sahte Banka Aramaları</li>
                <li>💻 Sahte Teknik Destek</li>
                <li>🎁 Sahte Ödül Bildirimleri</li>
                <li>👨‍💼 Sahte Yetkili Aramaları</li>
                <li>🔐 Sahte Güvenlik Uyarıları</li>
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

  return (
    <motion.div style={styles.container}>
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
          <motion.div style={styles.gameContainer}>
            <motion.div 
              key={currentScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.scenarioContent}
            >
              {showTitle && (
                <motion.h3 style={styles.scenarioTitle}>
                  <TypewriterText 
                    text={scenarios[currentScene].title}
                    onComplete={handleTitleComplete}
                    delay={50}
                    volume={volume}
                  />
                </motion.h3>
              )}
              
              {showDescription && (
                <motion.p style={styles.scenarioDescription}>
                  <TypewriterText 
                    text={scenarios[currentScene].description}
                    onComplete={handleDescriptionComplete}
                    delay={50}
                    volume={volume}
                  />
                </motion.p>
              )}

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

              {showOptions && contentComplete && !showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={styles.optionsContainer}
                >
                  {scenarios[currentScene].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleChoice(option)}
                      style={styles.optionButton}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.2 }
                      }}
                    >
                      {option.text}
                    </motion.button>
                  ))}
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
            </motion.div>
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
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    volumeLabel: {
      color: '#fff',
      fontSize: '14px',
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
        background: '#fff',
        borderRadius: '50%',
        cursor: 'pointer',
      },
      '&::-moz-range-thumb': {
        width: '12px',
        height: '12px',
        background: '#fff',
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
  };

export default VishingSimulatorPage;