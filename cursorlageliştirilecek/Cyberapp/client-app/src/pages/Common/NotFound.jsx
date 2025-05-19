import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../Components/Navbar';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={styles.container}>
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
            404 - Sayfa Bulunamadı
          </motion.h2>
          <motion.p 
            style={styles.sliderText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Aradığınız sayfa mevcut değil veya taşınmış olabilir
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={styles.content}
        >
          <div style={styles.iconContainer}>
            <FaExclamationTriangle style={styles.icon} />
          </div>

          <div style={styles.buttonContainer}>
            <Link to="/" style={styles.button}>
              <FaHome style={styles.buttonIcon} />
              Ana Sayfaya Dön
            </Link>
            <button onClick={() => window.history.back()} style={styles.button}>
              <FaArrowLeft style={styles.buttonIcon} />
              Geri Dön
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#c9d1d9',
    padding: '20px',
  },
  slider: {
    background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
    padding: '60px 20px',
    textAlign: 'center',
    marginBottom: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  sliderTitle: {
    fontSize: '2.5rem',
    color: '#58a6ff',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  sliderText: {
    fontSize: '1.2rem',
    color: '#8b949e',
    maxWidth: '600px',
    margin: '0 auto',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    background: '#161b22',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  iconContainer: {
    marginBottom: '30px',
  },
  icon: {
    fontSize: '80px',
    color: '#58a6ff',
    filter: 'drop-shadow(0 0 10px rgba(88, 166, 255, 0.5))',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    background: '#238636',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(35, 134, 54, 0.3)',
  },
  buttonIcon: {
    fontSize: '18px',
  },
};

export default NotFound;
