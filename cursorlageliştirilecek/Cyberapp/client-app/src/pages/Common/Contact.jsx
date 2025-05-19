import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:5079/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'pelinsy66@gmail.com'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Gönderme hatası:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          Bize Ulaşın
        </motion.h2>
        <motion.p 
          style={styles.sliderText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Herhangi bir sorunuz, öneriniz veya iş birliği için bize ulaşabilirsiniz.
        </motion.p>
      </motion.div>

      <div style={styles.aboutContent}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} style={styles.form}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label style={styles.label}>Adınız</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Adınızı giriniz"
                style={styles.input}
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label style={styles.label}>E-posta</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresinizi giriniz"
                style={styles.input}
                required
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <label style={styles.label}>Mesajınız</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mesajınızı buraya yazın"
                style={styles.textarea}
                required
              ></textarea>
            </motion.div>
            
            <motion.button 
              type="submit" 
              style={{
                ...styles.button,
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer'
              }}
              disabled={status === 'sending'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaperPlane style={{ marginRight: '8px' }} />
              {status === 'sending' ? 'Gönderiliyor...' : 'Gönder'}
            </motion.button>

            {status === 'success' && (
              <motion.p 
                style={styles.successMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Mesajınız başarıyla gönderildi!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                style={styles.errorMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </motion.p>
            )}
          </form>
        </motion.div>

        <motion.div 
          style={styles.info}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div 
            style={styles.infoCard}
            whileHover={{ scale: 1.05 }}
          >
            <FaEnvelope style={styles.infoIcon} />
            <p><strong>E-posta:</strong> iletisim@cyberapp.com</p>
          </motion.div>
          <motion.div 
            style={styles.infoCard}
            whileHover={{ scale: 1.05 }}
          >
            <FaPhone style={styles.infoIcon} />
            <p><strong>Telefon:</strong> +90 555 555 55 55</p>
          </motion.div>
          <motion.div 
            style={styles.infoCard}
            whileHover={{ scale: 1.05 }}
          >
            <FaMapMarkerAlt style={styles.infoIcon} />
            <p><strong>Adres:</strong> CyberApp Ofisi, İstanbul, Türkiye</p>
          </motion.div>
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
  aboutContent: {
    margin: "0 auto",
    maxWidth: "800px",
    textAlign: "left",
    lineHeight: "1.6",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "rgba(22, 27, 34, 0.8)",
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    marginBottom: '30px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(88, 166, 255, 0.1)',
  },
  label: {
    fontSize: '1.2rem',
    marginBottom: '12px',
    color: '#c9d1d9',
    fontWeight: '500',
  },
  input: {
    padding: '15px',
    marginBottom: '25px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid rgba(88, 166, 255, 0.3)',
    outline: 'none',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
    width: '100%',
    '&:focus': {
      borderColor: '#58a6ff',
      boxShadow: '0 0 0 2px rgba(88, 166, 255, 0.2)',
    },
  },
  textarea: {
    padding: '15px',
    marginBottom: '25px',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid rgba(88, 166, 255, 0.3)',
    outline: 'none',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    resize: 'none',
    height: '180px',
    width: '100%',
    transition: 'all 0.3s ease',
    '&:focus': {
      borderColor: '#58a6ff',
      boxShadow: '0 0 0 2px rgba(88, 166, 255, 0.2)',
    },
  },
  button: {
    padding: '18px 35px',
    fontSize: '1.3rem',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#58a6ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: '#187bcd',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(88, 166, 255, 0.3)',
    },
  },
  info: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },
  infoCard: {
    backgroundColor: 'rgba(22, 27, 34, 0.8)',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(88, 166, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  infoIcon: {
    fontSize: '24px',
    color: '#58a6ff',
    marginBottom: '10px',
  },
  successMessage: {
    color: '#4caf50',
    textAlign: 'center',
    marginTop: '15px',
    padding: '12px',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(76, 175, 80, 0.2)',
  },
  errorMessage: {
    color: '#f44336',
    textAlign: 'center',
    marginTop: '15px',
    padding: '12px',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(244, 67, 54, 0.2)',
  },
};

export default Contact;
