import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import typingSound from '../../assets/sounds/typing.mp3';

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

const scenarios = [
  {
    type: 'manager',
    title: 'Acil Ödeme Talebi',
    description: 'Şirketinizin CEO\'sundan olduğunu iddia eden bir e-posta aldınız. Acil bir ödeme yapılması gerektiğini söylüyor.',
    content: `E-posta detayları:
    - CEO'nun adı doğru
    - Şirket logosu kullanılmış
    - "Gizli ve Acil" ibaresi var
    - Hemen ödeme talep ediyor
    - İletişim için farklı bir e-posta adresi veriliyor`,
    options: [
      { 
        text: 'Talep edilen ödemeyi hemen yapın', 
        scoreImpact: -30,
        feedback: 'Yanlış seçim! Bu tipik bir CEO dolandırıcılığı örneği. Her zaman resmi kanallardan doğrulama yapmalısınız.'
      },
      { 
        text: 'CEO\'nun ofisini arayarak talebi doğrulayın', 
        scoreImpact: 20,
        feedback: 'Mükemmel! Önemli finansal işlemleri her zaman alternatif kanallardan doğrulamalısınız.'
      }
    ]
  },
  {
    type: 'hr',
    title: 'İK Departmanından Gelen Talep',
    description: 'İK departmanından geldiğini söyleyen biri, yeni bir sistem için acilen bilgilerinizi güncellemeniz gerektiğini belirtiyor.',
    content: `Talebin detayları:
    - Şirket e-posta formatında gönderilmiş
    - Kişisel bilgi güncellemesi isteniyor
    - TC kimlik ve banka bilgileri talep ediliyor
    - "Bugün son gün" ibaresi var
    - Harici bir link verilmiş`,
    options: [
      { 
        text: 'Linke tıklayıp bilgileri güncelleyin', 
        scoreImpact: -30,
        feedback: 'Tehlikeli! Kişisel bilgilerinizi asla harici linkler üzerinden paylaşmayın.'
      },
      { 
        text: 'İK departmanını arayarak talebi doğrulayın', 
        scoreImpact: 20,
        feedback: 'Doğru karar! Şüpheli talepleri her zaman doğrudan iletişim kurarak teyit edin.'
      }
    ]
  },
  {
    type: 'support',
    title: 'BT Destek Talebi',
    description: 'Şirket BT departmanından geldiğini söyleyen biri, sisteminizde güvenlik açığı tespit edildiğini ve uzaktan erişim gerektiğini belirtiyor.',
    content: `Çağrı detayları:
    - Acil müdahale gerektiği söyleniyor
    - Uzaktan erişim programı kurmanız isteniyor
    - Şirket VPN bilgileriniz isteniyor
    - "Hemen halletmeliyiz" baskısı var
    - Resmi olmayan bir numara kullanılıyor`,
    options: [
      { 
        text: 'Uzaktan erişime izin verin', 
        scoreImpact: -30,
        feedback: 'Yanlış! BT departmanı asla telefonda uzaktan erişim talep etmez.'
      },
      { 
        text: 'BT departmanının resmi numarasını arayın', 
        scoreImpact: 20,
        feedback: 'Harika! Her zaman resmi kanallardan doğrulama yapın.'
      }
    ]
  },
  {
    type: 'delivery',
    title: 'Kargo Teslimatı',
    description: 'Bir kargo şirketinden arandığınızı ve size önemli bir paket olduğunu, teslim için ödeme yapmanız gerektiğini söylüyorlar.',
    content: `Aramanın detayları:
    - Tanınmış bir kargo firmasının adı kullanılıyor
    - Gümrük vergisi ödemeniz gerektiği söyleniyor
    - Kredi kartı bilgileriniz isteniyor
    - "Bugün ödemezseniz paket iade edilecek" deniliyor
    - Hemen ödeme yapmanız için baskı yapılıyor`,
    options: [
      { 
        text: 'Telefonda ödeme bilgilerini verin', 
        scoreImpact: -30,
        feedback: 'Yanlış seçim! Kargo şirketleri telefonda asla ödeme bilgisi istemez.'
      },
      { 
        text: 'Kargo şirketinin resmi kanallarından durumu kontrol edin', 
        scoreImpact: 20,
        feedback: 'Mükemmel! Her zaman resmi kanallardan işlem yapın.'
      }
    ]
  },
  {
    type: 'survey',
    title: 'Pazar Araştırması',
    description: 'Büyük bir şirketten aradıklarını söyleyerek, ankete katılmanız karşılığında ödül kazandığınızı belirtiyorlar.',
    content: `Anket detayları:
    - Ünlü bir markanın adı kullanılıyor
    - Değerli bir ödül vaat ediliyor
    - Kişisel ve finansal bilgiler isteniyor
    - "Sadece size özel" fırsat deniliyor
    - Hemen cevap vermeniz için baskı yapılıyor`,
    options: [
      { 
        text: 'Ödülü almak için bilgileri paylaşın', 
        scoreImpact: -30,
        feedback: 'Yanlış! Bu tipik bir pretexting dolandırıcılığı örneğidir.'
      },
      { 
        text: 'Telefonu kapatıp şirketi resmi numarasından arayın', 
        scoreImpact: 20,
        feedback: 'Doğru karar! Şüpheli aramaları her zaman doğrulayın.'
      }
    ]
  }
];

const PretextingSimulatorPage = () => {
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
            <h1 style={styles.title}>Bahane Uydurma (Pretexting) Simülasyonu</h1>
            
            <div style={styles.infoSection}>
              <h2 style={styles.subtitle}>Simülasyon Hakkında</h2>
              <p style={styles.text}>
                Bu simülasyonda, günlük hayatta karşılaşabileceğiniz çeşitli bahane uydurma senaryolarıyla karşılaşacaksınız:
              </p>
              
              <ul style={styles.list}>
                <li>👨‍💼 Sahte Yönetici Aramaları</li>
                <li>🏢 Sahte Şirket Temsilcileri</li>
                <li>🔧 Sahte Teknik Destek</li>
                <li>📊 Sahte Anketörler</li>
                <li>📱 Sahte Müşteri Hizmetleri</li>
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
              {score >= 90 ? "Harika! Bahane uydurma saldırılarına karşı çok dikkatlisiniz!" :
               score >= 70 ? "İyi! Ancak daha dikkatli olabilirsiniz." :
               "Bahane uydurma saldırılarına karşı daha dikkatli olmalısınız!"}
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
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'rgba(33, 150, 243, 0.1)',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(33, 150, 243, 0.2)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backdropFilter: 'blur(5px)',
  },
  volumeLabel: {
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
  },
  volumeSlider: {
    width: '150px',
    height: '5px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'rgba(33, 150, 243, 0.2)',
    outline: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  gameContainer: {
    background: 'rgba(0,0,0,0.5)',
    padding: '30px',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
  },
  scenarioContent: {
    background: 'rgba(0,0,0,0.3)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  scenarioTitle: {
    marginBottom: '30px',
    '& h3': {
      fontSize: '24px',
      marginBottom: '15px',
      color: '#2196f3'
    }
  },
  scenarioDescription: {
    marginBottom: '20px',
    lineHeight: '1.6'
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
    marginTop: '30px',
    width: '100%'
  },
  optionButton: {
    padding: '15px 20px',
    background: 'rgba(33,150,243,0.2)',
    border: '1px solid rgba(33,150,243,0.3)',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'left',
    fontSize: '16px',
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

export default PretextingSimulatorPage;