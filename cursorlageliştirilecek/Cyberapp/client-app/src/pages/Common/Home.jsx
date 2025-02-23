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
    socialEngineering: "/static/phishingimages.jpg",
    tips: "/static/phishingimages.jpg",
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
              src={images.phishing}
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
              <h2 className="simulationTitle">Sosyal Mühendislik Simülasyonları</h2>
              <p>
                Sosyal mühendislik saldırılarının farklı türlerini öğrenin ve pratik yapın.
              </p>
              {user ? (
                <Link to="/other" className="cardButton">
                  Keşfet
                </Link>
              ) : (
                <p className="warning">Giriş yapmanız gerekiyor.</p>
              )}
            </div>
            <img
              src={images.socialEngineering}
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
              src={images.tips}
              alt="Security Tips"
              className="cardImage"
            />
            <div className="cardText">
              <h2 className="simulationTitle">Siber Güvenlik İpuçları</h2>
              <p>
                Güvenliğinizi artırmak için en iyi uygulamaları ve ipuçlarını öğrenin.
              </p>
              <Link to="/tips" className="cardButton">
                Öğren
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

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
