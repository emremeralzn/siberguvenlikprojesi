import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaShieldAlt, FaUserSecret, FaWifi, FaMobile, FaEnvelope } from 'react-icons/fa';

const TipsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tümü', icon: <FaShieldAlt /> },
    { id: 'passwords', name: 'Şifre Güvenliği', icon: <FaLock /> },
    { id: 'privacy', name: 'Gizlilik', icon: <FaUserSecret /> },
    { id: 'network', name: 'Ağ Güvenliği', icon: <FaWifi /> },
    { id: 'mobile', name: 'Mobil Güvenlik', icon: <FaMobile /> },
    { id: 'email', name: 'E-posta Güvenliği', icon: <FaEnvelope /> }
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
      ]
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
      ]
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
      ]
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
        'Güvenilir anti-virüs uygulaması kullanın',
        'Önemli verilerinizi düzenli yedekleyin',
        'Uzaktan silme özelliğini aktifleştirin'
      ]
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
      ]
    },
    {
      category: 'network',
      title: 'Güvenli İnternet Kullanımı',
      description: 'Günlük internet kullanımınızda dikkat etmeniz gereken güvenlik önlemleri.',
      steps: [
        'HTTPS protokolü kullanan siteleri tercih edin',
        'Pop-up reklamları engelleyin',
        'Tarayıcı güvenlik ayarlarını optimize edin',
        'Güvenilir SSL sertifikası olmayan sitelere giriş yapmayın',
        'İndirdiğiniz dosyaları virüs taramasından geçirin',
        'Çerezleri ve tarayıcı geçmişini düzenli temizleyin'
      ]
    },
    {
      category: 'mobile',
      title: 'Mobil Uygulama Güvenliği',
      description: 'Mobil uygulamaların güvenli kullanımı için öneriler.',
      steps: [
        'Uygulamaları kullanmadığınızda arka planda çalışmasını engelleyin',
        'Gereksiz uygulamaları kaldırın',
        'Uygulama içi satın alımları şifre korumalı yapın',
        'Konum izni isteyen uygulamaları sınırlayın',
        'Otomatik uygulama güncellemelerini aktifleştirin',
        'Uygulama yorumlarını ve güvenlik değerlendirmelerini kontrol edin'
      ]
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
    }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  return (
    <div style={styles.container}>
      <div style={styles.slider}>
        <h2 style={styles.sliderTitle}>Siber Güvenlik İpuçları</h2>
        <p style={styles.sliderText}>
          Güvenliğinizi artırmak için en iyi uygulamaları ve ipuçlarını öğrenin
        </p>
      </div>

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
            >
              <h3 style={styles.tipTitle}>{tip.title}</h3>
              <p style={styles.tipDescription}>{tip.description}</p>
              <ul style={styles.stepsList}>
                {tip.steps.map((step, stepIndex) => (
                  <li key={stepIndex} style={styles.step}>
                    {step}
                  </li>
                ))}
              </ul>
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
  },
  categoryIcon: {
    fontSize: '20px',
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
  },
  tipTitle: {
    fontSize: '24px',
    color: '#1e90ff',
    marginBottom: '15px',
  },
  tipDescription: {
    fontSize: '16px',
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  stepsList: {
    listStyle: 'none',
    padding: 0,
  },
  step: {
    padding: '8px 0',
    paddingLeft: '20px',
    position: 'relative',
    fontSize: '14px',
    color: '#ffffff',
    opacity: 0.9,
    '&:before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: '#1e90ff',
    },
  },
};

export default TipsPage; 