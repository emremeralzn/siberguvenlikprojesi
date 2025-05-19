import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const PhishingTestPage = () => {
  const { user, updateScore } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState('start');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(user?.score || 0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const scenarios = [
    {
      type: 'email',
      title: 'Şüpheli E-posta',
      description: 'Bankanızdan gelen bu e-postada hesabınızın güvenliği için acil işlem yapmanız isteniyor:',
      content: `
        Konu: ACİL - Hesap Güvenliği Uyarısı
        
        Sayın müşterimiz,
        
        Hesabınızda şüpheli işlemler tespit edilmiştir. Hesabınızı korumak için aşağıdaki bağlantıya tıklayarak bilgilerinizi güncelleyin.
        
        [Hesap Güvenliği Linki]
        
        Saygılarımızla,
        XYZ Bank Güvenlik Ekibi
      `,
      options: [
        { text: 'Linke tıkla ve bilgileri güncelle', result: 'trap', scoreImpact: -30 },
        { text: 'E-postayı görmezden gel ve sil', result: 'safe', scoreImpact: 20 },
        { text: 'Bankayı resmi numaradan ara', result: 'safe', scoreImpact: 30 }
      ]
    },
    {
      type: 'sms',
      title: 'SMS Bildirimi',
      description: 'Telefonunuza gelen bu SMS mesajını inceleyin:',
      content: `
        Kargo teslimatınız beklemede. Teslimat adresinizi onaylamak için:
        hxxp://kargo-takip.xyz/teslimat
        linkine tıklayın.
      `,
      options: [
        { text: 'Linke tıkla', result: 'trap', scoreImpact: -30 },
        { text: 'Mesajı sil', result: 'safe', scoreImpact: 20 },
        { text: 'Kargo firmasını ara', result: 'safe', scoreImpact: 30 }
      ]
    },
    {
      type: 'website',
      title: 'Web Sitesi Güvenliği',
      description: 'Bu web sitesini inceleyin:',
      content: `
        www.facebok-login.com
        
        Facebook hesabınıza giriş yapın
        Kullanıcı adı:
        Şifre:
      `,
      options: [
        { text: 'Giriş yap', result: 'trap', scoreImpact: -30 },
        { text: 'Siteyi kapat', result: 'safe', scoreImpact: 20 },
        { text: 'URL\'i kontrol et ve rapor et', result: 'safe', scoreImpact: 30 }
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
        testName: `Phishing Awareness Test - ${scenarios[currentScenario].title}`,
        isSuccessful: option.result === 'safe',
        attemptedOn: new Date().toISOString(),
        orderBy: new Date().getTime()
      };

      await fetch(`http://localhost:5079/api/user/${user.id}/TestLogs`, {
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

  const resetTest = () => {
    setGameState('start');
    setCurrentScenario(0);
    setShowFeedback(false);
    setFeedback(null);
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
            <h2 style={styles.title}>Phishing Testi</h2>
            <p style={styles.description}>
              Bu testte farklı phishing senaryolarıyla karşılaşacaksınız. 
              Her senaryo için en güvenli seçeneği seçmeye çalışın.
            </p>
            <motion.button
              onClick={() => setGameState('playing')}
              style={styles.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Teste Başla
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.gameContainer}
          >
            <h3 style={styles.scenarioTitle}>{scenarios[currentScenario].title}</h3>
            <p style={styles.scenarioDescription}>{scenarios[currentScenario].description}</p>
            <div style={styles.contentBox}>
              <pre style={styles.content}>{scenarios[currentScenario].content}</pre>
            </div>
            
            <div style={styles.optionsContainer}>
              {scenarios[currentScenario].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleChoice(option)}
                  style={styles.optionButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={showFeedback}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>

            {showFeedback && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...styles.feedback,
                  backgroundColor: feedback.result === 'safe' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'
                }}
              >
                <p>
                  {feedback.result === 'safe' 
                    ? 'Doğru seçim! Güvenli yolu seçtiniz.' 
                    : 'Dikkat! Bu bir phishing tuzağıydı.'}
                </p>
                <p>Puan değişimi: {feedback.scoreImpact}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={styles.endScreen}
          >
            <h2 style={styles.title}>Test Tamamlandı!</h2>
            <p style={styles.score}>Toplam Puanınız: {score}</p>
            <div style={styles.buttonContainer}>
              <motion.button
                onClick={resetTest}
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Testi Tekrarla
              </motion.button>
              <motion.button
                onClick={() => navigate('/home')}
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

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    background: `url('https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover`,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
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
  startScreen: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
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
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
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
  score: {
    color: '#ffffff',
    fontSize: '24px',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
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
};

export default PhishingTestPage; 