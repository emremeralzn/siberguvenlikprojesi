import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaHandshake, FaGavel, FaQuestionCircle } from 'react-icons/fa';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <FaFileContract />,
      title: "Kullanım Koşulları",
      content: "CyberApp'i kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz."
    },
    {
      icon: <FaUserCheck />,
      title: "Hesap Sorumlulukları",
      content: "Hesabınızla ilgili sorumluluklarınız:",
      list: [
        "Hesap bilgilerinizi güvenli tutmak",
        "Şifrenizi düzenli olarak değiştirmek",
        "Hesabınızla yapılan tüm işlemlerden sorumlu olmak",
        "Hesap bilgilerinizi başkalarıyla paylaşmamak"
      ]
    },
    {
      icon: <FaExclamationTriangle />,
      title: "Yasaklı İçerik ve Davranışlar",
      content: "Aşağıdaki içerik ve davranışlar kesinlikle yasaktır:",
      list: [
        "Yasadışı içerik paylaşımı",
        "Başkalarının haklarını ihlal eden davranışlar",
        "Spam ve zararlı yazılım paylaşımı",
        "Diğer kullanıcıları taciz etme",
        "Sistem güvenliğini tehlikeye atan davranışlar"
      ]
    },
    {
      icon: <FaHandshake />,
      title: "Hizmet Kullanımı",
      content: "CyberApp hizmetlerini kullanırken:",
      list: [
        "Hizmetlerimizi yasal amaçlar için kullanın",
        "Diğer kullanıcıların haklarına saygı gösterin",
        "Sistem kaynaklarını adil kullanın",
        "Hizmetlerimizi kötüye kullanmayın"
      ]
    },
    {
      icon: <FaGavel />,
      title: "Yasal Sorumluluklar",
      content: "CyberApp kullanımı ile ilgili yasal sorumluluklar:",
      list: [
        "Tüm yerel ve uluslararası yasalara uymak",
        "Fikri mülkiyet haklarına saygı göstermek",
        "Gizlilik ve veri koruma yasalarına uymak",
        "Hizmet kullanımından doğan sorumlulukları kabul etmek"
      ]
    },
    {
      icon: <FaQuestionCircle />,
      title: "İletişim ve Destek",
      content: "Kullanım koşulları hakkında sorularınız için:",
      contact: "E-posta: support@cyberapp.com"
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
          Kullanım Koşulları
        </motion.h2>
        <motion.p 
          style={styles.sliderText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          CyberApp kullanım koşulları ve kuralları
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

export default Terms;
