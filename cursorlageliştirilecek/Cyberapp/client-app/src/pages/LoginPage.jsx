import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/home');
      } else {
        setError('E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={styles.container}
      >
        <h2 style={styles.title}>Siber Güvenlik Simülasyonu</h2>
        <motion.form
          onSubmit={handleLogin}
          style={styles.form}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <label style={styles.label}>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <label style={styles.label}>Şifre</label>
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.error}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.1, backgroundColor: '#1e90ff' }}
            whileTap={{ scale: 0.95 }}
          >
            Giriş Yap
          </motion.button>
        </motion.form>
        <motion.button
          style={styles.registerButton}
          onClick={() => navigate('/register')}
          whileHover={{ scale: 1.1, backgroundColor: '#1e90ff' }}
          whileTap={{ scale: 0.95 }}
        >
          Kayıt Ol
        </motion.button>
      </motion.div>
    </div>
  );
};

const styles = {
  page: {
    position: 'relative',
    height: '100vh',
    background: `url('https://images.pexels.com/photos/5380665/pexels-photo-5380665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover`,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '20px',
    color: '#ffffff',
  },
  title: {
    color: '#1e90ff',
    marginBottom: '20px',
    fontSize: '32px',
    textShadow: '0 0 12px #1e90ff, 0 0 24px #1e90ff',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  input: {
    marginBottom: '20px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd', // Doğal renkte
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    outline: 'none',
    width: '100%',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-100%)',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#1e90ff',
  },
  error: {
    color: '#ff4d4d',
    marginBottom: '20px',
  },
  button: {
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: 'none',
    color: '#121212',
    backgroundColor: '#1e90ff',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  registerButton: {
    marginTop: '20px',
    padding: '12px',
    fontSize: '18px',
    borderRadius: '8px',
    border: 'none',
    color: '#121212',
    backgroundColor: '#ffa500',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.3s ease',
  },
  verificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 0 30px rgba(30, 144, 255, 0.4)',
    maxWidth: '400px',
    width: '100%',
    position: 'absolute',  // Sağda konumlandırma
    right: '20px',
  },
  link: {
    color: 'lightblue',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
};

export default LoginPage;
