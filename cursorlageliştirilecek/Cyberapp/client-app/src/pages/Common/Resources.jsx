import React from 'react';
import { motion } from 'framer-motion';
import './styles/Resources.css';

const Resources = () => {
  const resources = [
    {
      title: "Resmi Kurumlar ve Kaynaklar",
      icon: "🏛️",
      items: [
        {
          name: "USOM - Ulusal Siber Olaylara Müdahale Merkezi",
          description: "Türkiye'nin siber güvenlik merkezi ve zararlı bağlantı ihbar platformu",
          link: "https://www.usom.gov.tr",
          color: "#1E90FF"
        },
        {
          name: "BTK - Bilgi Teknolojileri ve İletişim Kurumu",
          description: "Güvenli internet ve teknoloji kullanımı hakkında bilgiler",
          link: "https://www.btk.gov.tr",
          color: "#FF6B6B"
        },
        {
          name: "KVKK - Kişisel Verileri Koruma Kurumu",
          description: "Kişisel verilerin korunması hakkında rehberler ve düzenlemeler",
          link: "https://www.kvkk.gov.tr",
          color: "#4CAF50"
        }
      ]
    },
    {
      title: "Siber Güvenlik Eğitim Platformları",
      icon: "🎓",
      items: [
        {
          name: "TryHackMe",
          description: "Uygulamalı siber güvenlik eğitimleri ve CTF platformu",
          link: "https://tryhackme.com",
          color: "#9C27B0"
        },
        {
          name: "HackTheBox",
          description: "Gelişmiş siber güvenlik laboratuvarı ve eğitim platformu",
          link: "https://www.hackthebox.com",
          color: "#FF9800"
        },
        {
          name: "Siber Vatan",
          description: "Türkiye'nin milli siber güvenlik eğitim platformu",
          link: "https://www.sibervatan.com",
          color: "#E91E63"
        }
      ]
    },
    {
      title: "Güvenlik Araçları",
      icon: "🛠️",
      items: [
        {
          name: "VirusTotal",
          description: "Dosya ve URL'leri birçok antivirüs motoruyla tarayan online platform",
          link: "https://www.virustotal.com",
          color: "#2196F3"
        },
        {
          name: "Have I Been Pwned",
          description: "E-posta adresinizin veri ihlallerine karışıp karışmadığını kontrol edin",
          link: "https://haveibeenpwned.com",
          color: "#FF5722"
        },
        {
          name: "Shodan",
          description: "İnternet bağlantılı cihazları tarayan güvenlik arama motoru",
          link: "https://www.shodan.io",
          color: "#00BCD4"
        }
      ]
    },
    {
      title: "Güncel Tehdit İstihbaratı",
      icon: "📊",
      items: [
        {
          name: "SANS Internet Storm Center",
          description: "Güncel siber tehdit ve saldırı bilgileri",
          link: "https://isc.sans.edu",
          color: "#673AB7"
        },
        {
          name: "ExploitDB",
          description: "Güvenlik açıkları ve exploit veritabanı",
          link: "https://www.exploit-db.com",
          color: "#F44336"
        },
        {
          name: "CVE Details",
          description: "Bilinen güvenlik zafiyetleri veritabanı",
          link: "https://www.cvedetails.com",
          color: "#795548"
        }
      ]
    },
    {
      title: "Siber Güvenlik Toplulukları",
      icon: "👥",
      items: [
        {
          name: "OWASP Türkiye",
          description: "Web uygulama güvenliği topluluğu",
          link: "https://owasp.org/www-chapter-turkey/",
          color: "#009688"
        },
        {
          name: "Siber Güvenlik Türkiye",
          description: "Türkiye'nin en büyük siber güvenlik forumu",
          link: "https://www.siberguvenlik.org.tr",
          color: "#3F51B5"
        },
        {
          name: "BGA - Bilgi Güvenliği Akademisi",
          description: "Siber güvenlik eğitimleri ve sertifikasyon programları",
          link: "https://www.bga.com.tr",
          color: "#CDDC39"
        }
      ]
    }
  ];

  const certifications = [
    {
      name: "CompTIA Security+",
      description: "Temel siber güvenlik sertifikası",
      link: "https://www.comptia.org/certifications/security",
      icon: "🔒",
      color: "#1E90FF"
    },
    {
      name: "CEH - Certified Ethical Hacker",
      description: "Etik hacker sertifikası",
      link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/",
      icon: "👨‍💻",
      color: "#FF6B6B"
    },
    {
      name: "CISSP",
      description: "Profesyonel bilgi güvenliği sertifikası",
      link: "https://www.isc2.org/Certifications/CISSP",
      icon: "🏆",
      color: "#4CAF50"
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
        <motion.h1 
          style={styles.heroTitle}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Siber Güvenlik Kaynakları
        </motion.h1>
        <motion.p 
          style={styles.heroSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Siber güvenlik dünyasında kendinizi geliştirmek için ihtiyacınız olan tüm kaynaklar
        </motion.p>
      </motion.div>

      <div style={styles.mainContent}>
        <div className="resources-grid">
          {resources.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="resource-section"
              style={styles.section}
            >
              <motion.div 
                className="section-header"
                whileHover={{ scale: 1.02 }}
              >
                <span style={styles.sectionIcon}>{section.icon}</span>
                <h2 className="section-title">{section.title}</h2>
              </motion.div>
              <div className="items-container">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
                    }}
                    className="resource-item"
                    style={{
                      borderLeft: `4px solid ${item.color}`,
                      backgroundColor: "#1e1e1e"
                    }}
                  >
                    <h3 style={{ color: item.color }}>{item.name}</h3>
                    <p>{item.description}</p>
                    <motion.a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="resource-link"
                      whileHover={{ 
                        x: 5,
                        color: item.color
                      }}
                    >
                      Ziyaret Et →
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="certifications-section"
          style={styles.certificationsSection}
        >
          <motion.h2 
            style={styles.certificationsTitle}
            whileHover={{ scale: 1.05 }}
          >
            Önerilen Sertifikalar
          </motion.h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
                }}
                className="certification-item"
                style={{
                  borderLeft: `4px solid ${cert.color}`,
                  backgroundColor: "#1e1e1e"
                }}
              >
                <div style={styles.certIcon}>{cert.icon}</div>
                <h3 style={{ color: cert.color }}>{cert.name}</h3>
                <p>{cert.description}</p>
                <motion.a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cert-link"
                  whileHover={{ 
                    x: 5,
                    color: cert.color
                  }}
                >
                  Detaylı Bilgi →
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="contact-section"
          style={styles.contactSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2>İletişim</h2>
          <p>Sorularınız ve önerileriniz için bize ulaşın:</p>
          <motion.a 
            href="mailto:contact@cyberapp.com" 
            className="contact-link"
            whileHover={{ 
              scale: 1.05,
              color: "#1E90FF"
            }}
          >
            contact@cyberapp.com
          </motion.a>
        </motion.div>
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
  heroSection: {
    backgroundColor: "#141e30",
    textAlign: "center",
    padding: "50px 0",
    marginBottom: "20px",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
    marginBottom: "15px",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#8b949e",
    marginTop: "10px",
  },
  mainContent: {
    margin: "0 auto",
    maxWidth: "1400px",
    padding: "20px",
  },
  section: {
    backgroundColor: "#161b22",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  sectionIcon: {
    fontSize: "2rem",
    marginRight: "15px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  certificationsSection: {
    backgroundColor: "#161b22",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  certificationsTitle: {
    color: "#58a6ff",
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center",
  },
  certIcon: {
    fontSize: "2.5rem",
    marginBottom: "15px",
  },
  contactSection: {
    backgroundColor: "#161b22",
    borderRadius: "10px",
    padding: "20px",
    marginTop: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }
};

export default Resources;