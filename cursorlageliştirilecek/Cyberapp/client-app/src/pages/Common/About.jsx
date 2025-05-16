import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    {
      name: "Emre Meral",
      role: "Backend Developer",
      description: "Projede API tasarımı ve veritabanı yönetiminde sorumlu.",
      image: "static/emre_mereal.jpg",
      skills: ["MSSQL", "ASP.NET", "Clean Code"],
      color: "#1E90FF"
    },
    {
      name: "Mustafa Enes Aksoy",
      role: "Frontend Developer",
      description: "Kullanıcı arayüzü tasarımı ve kullanıcı deneyimi geliştirme sorumlusu.",
      image: "static/mustafa_enes_aksoy.jpeg",
      skills: ["React", "JavaScript", "CSS"],
      color: "#FF6B6B"
    },
    {
      name: "Serhat Eren Atalay",
      role: "Full Stack Developer",
      description: "Hem frontend hem backend görevlerinde yer aldı.",
      image: "static/serhat_eren_atalay.png",
      skills: ["React", "Node.js", "MongoDB"],
      color: "#4CAF50"
    },
    {
      name: "Yusuf Taha Altun",
      role: "Test Mühendisi",
      description: "Gerekli testleri yapmasına katkı sağladı.",
      image: "static/yusuf_taha_altun.png",
      skills: ["Testing", "QA", "Automation"],
      color: "#9C27B0"
    },
    {
      name: "Merve Yıldırım",
      role: "Danışman Hocamız",
      description: "Projenin akademik danışmanı ve rehberidir.",
      image: "static/merve_yildirim.jpeg",
      skills: ["Akademik Danışmanlık", "Siber Güvenlik", "Eğitim"],
      color: "#FF9800"
    },
    {
      name: "Mehmet Said Nur Yağmahan",
      role: "Danışman Hocamız",
      description: "Projenin akademik danışmanı ve rehberidir.",
      image: "static/saidhoca.jpeg",
      skills: ["Akademik Danışmanlık", "Siber Güvenlik", "Eğitim"],
      color: "#E91E63"
    },
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
          Hakkımızda
        </motion.h1>
        <motion.p 
          style={styles.heroSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Siber güvenlik farkındalığı yaratıyoruz!
        </motion.p>
      </motion.div>

      {/* About Section */}
      <div style={styles.aboutContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 style={styles.sectionTitle}>Biz Kimiz?</h2>
          <p style={styles.sectionText}>
            Bu proje, sosyal mühendislik saldırılarına karşı farkındalık kazandırmak ve siber güvenlik bilincini artırmak
            amacıyla geliştirilmiştir. Takımımız aşağıdaki kişilerden oluşmaktadır.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div style={styles.cardContainer}>
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
              }}
              style={{
                ...styles.card,
                borderLeft: `4px solid ${member.color}`
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img src={member.image} alt={member.name} style={styles.cardImage} />
              </motion.div>
              <h3 style={{ ...styles.cardName, color: member.color }}>{member.name}</h3>
              <p style={styles.cardRole}>{member.role}</p>
              <p style={styles.cardDescription}>{member.description}</p>
              <div style={styles.skillsContainer}>
                {member.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    style={styles.skillTag}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
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
    maxWidth: "600px",
    margin: "0 auto",
  },
  aboutContent: {
    margin: "0 auto",
    maxWidth: "1200px",
    textAlign: "left",
    lineHeight: "1.6",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#58a6ff",
    marginBottom: "20px",
    textAlign: "center",
  },
  sectionText: {
    fontSize: "1.1rem",
    color: "#8b949e",
    marginBottom: "40px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto 40px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginTop: "20px",
    padding: "20px",
  },
  card: {
    backgroundColor: "#161b22",
    borderRadius: "12px",
    padding: "25px",
    textAlign: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardImage: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "4px solid #1e1e1e",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  cardName: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardRole: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    color: "#8b949e",
    marginBottom: "15px",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "#c9d1d9",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    marginTop: "auto",
  },
  skillTag: {
    backgroundColor: "#1e1e1e",
    color: "#58a6ff",
    padding: "5px 12px",
    borderRadius: "15px",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  }
};

export default About;
