// BaitingSimulator.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const BaitingSimulator = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(() => {
    // localStorage'dan oyun durumunu al
    const savedState = localStorage.getItem('gameState');
    return savedState || 'start';
  });
  
  const [score, setScore] = useState(() => {
    // localStorage'dan skoru al
    const savedScore = localStorage.getItem('simulationScore');
    return savedScore ? parseInt(savedScore) : 100;
  });

  const [currentScenario, setCurrentScenario] = useState(() => {
    // localStorage'dan mevcut senaryo indeksini al
    const savedScenario = localStorage.getItem('currentScenario');
    return savedScenario ? parseInt(savedScenario) : 0;
  });

  // State değişikliklerini localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('gameState', gameState);
    localStorage.setItem('simulationScore', score.toString());
    localStorage.setItem('currentScenario', currentScenario.toString());
  }, [gameState, score, currentScenario]);

  // Kullanıcı çıkış yaptığında localStorage'dan simülasyon verilerini temizle
  useEffect(() => {
    if (!user) {
      localStorage.removeItem('gameState');
      localStorage.removeItem('simulationScore');
      localStorage.removeItem('currentScenario');
    }
  }, [user]);

  const handleChoice = async (option) => {
    // ... existing handleChoice code ...

    // localStorage'ı güncelle
    localStorage.setItem('simulationScore', (score + option.scoreImpact).toString());
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        const nextScenario = currentScenario + 1;
        setCurrentScenario(nextScenario);
        localStorage.setItem('currentScenario', nextScenario.toString());
      } else {
        setGameState('end');
        localStorage.setItem('gameState', 'end');
      }
    }, 3000);
  };

  const resetSimulation = () => {
    setGameState('start');
    setScore(100);
    setCurrentScenario(0);
    localStorage.setItem('gameState', 'start');
    localStorage.setItem('simulationScore', '100');
    localStorage.setItem('currentScenario', '0');
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page">
      <div className="overlay"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="container"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="contentContainer"
        >
          <h1 className="title">Baiting (Yem) Saldırıları</h1>
          
          <div className="infoSection">
            <h2 className="subtitle">Baiting Nedir?</h2>
            <p className="text">
              Baiting, siber suçluların kullanıcıları fiziksel veya dijital "yemler" kullanarak tuzağa düşürdüğü 
              bir sosyal mühendislik saldırı türüdür. Bu saldırılar genellikle insanların merak, açgözlülük veya 
              yardımseverlik duygularını istismar eder.
            </p>

            <h2 className="subtitle">Yaygın Baiting Yöntemleri</h2>
            <ul className="list">
              <li>
                <span className="listTitle">USB Sürücüler:</span>
                <p className="listText">
                  Halka açık yerlere veya ofislere bırakılan, zararlı yazılım içeren USB bellekler
                </p>
              </li>
              <li>
                <span className="listTitle">Sahte İndirimler:</span>
                <p className="listText">
                  "Bedava" veya "Büyük İndirim" vaadiyle kullanıcıları tuzağa düşüren teklifler
                </p>
              </li>
              <li>
                <span className="listTitle">Yazılım Yemleri:</span>
                <p className="listText">
                  Ücretsiz film, müzik veya yazılım indirme bağlantıları
                </p>
              </li>
              <li>
                <span className="listTitle">Hediye Kartları:</span>
                <p className="listText">
                  Sahte hediye kartı kazanımları ve promosyon teklifleri
                </p>
              </li>
            </ul>

            <h2 className="subtitle">Korunma Yöntemleri</h2>
            <div className="protectionGrid">
              <div className="protectionItem">
                <h3 className="protectionTitle">1. Şüpheci Yaklaşım</h3>
                <p className="protectionText">
                  "Çok iyi görünen" tekliflere karşı her zaman şüpheci olun
                </p>
              </div>
              <div className="protectionItem">
                <h3 className="protectionTitle">2. Doğrulama</h3>
                <p className="protectionText">
                  Kaynağı bilinmeyen hiçbir cihazı sisteminize bağlamayın
                </p>
              </div>
              <div className="protectionItem">
                <h3 className="protectionTitle">3. Güvenlik Politikaları</h3>
                <p className="protectionText">
                  Kurumsal güvenlik politikalarına her zaman uyun
                </p>
              </div>
              <div className="protectionItem">
                <h3 className="protectionTitle">4. Farkındalık</h3>
                <p className="protectionText">
                  Güncel baiting tekniklerinden haberdar olun
                </p>
              </div>
            </div>

            <h2 className="subtitle">Simülasyon Hakkında</h2>
            <p className="text">
              Bu simülasyonda, gerçek hayatta karşılaşabileceğiniz baiting saldırı senaryolarıyla karşılaşacaksınız.
              Her senaryo için en güvenli kararı vermeye çalışın ve güvenlik puanınızı yükseltin.
            </p>
          </div>

          <motion.button
            onClick={() => navigate('/simulators/baiting/test')}
            className="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Testi Başlat
          </motion.button>
          <motion.button
            onClick={() => navigate('/simulators/baiting/simulator')}
            className="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Simülasyonu Başlat
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BaitingSimulator;
