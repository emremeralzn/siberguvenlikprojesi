import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const PretextingTestPage = () => {
  const { user, updateScore } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('start');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(user?.score || 0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const scenarios = [
    {
      type: 'work',
      title: 'Yeni İş Arkadaşı',
      description: 'Şirketinize yeni başladığını söyleyen biri:',
      content: `
        "Merhaba, ben Ahmet. IT departmanına yeni başladım. Şirket sistemlerine 
        erişim bilgilerimi henüz alamadım. Acil bir iş var ve tamamlamam gerekiyor. 
        Sizin hesap bilgilerinizle giriş yapabilir miyim?"
      `,
      options: [
        { 
          text: 'Bilgileri paylaş', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Asla! Hesap bilgilerini başkalarıyla paylaşmak güvenlik politikalarına aykırıdır.'
        },
        { 
          text: 'IT departmanını ara ve teyit et', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Mükemmel! Her zaman bu tür istekleri resmi kanallardan doğrulamalısınız.'
        },
        { 
          text: 'Talebi reddet', 
          result: 'safe', 
          scoreImpact: 20,
          feedback: 'İyi! Şüpheli istekleri reddetmek güvenli bir yaklaşımdır.'
        }
      ]
    },
    {
      type: 'delivery',
      title: 'Kargo Teslimatı',
      description: 'Bir kargo şirketinden olduğunu söyleyen biri:',
      content: `
        "İyi günler, X Kargo'dan arıyorum. Adınıza bir teslimatımız var ama adres 
        bilgileriniz eksik. Kimlik numaranız ve açık adresinizi alabilir miyim? 
        Ayrıca 5 TL'lik bir işlem ücreti var, kart bilgilerinizi alabilir miyim?"
      `,
      options: [
        { 
          text: 'Bilgileri ver', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Hayır! Kargo şirketleri telefonda kart bilgisi istemez.'
        },
        { 
          text: 'Kargo şirketini ara', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Harika! Şirketin resmi numarasından teyit etmek en doğrusu.'
        },
        { 
          text: 'Görüşmeyi sonlandır', 
          result: 'safe', 
          scoreImpact: 20,
          feedback: 'İyi! Şüpheli aramaları sonlandırmak güvenlidir.'
        }
      ]
    },
    {
      type: 'social',
      title: 'Sosyal Medya Doğrulama',
      description: 'Sosyal medya hesabınıza gelen bir mesaj:',
      content: `
        "Merhaba, ben Instagram güvenlik ekibinden. Hesabınızda şüpheli aktivite 
        tespit ettik. Hesabınızı doğrulamak için size bir kod göndereceğiz, 
        lütfen bu kodu bizimle paylaşın."
      `,
      options: [
        { 
          text: 'Kodu paylaş', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Asla! Bu bir doğrulama kodu çalma girişimi.'
        },
        { 
          text: 'Resmi Instagram desteğe başvur', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Mükemmel! Her zaman resmi kanalları kullanın.'
        },
        { 
          text: 'Mesajı engelle ve raporla', 
          result: 'safe', 
          scoreImpact: 25,
          feedback: 'Çok iyi! Şüpheli hesapları raporlamak önemli.'
        }
      ]
    },
    {
      type: 'emergency',
      title: 'Acil Durum Çağrısı',
      description: 'Üst yönetimden olduğunu söyleyen biri:',
      content: `
        "Ben şirket CEO'sunun asistanı. Acil bir toplantı için şirket kredi kartı 
        bilgilerine ihtiyacımız var. CEO şu an toplantıda ve benden istedi. 
        Hemen bilgileri paylaşabilir misiniz?"
      `,
      options: [
        { 
          text: 'Bilgileri hemen gönder', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Hayır! Aciliyet baskısı altında asla hassas bilgi paylaşmayın.'
        },
        { 
          text: 'Üst yönetimi ara ve teyit et', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Mükemmel! Her zaman üst yönetimden gelen istekleri doğrulayın.'
        },
        { 
          text: 'Şirket politikasını hatırlat ve reddet', 
          result: 'safe', 
          scoreImpact: 25,
          feedback: 'Çok iyi! Şirket politikalarına bağlı kalmak önemli.'
        }
      ]
    }
  ];

  const handleChoice = async (option) => {
    setShowFeedback(true);
    setFeedback(option);
    const newScore = score + option.scoreImpact;
    setScore(newScore);

    try {
      // Simülasyon logunu kaydet
      const simulationLog = {
        userId: user.id,
        simulationName: `Pretexting_${scenarios[currentScenario].type}`,
        isSuccessful: option.result === 'safe',
        attemptedOn: new Date().toISOString()
      };

      await fetch(`http://localhost:5079/api/user/${user.id}/simulationLogs`, {
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
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
      } else {
        setGameState('end');
      }
    }, 3000);
  };

  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#0d1117',
      width: '100%',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#0d1117',
    },
    container: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    startScreen: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    },
    title: {
      color: '#1e90ff',
      fontSize: '36px',
      textAlign: 'center',
      marginBottom: '30px',
      textShadow: '0 0 12px #1e90ff, 0 0 24px #1e90ff',
    },
    description: {
      color: '#ffffff',
      fontSize: '18px',
      textAlign: 'center',
      marginBottom: '30px',
    },
    gameContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    },
    scenarioTitle: {
      color: '#1e90ff',
      fontSize: '24px',
      marginBottom: '20px',
    },
    scenarioDescription: {
      color: '#ffffff',
      fontSize: '16px',
      marginBottom: '20px',
    },
    contentBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
    },
    content: {
      color: '#ffffff',
      whiteSpace: 'pre-wrap',
      fontFamily: 'monospace',
      fontSize: '14px',
    },
    optionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    optionButton: {
      padding: '15px',
      fontSize: '16px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#1e90ff',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    feedback: {
      padding: '20px',
      borderRadius: '8px',
      marginTop: '20px',
      color: '#ffffff',
      textAlign: 'center',
    },
    endScreen: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '40px',
      borderRadius: '15px',
      boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
      textAlign: 'center',
    },
    scoreBoard: {
      color: '#ffffff',
      fontSize: '20px',
      textAlign: 'right',
      marginBottom: '20px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '18px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: '#1e90ff',
      color: '#ffffff',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
    },
    finalScore: {
      color: '#1e90ff',
      fontSize: '32px',
      marginBottom: '20px',
    },
    finalFeedback: {
      color: '#ffffff',
      fontSize: '18px',
      marginBottom: '30px',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.container}
      >
        {gameState === 'start' && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.startScreen}
          >
            <h1 style={styles.title}>Pretexting Testi</h1>
            <p style={styles.description}>
              Gerçek hayatta karşılaşabileceğiniz pretexting senaryolarını test edin.
              Her seçiminiz puanınızı etkileyecektir.
            </p>
            <motion.button
              onClick={() => setGameState('playing')}
              style={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Başla
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <div style={styles.gameContainer}>
            <div style={styles.scoreBoard}>Puan: {score}</div>
            <h2 style={styles.scenarioTitle}>{scenarios[currentScenario].title}</h2>
            <p style={styles.scenarioDescription}>
              {scenarios[currentScenario].description}
            </p>
            <div style={styles.contentBox}>
              <p style={styles.content}>{scenarios[currentScenario].content}</p>
            </div>
            <div style={styles.optionsContainer}>
              {scenarios[currentScenario].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleChoice(option)}
                  style={styles.optionButton}
                  disabled={showFeedback}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
            {showFeedback && (
              <div
                style={{
                  ...styles.feedback,
                  backgroundColor:
                    feedback.result === 'safe' ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                }}
              >
                <p style={styles.feedbackText}>{feedback.feedback}</p>
                <p style={styles.scoreImpact}>
                  Puan: {feedback.scoreImpact > 0 ? '+' : ''}{feedback.scoreImpact}
                </p>
              </div>
            )}
          </div>
        )}

        {gameState === 'end' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={styles.endScreen}
          >
            <h2 style={styles.finalScore}>Final Puanınız: {score}</h2>
            <p style={styles.finalFeedback}>
              Tebrikler! Pretexting testini tamamladınız.
            </p>
            <div style={styles.buttonContainer}>
              <motion.button
                onClick={() => {
                  setGameState('start');
                  setCurrentScenario(0);
                  setScore(user?.score || 0);
                }}
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Testi Tekrarla
              </motion.button>
              <motion.button
                onClick={() => navigate('/simulators/pretexting')}
                style={{...styles.button, backgroundColor: '#4CAF50'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ana Sayfaya Dön
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PretextingTestPage; 