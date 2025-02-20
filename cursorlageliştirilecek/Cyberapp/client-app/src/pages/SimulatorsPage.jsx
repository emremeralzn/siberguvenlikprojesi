import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserSecret, FaPhoneAlt, FaUsb } from 'react-icons/fa';

const SimulatorsPage = () => {
  const simulators = [
    {
      id: 'phishing',
      title: 'Phishing Simülatörü',
      description: 'Oltalama saldırılarını tanımayı ve önlemeyi öğrenin. E-posta tabanlı tehditlere karşı kendinizi koruyun.',
      icon: <FaUserShield size={40} />,
      path: '/simulators/phishing',
      color: '#4CAF50'
    },
    {
      id: 'baiting',
      title: 'Baiting Simülatörü',
      description: 'Fiziksel tuzakları ve USB tabanlı tehditleri tespit etmeyi öğrenin. Sosyal mühendislik taktiklerine karşı farkındalığınızı artırın.',
      icon: <FaUsb size={40} />,
      path: '/simulators/baiting',
      color: '#2196F3'
    },
    {
      id: 'pretexting',
      title: 'Pretexting Simülatörü',
      description: 'Sahte senaryolar ve kimlik taklidi saldırılarına karşı kendinizi koruyun. Manipülatif sosyal mühendislik tekniklerini öğrenin.',
      icon: <FaUserSecret size={40} />,
      path: '/simulators/pretexting',
      color: '#FF9800'
    },
    {
      id: 'vishing',
      title: 'Vishing Simülatörü',
      description: 'Sesli dolandırıcılık çağrılarını tanımayı ve yönetmeyi öğrenin. Telefon tabanlı sosyal mühendislik saldırılarına karşı hazırlıklı olun.',
      icon: <FaPhoneAlt size={40} />,
      path: '/simulators/vishing',
      color: '#E91E63'
    }
  ];

  return (
    <div style={styles.container}>
      <br />
      <div style={styles.slider}>
        <h2 style={styles.sliderTitle}>Siber Güvenlik Simülatörleri</h2>
        <p style={styles.sliderText}>
          Gerçek dünya senaryolarıyla siber güvenlik becerilerinizi geliştirin
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.simulatorsGrid}>
          {simulators.map((simulator) => (
            <motion.div
              key={simulator.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={simulator.path} style={{ textDecoration: 'none' }}>
                <div style={styles.simulatorCard}>
                  <div style={{...styles.iconContainer, backgroundColor: simulator.color}}>
                    {simulator.icon}
                  </div>
                  <h3 style={styles.cardTitle}>{simulator.title}</h3>
                  <p style={styles.cardDescription}>{simulator.description}</p>
                  <motion.button
                    style={styles.startButton}
                    whileHover={{ backgroundColor: simulator.color }}
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
  },
  slider: {
    backgroundColor: "#141e30",
    textAlign: "center",
    padding: "50px 0",
    marginBottom: "40px",
  },
  sliderTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
  },
  sliderText: {
    fontSize: "1.2rem",
    color: "#8b949e",
    marginTop: "10px",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  simulatorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
  simulatorCard: {
    backgroundColor: "#161b22",
    borderRadius: "15px",
    padding: "25px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    color: "white",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#ffffff",
    marginBottom: "15px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#8b949e",
    lineHeight: "1.6",
    marginBottom: "25px",
    flex: 1,
  },
  startButton: {
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1f2937",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default SimulatorsPage; 