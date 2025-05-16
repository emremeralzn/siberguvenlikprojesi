import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaShieldAlt, FaUserSecret, FaWifi, FaMobile, FaEnvelope, FaDatabase, FaCloud, FaCode, FaGlobe } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TipsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'Tümü', icon: <FaShieldAlt /> },
    { id: 'passwords', name: 'Şifre Güvenliği', icon: <FaLock /> },
    { id: 'privacy', name: 'Gizlilik', icon: <FaUserSecret /> },
    { id: 'network', name: 'Ağ Güvenliği', icon: <FaWifi /> },
    { id: 'mobile', name: 'Mobil Güvenlik', icon: <FaMobile /> },
    { id: 'email', name: 'E-posta Güvenliği', icon: <FaEnvelope /> },
    { id: 'database', name: 'Veritabanı Güvenliği', icon: <FaDatabase /> },
    { id: 'cloud', name: 'Bulut Güvenliği', icon: <FaCloud /> },
    { id: 'code', name: 'Kod Güvenliği', icon: <FaCode /> },
    { id: 'web', name: 'Web Güvenliği', icon: <FaGlobe /> }
  ];

  const tips = [
    {
      category: 'passwords',
      title: 'Güçlü Şifre Oluşturma',
      description: 'Güçlü şifreler, dijital güvenliğinizin temelidir. Doğru uygulamalarla hesaplarınızı koruyun.',
      steps: [
        'En az 12 karakter uzunluğunda şifreler kullanın',
        'Büyük/küçük harf, sayı ve özel karakterler ekleyin',
        'Her hesap için benzersiz şifreler oluşturun',
        'Şifre yöneticisi kullanarak şifrelerinizi güvenle saklayın',
        'İki faktörlü doğrulamayı tüm hesaplarınızda aktifleştirin',
        'Şifrelerinizi 3-6 ayda bir düzenli olarak değiştirin'
      ],
      documentationUrl: '/documentation/password-security'
    },
    {
      category: 'passwords',
      title: 'Şifre Yönetimi Stratejileri',
      description: 'Şifrelerinizi güvenli bir şekilde yönetmek için etkili stratejiler ve araçlar.',
      steps: [
        'Şifre yöneticisi kullanarak tüm şifrelerinizi güvenle saklayın',
        'İki faktörlü doğrulama (2FA) kullanın',
        'Şifrelerinizi düzenli olarak değiştirin',
        'Şifrelerinizi asla paylaşmayın',
        'Güvenlik sorularınızı güçlü tutun',
        'Şifrelerinizi yazılı olarak saklamayın'
      ],
      documentationUrl: '/documentation/password-security'
    },
    {
      category: 'passwords',
      title: 'Şifre Güvenliği En İyi Uygulamaları',
      description: 'Şifre güvenliği için endüstri standartları ve en iyi uygulamalar.',
      steps: [
        'Her hesap için benzersiz şifreler kullanın',
        'Şifrelerinizi düzenli olarak değiştirin',
        'Şifre yöneticisi kullanın',
        'İki faktörlü doğrulama kullanın',
        'Güvenlik sorularınızı güçlü tutun',
        'Şifrelerinizi asla paylaşmayın'
      ],
      documentationUrl: '/documentation/password-security'
    },
    {
      category: 'privacy',
      title: 'Kişisel Gizlilik Koruması',
      description: 'Dijital dünyada kişisel bilgilerinizi korumak için alınması gereken temel önlemler.',
      steps: [
        'Sosyal medya gizlilik ayarlarınızı düzenli kontrol edin',
        'Gereksiz kişisel bilgi paylaşımından kaçının',
        'Konum paylaşımını sadece gerektiğinde aktifleştirin',
        'Çevrimiçi profil bilgilerinizi minimum düzeyde tutun',
        'Tanımadığınız kişilerden gelen arkadaşlık isteklerini kabul etmeyin',
        'Üçüncü taraf uygulama izinlerini sınırlayın'
      ],
      documentationUrl: '/documentation/privacy-security'
    },
    {
      category: 'network',
      title: 'Ağ Güvenliği',
      description: 'İnternet bağlantınızı ve ağ güvenliğinizi en üst düzeyde tutmak için önemli adımlar.',
      steps: [
        'Güçlü şifreli Wi-Fi ağları kullanın (WPA3 tercih edin)',
        'VPN kullanarak internet trafiğinizi şifreleyin',
        'Güvenilmeyen Wi-Fi ağlarında online bankacılık yapmayın',
        'Router firmware\'inizi güncel tutun',
        'Misafir ağı oluşturarak ana ağınızı koruyun',
        'Firewall ayarlarınızı düzenli kontrol edin',
        'IoT cihazlarınız için ayrı bir ağ segmenti oluşturun'
      ],
      documentationUrl: '/documentation/network-security'
    },
    {
      category: 'mobile',
      title: 'Mobil Cihaz Güvenliği',
      description: 'Akıllı telefonunuz ve tabletiniz için kritik güvenlik önlemleri.',
      steps: [
        'Ekran kilidi ve biyometrik güvenlik kullanın',
        'Cihaz yazılımını ve uygulamaları güncel tutun',
        'Sadece resmi uygulama mağazalarından indirme yapın',
        'Uygulama izinlerini düzenli kontrol edin',
        'Cihaz şifrelemeyi aktifleştirin',
        'Güvenilir anti-virüs uygulaması kullanın'
      ],
      documentationUrl: '/documentation/mobile-security'
    },
    {
      category: 'mobile',
      title: 'Mobil Uygulama Güvenliği',
      description: 'Mobil uygulamaların güvenli kullanımı için önemli ipuçları.',
      steps: [
        'Uygulamaları sadece resmi mağazalardan indirin',
        'Uygulama izinlerini düzenli kontrol edin',
        'Uygulamaları güncel tutun',
        'Gereksiz uygulamaları kaldırın',
        'Uygulama verilerini düzenli yedekleyin',
        'Uygulama içi satın alımları şifre korumalı yapın'
      ],
      documentationUrl: '/documentation/mobile-security'
    },
    {
      category: 'mobile',
      title: 'Mobil Veri Güvenliği',
      description: 'Mobil cihazlarda veri güvenliği için temel önlemler.',
      steps: [
        'Verilerinizi düzenli yedekleyin',
        'Hassas verileri şifreleyin',
        'Veri paylaşımını sınırlayın',
        'Veri silme özelliğini aktif edin',
        'Veri izleme araçlarını kullanın',
        'Veri yedekleme stratejileri oluşturun'
      ],
      documentationUrl: '/documentation/mobile-security'
    },
    {
      category: 'mobile',
      title: 'Mobil Ağ Güvenliği',
      description: 'Mobil cihazlarda ağ güvenliği için önemli adımlar.',
      steps: [
        'Güvenli Wi-Fi ağlarını kullanın',
        'VPN kullanarak internet trafiğinizi şifreleyin',
        'Otomatik Wi-Fi bağlantılarını kapatın',
        'Ağ güvenlik ayarlarını kontrol edin',
        'Güvenilmeyen ağlarda hassas işlem yapmayın',
        'Ağ izleme araçlarını kullanın'
      ],
      documentationUrl: '/documentation/mobile-security'
    },
    {
      category: 'email',
      title: 'E-posta Güvenliği',
      description: 'E-posta iletişiminizi güvende tutmak için temel güvenlik uygulamaları.',
      steps: [
        'Şüpheli e-postaları açmadan silin',
        'Bilinmeyen kaynaklardan gelen ekleri indirmeyin',
        'E-posta adresinizi herkese açık platformlarda paylaşmayın',
        'Spam filtrenizi aktif tutun',
        'İş ve kişisel e-postalarınızı ayırın',
        'E-posta şifrenizi düzenli değiştirin',
        'Phishing e-postalarına karşı dikkatli olun',
        'E-posta imzalama ve şifreleme kullanın'
      ],
      documentationUrl: '/documentation/email-security'
    },
    {
      category: 'email',
      title: 'İş E-posta Güvenliği',
      description: 'Kurumsal e-posta güvenliği için özel önlemler.',
      steps: [
        'Kurumsal VPN üzerinden e-posta erişimi sağlayın',
        'Hassas bilgileri şifreleyerek gönderin',
        'E-posta imzalama sertifikası kullanın',
        'Toplu e-postalarda BCC kullanın',
        'Otomatik e-posta yönlendirmelerini kapatın',
        'Şirket verilerini kişisel e-postaya iletmeyin'
      ]
    },
    {
      category: 'database',
      title: 'Veritabanı Güvenliği Temelleri',
      description: 'Veritabanı güvenliği için temel prensipler ve uygulamalar.',
      steps: [
        'Güçlü kimlik doğrulama kullanın',
        'Erişim kontrollerini sıkılaştırın',
        'Verileri şifreleyerek saklayın',
        'Düzenli yedekleme yapın',
        'Log yönetimini aktif edin',
        'Güvenlik duvarı kullanın'
      ],
      documentationUrl: '/documentation/database-security'
    },
    {
      category: 'database',
      title: 'SQL Enjeksiyon Koruması',
      description: 'SQL enjeksiyon saldırılarına karşı korunma yöntemleri.',
      steps: [
        'Parametreli sorgular kullanın',
        'Input validasyonu yapın',
        'Hata mesajlarını gizleyin',
        'Minimum yetki prensibini uygulayın',
        'Stored procedure kullanın',
        'ORM araçlarını tercih edin'
      ],
      documentationUrl: '/documentation/database-security'
    },
    {
      category: 'cloud',
      title: 'Bulut Güvenliği Temelleri',
      description: 'Bulut ortamında güvenlik için temel prensipler.',
      steps: [
        'IAM politikalarını sıkılaştırın',
        'Veri şifreleme kullanın',
        'Ağ güvenliğini sağlayın',
        'Uyumluluk standartlarını takip edin',
        'Güvenlik izleme yapın',
        'Düzenli güvenlik denetimi yapın'
      ],
      documentationUrl: '/documentation/cloud-security'
    },
    {
      category: 'cloud',
      title: 'Bulut Veri Güvenliği',
      description: 'Bulut ortamında veri güvenliği için önemli adımlar.',
      steps: [
        'Veri sınıflandırması yapın',
        'Şifreleme kullanın',
        'Erişim kontrollerini sıkılaştırın',
        'Veri yedekleme stratejileri oluşturun',
        'Veri silme politikaları belirleyin',
        'Veri izleme araçlarını kullanın'
      ],
      documentationUrl: '/documentation/cloud-security'
    },
    {
      category: 'code',
      title: 'Güvenli Kod Yazımı',
      description: 'Güvenli kod yazımı için temel prensipler ve uygulamalar.',
      steps: [
        'OWASP standartlarına uyun',
        'Kod inceleme süreçleri uygulayın',
        'Güvenlik testleri yapın',
        'Bağımlılıkları güncel tutun',
        'Hata yönetimi stratejileri geliştirin',
        'Güvenli kütüphaneler kullanın'
      ],
      documentationUrl: '/documentation/code-security'
    },
    {
      category: 'code',
      title: 'DevSecOps Uygulamaları',
      description: 'Güvenliği DevOps sürecine entegre etme yöntemleri.',
      steps: [
        'CI/CD pipeline\'a güvenlik entegre edin',
        'Otomatik güvenlik testleri yapın',
        'Güvenlik taramalarını otomatize edin',
        'Güvenlik izleme araçları kullanın',
        'Güvenlik raporlama sistemleri kurun',
        'Güvenlik eğitimleri verin'
      ],
      documentationUrl: '/documentation/code-security'
    },
    {
      category: 'web',
      title: 'Web Uygulama Güvenliği',
      description: 'Web uygulamaları için temel güvenlik önlemleri.',
      steps: [
        'SSL/TLS sertifikaları kullanın',
        'XSS ve CSRF koruması sağlayın',
        'Güvenli oturum yönetimi uygulayın',
        'Güvenlik başlıklarını yapılandırın',
        'Düzenli güvenlik taramaları yapın',
        'WAF kullanın'
      ],
      documentationUrl: '/documentation/web-security'
    },
    {
      category: 'web',
      title: 'Web Sunucu Güvenliği',
      description: 'Web sunucuları için güvenlik önlemleri ve en iyi uygulamalar.',
      steps: [
        'Güvenlik duvarı yapılandırın',
        'Düzenli güncelleme yapın',
        'Gereksiz servisleri kapatın',
        'Log yönetimini aktif edin',
        'DDoS koruması kullanın',
        'Güvenlik izleme yapın'
      ],
      documentationUrl: '/documentation/web-security'
    }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const handleTipClick = (documentationUrl) => {
    navigate(documentationUrl);
  };

  const categoryImages = {
    passwords: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
    privacy: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    network: 'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',
    mobile: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
    email: 'https://cdn-icons-png.flaticon.com/512/561/561127.png',
    database: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
    cloud: 'https://cdn-icons-png.flaticon.com/512/4144/4144396.png',
    code: 'https://cdn-icons-png.flaticon.com/512/2721/2721290.png',
    web: 'https://cdn-icons-png.flaticon.com/512/2721/2721298.png',
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
          Siber Güvenlik Dökümantasyonu
        </motion.h2>
        <motion.p 
          style={styles.sliderText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Güvenliğinizi artırmak için en iyi uygulamaları ve dökümantasyonları öğrenin
        </motion.p>
      </motion.div>

      {/* Kategori Seçimi */}
      <div style={styles.content}>
        <div style={styles.categories}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                ...styles.categoryButton,
                backgroundColor: selectedCategory === category.id ? '#1e90ff' : 'transparent',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={styles.categoryIcon}>{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* İpuçları Listesi */}
        <div style={styles.tipsGrid}>
          {filteredTips.map((tip, index) => (
            <motion.div
              key={index}
              style={styles.tipCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleTipClick(tip.documentationUrl)}
            >
              <img
                src={categoryImages[tip.category]}
                alt="Kategori görseli"
                style={styles.cardImage}
              />
              <h3 style={styles.tipTitle}>{tip.title}</h3>
              <p style={styles.tipDescription}>{tip.description}</p>
              <ul style={styles.stepsList}>
                {tip.steps.map((step, stepIndex) => (
                  <li key={stepIndex} style={styles.step}>
                    {step}
                  </li>
                ))}
              </ul>
              <button
                style={styles.detailButton}
                onClick={e => { e.stopPropagation(); handleTipClick(tip.documentationUrl); }}
              >
                Detayı Gör
              </button>
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
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "20px",
  },
  categories: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
  },
  categoryButton: {
    padding: '12px 24px',
    border: '2px solid #1e90ff',
    borderRadius: '30px',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    background: 'rgba(30, 144, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    '&:hover': {
      background: 'rgba(30, 144, 255, 0.2)',
      transform: 'translateY(-2px)',
    },
  },
  categoryIcon: {
    fontSize: '20px',
    color: '#1e90ff',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    padding: '20px',
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(30, 144, 255, 0.2)',
    position: 'relative',
    paddingBottom: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 30px rgba(30, 144, 255, 0.2)',
      border: '1px solid rgba(30, 144, 255, 0.4)',
    },
  },
  cardImage: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    marginBottom: '15px',
    marginTop: '5px',
    filter: 'drop-shadow(0 0 10px rgba(30, 144, 255, 0.3))',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  tipTitle: {
    fontSize: '24px',
    color: '#1e90ff',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  tipDescription: {
    fontSize: '16px',
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: '20px',
    lineHeight: '1.6',
    textAlign: 'center',
  },
  stepsList: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
  },
  step: {
    padding: '8px 0',
    paddingLeft: '20px',
    position: 'relative',
    fontSize: '14px',
    color: '#ffffff',
    opacity: 0.9,
    transition: 'all 0.3s ease',
    '&:hover': {
      opacity: 1,
      transform: 'translateX(5px)',
    },
    '&:before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: '#1e90ff',
    },
  },
  detailButton: {
    position: 'absolute',
    right: '20px',
    bottom: '20px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 22px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(30,144,255,0.15)',
    transition: 'all 0.3s ease',
    zIndex: 2,
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#187bcd',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(30,144,255,0.3)',
    },
  },
};

export default TipsPage; 