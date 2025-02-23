import React from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './styles/Resources.css';

const Other = () => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const resources = [
    {
      title: "Resmi Kurumlar ve Kaynaklar",
      items: [
        {
          name: "USOM - Ulusal Siber Olaylara Müdahale Merkezi",
          description: "Türkiye'nin siber güvenlik merkezi ve zararlı bağlantı ihbar platformu",
          link: "https://www.usom.gov.tr"
        },
        {
          name: "BTK - Bilgi Teknolojileri ve İletişim Kurumu",
          description: "Güvenli internet ve teknoloji kullanımı hakkında bilgiler",
          link: "https://www.btk.gov.tr"
        },
        {
          name: "KVKK - Kişisel Verileri Koruma Kurumu",
          description: "Kişisel verilerin korunması hakkında rehberler ve düzenlemeler",
          link: "https://www.kvkk.gov.tr"
        }
      ]
    },
    {
      title: "Siber Güvenlik Eğitim Platformları",
      items: [
        {
          name: "TryHackMe",
          description: "Uygulamalı siber güvenlik eğitimleri ve CTF platformu",
          link: "https://tryhackme.com"
        },
        {
          name: "HackTheBox",
          description: "Gelişmiş siber güvenlik laboratuvarı ve eğitim platformu",
          link: "https://www.hackthebox.com"
        },
        {
          name: "Siber Vatan",
          description: "Türkiye'nin milli siber güvenlik eğitim platformu",
          link: "https://www.sibervatan.com"
        }
      ]
    },
    {
      title: "Güvenlik Araçları",
      items: [
        {
          name: "VirusTotal",
          description: "Dosya ve URL'leri birçok antivirüs motoruyla tarayan online platform",
          link: "https://www.virustotal.com"
        },
        {
          name: "Have I Been Pwned",
          description: "E-posta adresinizin veri ihlallerine karışıp karışmadığını kontrol edin",
          link: "https://haveibeenpwned.com"
        },
        {
          name: "Shodan",
          description: "İnternet bağlantılı cihazları tarayan güvenlik arama motoru",
          link: "https://www.shodan.io"
        }
      ]
    },
    {
      title: "Güncel Tehdit İstihbaratı",
      items: [
        {
          name: "SANS Internet Storm Center",
          description: "Güncel siber tehdit ve saldırı bilgileri",
          link: "https://isc.sans.edu"
        },
        {
          name: "ExploitDB",
          description: "Güvenlik açıkları ve exploit veritabanı",
          link: "https://www.exploit-db.com"
        },
        {
          name: "CVE Details",
          description: "Bilinen güvenlik zafiyetleri veritabanı",
          link: "https://www.cvedetails.com"
        }
      ]
    },
    {
      title: "Siber Güvenlik Toplulukları",
      items: [
        {
          name: "OWASP Türkiye",
          description: "Web uygulama güvenliği topluluğu",
          link: "https://owasp.org/www-chapter-turkey/"
        },
        {
          name: "Siber Güvenlik Türkiye",
          description: "Türkiye'nin en büyük siber güvenlik forumu",
          link: "https://www.siberguvenlik.org.tr"
        },
        {
          name: "BGA - Bilgi Güvenliği Akademisi",
          description: "Siber güvenlik eğitimleri ve sertifikasyon programları",
          link: "https://www.bga.com.tr"
        }
      ]
    }
  ];

  const certifications = [
    {
      name: "CompTIA Security+",
      description: "Temel siber güvenlik sertifikası",
      link: "https://www.comptia.org/certifications/security"
    },
    {
      name: "CEH - Certified Ethical Hacker",
      description: "Etik hacker sertifikası",
      link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"
    },
    {
      name: "CISSP",
      description: "Profesyonel bilgi güvenliği sertifikası",
      link: "https://www.isc2.org/Certifications/CISSP"
    }
  ];

  return (
    <div style={styles.container}>
      {/* Slider/Banner */}
      <div style={styles.slider}>
        <h1 style={styles.sliderTitle}>Kaynaklar</h1>
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={styles.sliderText}
        >
          Siber güvenlik dünyasında kendinizi geliştirin!
        </motion.div>
      </div>

      <div style={styles.mainContent}>
        <div className="resources-grid">
          {resources.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="resource-section"
            >
              <h2 className="section-title">{section.title}</h2>
              <div className="items-container">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ scale: 1.02 }}
                    className="resource-item"
                  >
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                      Ziyaret Et →
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="certifications-section"
        >
          <h2>Önerilen Sertifikalar</h2>
          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="certification-item"
              >
                <h3>{cert.name}</h3>
                <p>{cert.description}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                  Detaylı Bilgi →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="contact-section">
          <h2>İletişim</h2>
          <p>Sorularınız ve önerileriniz için bize ulaşın:</p>
          <a href="mailto:contact@cyberapp.com" className="contact-link">
            contact@cyberapp.com
          </a>
        </div>
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
  mainContent: {
    margin: "0 auto",
    maxWidth: "1400px",
    padding: "20px",
  }
};

export default Other;