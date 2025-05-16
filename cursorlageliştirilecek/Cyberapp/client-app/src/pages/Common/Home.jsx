import React, { useContext, useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import './styles/Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isPaused, setIsPaused] = useState(false); // Duraklatma durumu
  const images = {
    phishing: "/static/phishingimages.jpg",
    phishing2: "/static/phishing2.png",
    baiting2: "/static/baiting2.png",
    tips: "/static/pretexting.jpg",
    pretexting2: "/static/pretexting2.png",
    vishing: "/static/vishing.jpg",
    vishing2: "/static/vishing2.png",
    slider1: "/static/background1.jpg", // 1. görsel
    slider2: "/static/background2.jpg", // 2. görsel
    slider3: "/static/background3.jpg", // 3. görsel
    slider4: "/static/background4.jpg", // 4. görsel
  };

  const [currentSlide, setCurrentSlide] = useState(0); // Geçerli slide'ı takip et
  const slideImages = [
    images.slider1,
    images.slider2,
    images.slider3,
    images.slider4,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length); // Slide geçişi
    }, 6000); // Her 6 saniyede bir geçiş yap (daha yavaş geçiş)
    return () => clearInterval(interval); // Temizleme
  }, [slideImages.length]);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [answerResult, setAnswerResult] = useState(null); // null, 'dogru', 'yanlis'

  return (
    <div className="container">
      {/* Hero Section - Slider */}
      <div className="slider-container">
        <div className="slider">
          {/* Animasyonlu geçiş */}
          <motion.div
            key={currentSlide}
            className="slide"
            style={{
              backgroundImage: `url(${slideImages[currentSlide]})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }} // Geçiş süresi 2 saniye
          ></motion.div>
        </div>
        <div className="content">
          <h1>Siber Güvenlik Simülasyonu</h1>
          <p>
            Siber güvenlik farkındalığınızı geliştirin ve tehditlere karşı hazırlıklı olun.
          </p>
        </div>
      </div>
      

      {/* Simulation Cards */}
      <div className="simulationSection">
        {/* Phishing Simulator Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          viewport={{ once: false, margin: "-100px" }}
          className="simulationCard"
        >
          <div className="cardContent">
            <img
              src={images.phishing2}
              alt="Phishing Simulator"
              className="cardImage"
            />
            <div className="cardText">
              <h2 className="simulationTitle">Phishing Simulator</h2>
              <p>
                Gerçekçi senaryolarla phishing saldırılarını deneyimleyin ve korunmayı öğrenin.
              </p>
              {user ? (
                <Link to="/simulators/phishing" className="cardButton">
                  Başla
                </Link>
              ) : (
                <p className="warning">Giriş yapmanız gerekiyor.</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Sosyal Mühendislik Simulator Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          viewport={{ once: false, margin: "-100px" }}
          className="simulationCard"
        >
          <div className="cardContent">
            <div className="cardText">
              <h2 className="simulationTitle">Baiting Simulator</h2>
              <p>
              Gerçekçi senaryolarla baiting saldırılarını deneyimleyin ve korunmayı öğrenin.
              </p>
              {user ? (
                <Link to="/simulators/baiting" className="cardButton">
                  Başla
                </Link>
              ) : (
                <p className="warning">Giriş yapmanız gerekiyor.</p>
              )}
            </div>
            <img
              src={images.baiting2}
              alt="Social Engineering"
              className="cardImage"
            />
          </div>
        </motion.div>

        {/* Security Tips Card */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          viewport={{ once: false, margin: "-100px" }}
          className="simulationCard"
        >
          <div className="cardContent">
            <img
              src={images.pretexting2}
              alt="Security Tips"
              className="cardImage"
            />
            <div className="cardText">
              <h2 className="simulationTitle">Pretexting Simulator</h2>
              <p>
                Gerçekçi senaryolarla pretexting saldırılarını deneyimleyin ve korunmayı öğrenin.
              </p>
              {user ? (
                <Link to="/simulators/pretexting" className="cardButton">
                  Başla
                </Link>
              ) : (
                <p className="warning">Giriş yapmanız gerekiyor.</p>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          viewport={{ once: false, margin: "-100px" }}
          className="simulationCard"
        >
          <div className="cardContent">
            <div className="cardText">
              <h2 className="simulationTitle">Vishing Simulator</h2>
              <p>
              Gerçekçi senaryolarla vishing saldırılarını deneyimleyin ve korunmayı öğrenin.
              </p>
              {user ? (
                <Link to="/simulators/vishing" className="cardButton">
                  Başla
                </Link>
              ) : (
                <p className="warning">Giriş yapmanız gerekiyor.</p>
              )}
            </div>
            <img
              src={images.vishing2}
              alt="Social Engineering"
              className="cardImage"
            />
          </div>
        </motion.div>
      </div>

      {/* Chatbot tarzı Günün Sorusu butonu - slider üstünde sağ alt köşe */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          zIndex: 20,
        }}
      >
        <button
          style={{
            background: '#238636',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '28px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s',
          }}
          onClick={() => setShowQuestionModal(true)}
          title="Günün Sorusu"
        >
          ?
        </button>
      </div>

      {/* Günün Sorusu Modal */}
      {showQuestionModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#161b22',
              color: '#c9d1d9',
              borderRadius: '16px',
              padding: '32px 24px',
              minWidth: '340px',
              maxWidth: '90vw',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <h3 style={{marginBottom: '16px'}}>Günün Sorusu</h3>
            <p style={{marginBottom: '12px'}}>Bu soru, siber güvenlik bilginizi test etmek için hazırlanmıştır.</p>
            <p style={{fontWeight: 'bold', marginBottom: '18px'}}>Soru: Phishing saldırılarında genellikle hangi yöntem kullanılır?</p>
            {answerResult === null ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px'}}>
                <button style={{background:'#30363d', color:'white', border:'none', borderRadius:'6px', padding:'10px', fontSize:'16px', cursor:'pointer'}} onClick={() => setAnswerResult('dogru')}>A) E-posta ile sahte bağlantılar</button>
                <button style={{background:'#30363d', color:'white', border:'none', borderRadius:'6px', padding:'10px', fontSize:'16px', cursor:'pointer'}} onClick={() => setAnswerResult('yanlis')}>B) Doğrudan fiziksel saldırı</button>
                <button style={{background:'#30363d', color:'white', border:'none', borderRadius:'6px', padding:'10px', fontSize:'16px', cursor:'pointer'}} onClick={() => setAnswerResult('yanlis')}>C) Sosyal medya reklamları</button>
              </div>
            ) : (
              <div style={{marginBottom: '18px'}}>
                <p style={{fontWeight:'bold', color: answerResult === 'dogru' ? '#238636' : '#f85149'}}>
                  {answerResult === 'dogru' ? 'Tebrikler, doğru cevap!' : 'Yanlış cevap, tekrar deneyebilirsin!'}
                </p>
                {answerResult === 'yanlis' && (
                  <button style={{background:'#30363d', color:'white', border:'none', borderRadius:'6px', padding:'10px 24px', fontSize:'16px', cursor:'pointer', marginTop:'10px', marginRight:'10px'}} onClick={() => setAnswerResult(null)}>Tekrar Dene</button>
                )}
                <button style={{background:'#238636', color:'white', border:'none', borderRadius:'6px', padding:'10px 24px', fontSize:'16px', cursor:'pointer', marginTop:'10px'}} onClick={() => { setShowQuestionModal(false); setAnswerResult(null); }}>Tamam</button>
              </div>
            )}
            <button style={{position:'absolute', top:'12px', right:'16px', background:'none', border:'none', color:'#c9d1d9', fontSize:'22px', cursor:'pointer'}} onClick={() => { setShowQuestionModal(false); setAnswerResult(null); }} title="Kapat">×</button>
          </div>
        </div>
      )}

      {/* Resources and Social Media Sections */}
      <div className="resourcesSection">
        <h3>Kaynaklar</h3>
        <ul className="resourcesList">
          <li><a href="/guide" className="resourcesLink">Güvenlik Rehberi</a></li>
          <li><a href="/blog" className="resourcesLink">Blog</a></li>
        </ul>
      </div>

      <div className="socialMediaSection">
        <button className="socialMediaButton">Facebook</button>
        <button className="socialMediaButton">Twitter</button>
        <button className="socialMediaButton">LinkedIn</button>
      </div>
    </div>
  );
};

export default Home;
