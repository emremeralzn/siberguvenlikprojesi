// PhishingSimulator.jsx
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import '../styles/css/PhishingSimulator.css';

const PhishingSimulator = () => {
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
          <h1 className="title">Phishing (Oltalama) Nedir?</h1>
          
          <div className="infoSection">
            <h2 className="subtitle">Phishing Saldırıları Hakkında</h2>
            <p className="text">
              Phishing (oltalama), siber suçluların kullanıcıları kandırarak hassas bilgilerini ele geçirmeye çalıştığı bir saldırı türüdür. 
              Bu saldırılarda genellikle:
            </p>
            
            <ul className="list">
              <li>Sahte e-postalar</li>
              <li>Taklit web siteleri</li>
              <li>Sosyal mühendislik teknikleri</li>
              <li>Aciliyet ve korku unsurları</li>
            </ul>

            <h2 className="subtitle">Nasıl Korunabiliriz?</h2>
            <p className="text">
              Phishing saldırılarından korunmak için dikkat edilmesi gereken temel noktalar:
            </p>

            <ul className="list">
              <li>E-posta adreslerini dikkatle kontrol edin</li>
              <li>Şüpheli bağlantılara tıklamayın</li>
              <li>Beklenmedik ekler konusunda dikkatli olun</li>
              <li>Acil işlem talepleri konusunda şüpheci olun</li>
            </ul>

            <h2 className="subtitle">Simülasyon Hakkında</h2>
            <p className="text">
              Bu simülasyonda gerçek hayatta karşılaşabileceğiniz phishing saldırı örnekleriyle karşılaşacaksınız. 
              Her senaryo için doğru kararı vermeye çalışın ve puanınızı yükseltin.
            </p>
          </div>

          <motion.button
            onClick={() => navigate('/simulators/phishing/test')}
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

export default PhishingSimulator;
