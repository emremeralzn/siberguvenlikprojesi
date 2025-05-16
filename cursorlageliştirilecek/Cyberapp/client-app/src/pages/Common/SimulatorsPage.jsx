import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserSecret, FaPhoneAlt, FaUsb, FaLock, FaShieldAlt } from 'react-icons/fa';

const SimulatorsPage = () => {
  const simulators = [
    {
      id: 'phishing',
      title: 'Phishing Simülatörü',
      description: 'Oltalama saldırılarını tanımayı ve önlemeyi öğrenin. E-posta tabanlı tehditlere karşı kendinizi koruyun.',
      icon: <FaUserShield size={40} />,
      path: '/simulators/phishing',
      color: '#4CAF50',
      features: ['E-posta Analizi', 'Güvenli Bağlantılar', 'Tehdit Tespiti']
    },
    {
      id: 'baiting',
      title: 'Baiting Simülatörü',
      description: 'Fiziksel tuzakları ve USB tabanlı tehditleri tespit etmeyi öğrenin. Sosyal mühendislik taktiklerine karşı farkındalığınızı artırın.',
      icon: <FaUsb size={40} />,
      path: '/simulators/baiting',
      color: '#2196F3',
      features: ['USB Güvenliği', 'Fiziksel Tehditler', 'Veri Koruma']
    },
    {
      id: 'pretexting',
      title: 'Pretexting Simülatörü',
      description: 'Sahte senaryolar ve kimlik taklidi saldırılarına karşı kendinizi koruyun. Manipülatif sosyal mühendislik tekniklerini öğrenin.',
      icon: <FaUserSecret size={40} />,
      path: '/simulators/pretexting',
      color: '#FF9800',
      features: ['Kimlik Doğrulama', 'Senaryo Analizi', 'Güvenlik Protokolleri']
    },
    {
      id: 'vishing',
      title: 'Vishing Simülatörü',
      description: 'Sesli dolandırıcılık çağrılarını tanımayı ve yönetmeyi öğrenin. Telefon tabanlı sosyal mühendislik saldırılarına karşı hazırlıklı olun.',
      icon: <FaPhoneAlt size={40} />,
      path: '/simulators/vishing',
      color: '#E91E63',
      features: ['Sesli Tehditler', 'Arama Güvenliği', 'Doğrulama Teknikleri']
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <motion.div 
        style={styles.heroSection}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <FaShieldAlt size={60} style={styles.heroIcon} />
        </motion.div>
        <motion.h1 
          style={styles.heroTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Siber Güvenlik Simülatörleri
        </motion.h1>
        <motion.p 
          style={styles.heroSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Gerçek dünya senaryolarıyla siber güvenlik becerilerinizi geliştirin
        </motion.p>
      </motion.div>

      <div style={styles.content}>
        <div style={styles.simulatorsGrid}>
          {simulators.map((simulator, index) => (
            <motion.div
              key={simulator.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
              }}
            >
              <Link to={simulator.path} style={{ textDecoration: 'none' }}>
                <div style={styles.simulatorCard}>
                  <motion.div 
                    style={{...styles.iconContainer, backgroundColor: simulator.color}}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {simulator.icon}
                  </motion.div>
                  <h3 style={{...styles.cardTitle, color: simulator.color}}>{simulator.title}</h3>
                  <p style={styles.cardDescription}>{simulator.description}</p>
                  
                  <div style={styles.featuresContainer}>
                    {simulator.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        style={styles.featureTag}
                        whileHover={{ scale: 1.05 }}
                      >
                        <FaLock size={12} style={{ marginRight: '5px' }} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    style={{...styles.startButton, borderColor: simulator.color}}
                    whileHover={{ 
                      backgroundColor: simulator.color,
                      scale: 1.05
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Simülasyonu Başlat
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    minHeight: "100vh",
    padding: "20px",
  },
  heroSection: {
    backgroundColor: "#141e30",
    textAlign: "center",
    padding: "30px 0",
    marginBottom: "20px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  heroIcon: {
    color: "#58a6ff",
    marginBottom: "10px",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#8b949e",
    maxWidth: "600px",
    margin: "0 auto",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  simulatorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
  simulatorCard: {
    backgroundColor: "#161b22",
    borderRadius: "15px",
    padding: "30px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    border: "1px solid #30363d",
    transition: "all 0.3s ease",
  },
  iconContainer: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "25px",
    color: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  cardDescription: {
    fontSize: "1.1rem",
    color: "#8b949e",
    lineHeight: "1.6",
    marginBottom: "25px",
    flex: 1,
  },
  featuresContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "25px",
  },
  featureTag: {
    backgroundColor: "#1e1e1e",
    color: "#58a6ff",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    border: "1px solid #30363d",
  },
  startButton: {
    padding: "12px 30px",
    fontSize: "1.1rem",
    borderRadius: "8px",
    border: "2px solid",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  },
};

export default SimulatorsPage; 