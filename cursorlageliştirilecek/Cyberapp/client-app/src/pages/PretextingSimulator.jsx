import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const PretextingSimulator = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <h1 className="title">Pretexting (Bahane Üretme) Nedir?</h1>
          
          <div className="infoSection">
            <h2 className="subtitle">Pretexting Saldırıları Hakkında</h2>
            <p className="text">
              Pretexting, saldırganların kurbanlarını manipüle etmek için sahte senaryolar ve 
              hikayeler oluşturduğu bir sosyal mühendislik tekniğidir. Saldırgan genellikle 
              güvenilir bir kişi veya otorite figürü gibi davranır.
            </p>

            <h2 className="subtitle">Yaygın Pretexting Yöntemleri</h2>
            <ul className="list">
              <li>Yetkili kişi taklidi yapma</li>
              <li>Acil durum senaryoları oluşturma</li>
              <li>Sahte kimlik kullanma</li>
              <li>Duygusal manipülasyon</li>
            </ul>

            <h2 className="subtitle">Korunma Yöntemleri</h2>
            <ul className="list">
              <li>Kimlik doğrulama prosedürlerini takip edin</li>
              <li>Şüpheli istekleri teyit edin</li>
              <li>Kişisel bilgileri paylaşırken dikkatli olun</li>
              <li>Baskı altında karar vermeyin</li>
            </ul>

            <h2 className="subtitle">Simülasyon Hakkında</h2>
            <p className="text">
              Bu simülasyonda gerçek hayatta karşılaşabileceğiniz pretexting saldırı örnekleriyle 
              karşılaşacaksınız. Her senaryo için doğru kararı vermeye çalışın ve puanınızı yükseltin.
            </p>
          </div>

          <motion.button
            onClick={() => navigate('/pretexting/test')}
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

export default PretextingSimulator; 