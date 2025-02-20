import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/css/VishingSimulator.css';

const VishingSimulator = () => {
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
          <h1 className="title">Vishing (Sesli Oltalama) Nedir?</h1>
          
          <div className="infoSection">
            <h2 className="subtitle">Vishing Saldırıları Hakkında</h2>
            <p className="text">
              Vishing, "voice phishing" kelimelerinin birleşiminden oluşan, telefon üzerinden 
              yapılan sosyal mühendislik saldırılarıdır. Saldırganlar genellikle banka, 
              devlet kurumu veya teknik destek personeli gibi davranırlar.
            </p>

            <h2 className="subtitle">Yaygın Vishing Teknikleri</h2>
            <ul className="list">
              <li>Sahte banka aramaları</li>
              <li>Teknik destek dolandırıcılığı</li>
              <li>Vergi dairesi taklidi</li>
              <li>Acil durum aramaları</li>
            </ul>

            <h2 className="subtitle">Korunma Yöntemleri</h2>
            <ul className="list">
              <li>Beklenmedik aramalara şüpheyle yaklaşın</li>
              <li>Hassas bilgileri telefonla paylaşmayın</li>
              <li>Resmi numaralardan geri arama yapın</li>
              <li>Baskı altında karar vermeyin</li>
            </ul>

            <h2 className="subtitle">Simülasyon Hakkında</h2>
            <p className="text">
              Bu simülasyonda gerçek hayatta karşılaşabileceğiniz vishing saldırı örnekleriyle 
              karşılaşacaksınız. Her senaryo için doğru kararı vermeye çalışın ve puanınızı yükseltin.
            </p>
          </div>

          <motion.button
            onClick={() => navigate('/simulators/vishing/test')}
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

export default VishingSimulator; 