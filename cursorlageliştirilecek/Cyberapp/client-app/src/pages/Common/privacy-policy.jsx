import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookieBite, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <FaShieldAlt />,
      title: "Veri Toplama ve Kullanım",
      content: "CyberApp olarak, kullanıcılarımızın gizliliğini korumak en önemli önceliklerimizden biridir. Bu gizlilik politikası, hangi bilgileri topladığımızı ve bu bilgileri nasıl kullandığımızı açıklar."
    },
    {
      icon: <FaLock />,
      title: "Toplanan Bilgiler",
      content: "Uygulamamız aşağıdaki bilgileri toplar:",
      list: [
        "Ad ve soyad",
        "E-posta adresi",
        "Kullanıcı adı",
        "Simülasyon skorları",
        "Kullanım istatistikleri"
      ]
    },
    {
      icon: <FaUserShield />,
      title: "Bilgilerin Kullanımı",
      content: "Topladığımız bilgileri şu amaçlarla kullanırız:",
      list: [
        "Hesabınızı oluşturmak ve yönetmek",
        "Simülasyon skorlarınızı kaydetmek ve görüntülemek",
        "Hizmetlerimizi iyileştirmek",
        "Güvenlik önlemlerini uygulamak"
      ]
    },
    {
      icon: <FaDatabase />,
      title: "Veri Güvenliği",
      content: "Kullanıcı verilerinizin güvenliği için endüstri standardı güvenlik önlemleri uyguluyoruz. Verileriniz şifrelenerek saklanır ve yetkisiz erişime karşı korunur."
    },
    {
      icon: <FaCookieBite />,
      title: "Çerezler ve İzleme",
      content: "Web sitemizde çerezler kullanıyoruz. Bu çerezler, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için kullanılır."
    },
    {
      icon: <FaEnvelope />,
      title: "İletişim",
      content: "Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:",
      contact: "E-posta: info@cyberapp.com"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <motion.div 
        style={styles.slider}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          style={styles.sliderTitle}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Gizlilik Politikası
        </motion.h2>
        <motion.p 
          style={styles.sliderText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Verilerinizin güvenliği bizim için önemli
        </motion.p>
      </motion.div>

      <div style={styles.content}>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            style={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={styles.sectionHeader}>
              <span style={styles.sectionIcon}>{section.icon}</span>
              <h2 style={styles.sectionTitle}>{section.title}</h2>
            </div>
            <p style={styles.sectionText}>{section.content}</p>
            {section.list && (
              <ul style={styles.list}>
                {section.list.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    style={styles.listItem}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            )}
            {section.contact && (
              <p style={styles.contact}>{section.contact}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    padding: "20px",
  },
  slider: {
    backgroundColor: "#141e30",
    textAlign: "center",
    padding: "50px 0",
    marginBottom: "20px",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  },
  sliderTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
    marginBottom: "15px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  sliderText: {
    fontSize: "1.2rem",
    color: "#8b949e",
    maxWidth: "600px",
    margin: "0 auto",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: "15px",
    padding: "30px",
    marginBottom: "30px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(30, 144, 255, 0.2)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    gap: "15px",
  },
  sectionIcon: {
    fontSize: "2rem",
    color: "#1e90ff",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    color: "#1e90ff",
    margin: 0,
  },
  sectionText: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#c9d1d9",
    marginBottom: "20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "10px 0",
    paddingLeft: "25px",
    position: "relative",
    fontSize: "1rem",
    color: "#c9d1d9",
    "&:before": {
      content: '"•"',
      position: "absolute",
      left: 0,
      color: "#1e90ff",
    },
  },
  contact: {
    fontSize: "1.1rem",
    color: "#1e90ff",
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default PrivacyPolicy;
