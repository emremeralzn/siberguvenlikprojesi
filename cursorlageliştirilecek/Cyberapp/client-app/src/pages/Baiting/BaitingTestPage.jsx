import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const BaitingTestPage = () => {
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
      type: 'usb',
      title: 'USB Bellek Bulundu',
      description: 'Ofis park alanında etiketli bir USB bellek buldunuz:',
      content: `
        "Önemli Şirket Dosyaları - İK Departmanı"
        
        USB bellek yeni ve markalı görünüyor.
        Ne yapmalısınız?
      `,
      options: [
        { 
          text: 'USB belleği bilgisayara tak ve içeriğini kontrol et', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Tehlikeli! Bilinmeyen USB cihazları zararlı yazılım içerebilir.'
        },
        { 
          text: 'USB belleği BT departmanına teslim et', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Mükemmel! BT departmanı USB belleği güvenli bir ortamda inceleyebilir.'
        },
        { 
          text: 'USB belleği görmezden gel ve yerinde bırak', 
          result: 'safe', 
          scoreImpact: 20,
          feedback: 'İyi! Bilinmeyen USB cihazlarına karşı temkinli olmak önemlidir.'
        }
      ]
    },
    {
      type: 'software',
      title: 'Ücretsiz Yazılım Teklifi',
      description: 'Popüler bir ücretli yazılımın ücretsiz sürümünü indirmenizi öneren bir reklam:',
      content: `
        "Premium Video Düzenleme Yazılımı - ÜCRETSİZ!
        
        Normalde 299$ olan profesyonel video düzenleme yazılımını 
        BUGÜN ÜCRETSİZ indirin!
        
        [İNDİR]"
      `,
      options: [
        { 
          text: 'Hemen indir ve kur', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Dikkat! Ücretsiz yazılım teklifleri genellikle zararlı yazılım içerir.'
        },
        { 
          text: 'Teklifi görmezden gel', 
          result: 'safe', 
          scoreImpact: 20,
          feedback: 'Doğru! Şüpheli teklifleri görmezden gelmek en güvenli yoldur.'
        },
        { 
          text: 'Yazılımın resmi sitesini kontrol et', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Harika! Her zaman resmi kaynakları kullanmak en güvenli seçenektir.'
        }
      ]
    },
    {
      type: 'gift',
      title: 'Hediye Kartı Kazandınız',
      description: 'E-postanıza gelen bir bildirim:',
      content: `
        "Tebrikler! 500₺ değerinde alışveriş kartı kazandınız!
        
        Hediyenizi almak için aşağıdaki formu doldurun:
        - Ad Soyad
        - Telefon
        - Kredi Kartı (hediye kartı yükleme için)
        
        [FORMU DOLDUR]"
      `,
      options: [
        { 
          text: 'Formu doldur ve hediyeyi al', 
          result: 'trap', 
          scoreImpact: -30,
          feedback: 'Tehlike! Beklenmedik hediye teklifleri genellikle dolandırıcılık amaçlıdır.'
        },
        { 
          text: 'E-postayı spam olarak işaretle ve sil', 
          result: 'safe', 
          scoreImpact: 30,
          feedback: 'Mükemmel! Şüpheli e-postaları spam olarak işaretlemek doğru bir yaklaşımdır.'
        },
        { 
          text: 'Arkadaşlarınla paylaş', 
          result: 'trap', 
          scoreImpact: -20,
          feedback: 'Yanlış! Şüpheli teklifleri başkalarıyla paylaşmak onları da riske atar.'
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
      const simulationLog = {
        userId: user.id,
        testName: `Baiting Awareness Test - ${scenarios[currentScenario].title}`,
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
            <h2 style={styles.title}>Baiting Testi</h2>
            <p style={styles.description}>
              Bu testte gerçek hayatta karşılaşabileceğiniz baiting (yemleme) senaryolarıyla karşılaşacaksınız.
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.gameContainer}
          >
            <div style={styles.scoreBoard}>
              Güvenlik Puanı: {score}
            </div>
            
            <h3 style={styles.scenarioTitle}>{scenarios[currentScenario].title}</h3>
            <p style={styles.scenarioDescription}>{scenarios[currentScenario].description}</p>
            
            <div style={styles.contentBox}>
              <pre style={styles.content}>{scenarios[currentScenario].content}</pre>
            </div>

            {!showFeedback ? (
              <div style={styles.optionsContainer}>
                {scenarios[currentScenario].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleChoice(option)}
                    style={styles.optionButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...styles.feedback,
                  backgroundColor: feedback.result === 'safe' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'
                }}
              >
                <p style={styles.feedbackText}>{feedback.feedback}</p>
                <p style={styles.scoreImpact}>Puan değişimi: {feedback.scoreImpact}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={styles.endScreen}
          >
            <h2 style={styles.title}>Test Tamamlandı!</h2>
            <p style={styles.finalScore}>Final Puanınız: {score}</p>
            <p style={styles.finalFeedback}>
              {score >= 80 ? "Harika! Baiting tuzaklarına karşı oldukça dikkatlisiniz." :
               score >= 50 ? "İyi! Ancak daha dikkatli olmalısınız." :
               "Daha fazla güvenlik bilinci geliştirmelisiniz."}
            </p>
            <div style={styles.buttonContainer}>
              <motion.button
                onClick={() => {
                  setGameState('start');
                  setCurrentScenario(0);
                  setScore(user.score);
                }}
                style={styles.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Testi Tekrarla
              </motion.button>
              <motion.button
                onClick={() => navigate('/simulators/baiting')}
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
  scoreBoard: {
    color: '#ffffff',
    fontSize: '20px',
    textAlign: 'right',
    marginBottom: '20px',
  },
  feedbackText: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  scoreImpact: {
    fontSize: '16px',
    opacity: 0.8,
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

export default BaitingTestPage;