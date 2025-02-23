import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    {
      name: "Emre Meral",
      role: "Backend Developer",
      description: "Projede API tasarımı ve veritabanı yönetiminde sorumlu.",
      image: "static/emre_meral.jpeg", // Resim dosyasını public klasörüne ekleyin.
    },
    {
      name: "Mustafa Enes Aksoy",
      role: "Frontend Developer",
      description: "Kullanıcı arayüzü tasarımı ve kullanıcı deneyimi geliştirme sorumlusu.",
      image: "static/mustafa_enes_aksoy.jpeg",
    },
    {
      name: "Serhat Eren Atalay",
      role: "Full Stack Developer",
      description: "Hem frontend hem backend görevlerinde yer aldı.",
      image: "static/serhat_eren_atalay.png",
    },
    {
      name: "Yusuf Taha Altun",
      role: "Test Mühendisi",
      description: "Gerekli testleri yapmasına katkı sağladı.",
      image: "static/yusuf_taha_altun.png",
    },
    {
      name: "Merve Yıldırım",
      role: "Danışman Hocamız",
      description: "Projenin akademik danışmanı ve rehberidir.",
      image: "static/merve_yildirim.jpeg",
    },
    
  ];

  return (
    <div style={styles.container}>
      {/* Slider */}
      <div style={styles.slider}>
        <h1 style={styles.sliderTitle}>Hakkımızda</h1>
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={styles.sliderText}
        >
          Siber güvenlik farkındalığı yaratıyoruz!
        </motion.div>
      </div>

      {/* About Section */}
      <div style={styles.aboutContent}>
        <h2>Biz Kimiz?</h2>
        <p>
          Bu proje, sosyal mühendislik saldırılarına karşı farkındalık kazandırmak ve siber güvenlik bilincini artırmak
          amacıyla geliştirilmiştir. Takımımız aşağıdaki kişilerden oluşmaktadır.
        </p>

        {/* Team Cards */}
        <div style={styles.cardContainer}>
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={styles.card}
            >
              <img src={member.image} alt={member.name} style={styles.cardImage} />
              <h3 style={styles.cardName}>{member.name}</h3>
              <p style={styles.cardRole}>{member.role}</p>
              <p style={styles.cardDescription}>{member.description}</p>
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
  aboutContent: {
    margin: "0 auto",
    maxWidth: "800px",
    textAlign: "left",
    lineHeight: "1.6",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    justifyContent: "center", // Hocanın kartını ortalamak için eklendii
  },
  card: {
    backgroundColor: "#161b22",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  cardName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#58a6ff",
  },
  cardRole: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    color: "#8b949e",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#c9d1d9",
  },
};

export default About;
