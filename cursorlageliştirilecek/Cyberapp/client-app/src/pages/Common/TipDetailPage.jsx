import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const TipDetailPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const documentationContent = {
    'password-security': {
      title: 'Şifre Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Şifre güvenliği, dijital dünyada kimlik doğrulamanın temel taşıdır. Güçlü şifreler oluşturmak ve yönetmek, siber güvenliğin ilk savunma hattıdır.'
        },
        {
          section: 'Güçlü Şifre Oluşturma Kuralları',
          text: '1. Uzunluk: En az 12 karakter kullanın\n2. Karmaşıklık: Büyük/küçük harf, sayı ve özel karakterler içermeli\n3. Benzersizlik: Her hesap için farklı şifre kullanın\n4. Tahmin Edilemezlik: Kişisel bilgilerinizi içermemeli\n5. Düzenli Değişim: 3-6 ayda bir şifrelerinizi değiştirin'
        },
        {
          section: 'Şifre Yönetimi Stratejileri',
          text: '1. Şifre Yöneticisi Kullanımı: LastPass, 1Password gibi güvenilir şifre yöneticileri kullanın\n2. İki Faktörlü Doğrulama: Mümkün olduğunca 2FA kullanın\n3. Şifre Politikaları: Kurumsal ortamlarda güçlü şifre politikaları uygulayın\n4. Şifre Depolama: Şifreleri asla düz metin olarak saklamayın\n5. Şifre Paylaşımı: Şifreleri güvenli kanallar üzerinden paylaşın'
        },
        {
          section: 'Yaygın Şifre Hataları',
          text: '1. Basit Şifreler: "123456", "password" gibi tahmin edilebilir şifreler\n2. Kişisel Bilgiler: Doğum tarihi, evcil hayvan ismi gibi bilgiler\n3. Tekrar Eden Şifreler: Tüm hesaplarda aynı şifreyi kullanmak\n4. Yazılı Şifreler: Şifreleri kağıda yazmak veya dijital notlarda saklamak\n5. Güvenlik Soruları: Tahmin edilebilir güvenlik soruları kullanmak'
        }
      ]
    },
    'privacy-security': {
      title: 'Gizlilik Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Dijital gizlilik, kişisel verilerin korunması ve kontrolü ile ilgilidir. Modern dünyada gizlilik, temel bir insan hakkı ve güvenlik gerekliliğidir.'
        },
        {
          section: 'Temel Gizlilik Önlemleri',
          text: '1. Veri Minimizasyonu: Gereksiz veri toplamaktan kaçının\n2. İzin Yönetimi: Uygulama izinlerini düzenli kontrol edin\n3. Konum Paylaşımı: Gereksiz konum paylaşımından kaçının\n4. Çerez Yönetimi: Tarayıcı çerezlerini düzenli temizleyin\n5. Sosyal Medya Ayarları: Gizlilik ayarlarını sıkılaştırın'
        },
        {
          section: 'Veri Koruma Stratejileri',
          text: '1. Şifreleme: Hassas verileri şifreleyerek saklayın\n2. VPN Kullanımı: İnternet trafiğinizi şifreleyin\n3. Güvenli İletişim: End-to-end şifreli mesajlaşma kullanın\n4. Veri Yedekleme: Düzenli yedekleme yapın\n5. Veri Silme: Kullanılmayan verileri güvenli şekilde silin'
        },
        {
          section: 'Gizlilik Araçları',
          text: '1. Tarayıcı Eklentileri: Privacy Badger, uBlock Origin\n2. Arama Motorları: DuckDuckGo, StartPage\n3. Mesajlaşma: Signal, Telegram\n4. E-posta: ProtonMail, Tutanota\n5. Dosya Paylaşımı: OnionShare, SecureDrop'
        }
      ]
    },
    'network-security': {
      title: 'Ağ Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Ağ güvenliği, bilgisayar ağlarını ve verileri yetkisiz erişim, kötüye kullanım veya değişiklikten korumayı amaçlar.'
        },
        {
          section: 'Temel Ağ Güvenliği Önlemleri',
          text: '1. Güçlü Wi-Fi Şifreleme: WPA3 kullanın\n2. Ağ Bölümlendirme: IoT cihazları için ayrı ağ\n3. Firewall Kullanımı: Hem donanım hem yazılım firewall\n4. MAC Adres Filtreleme: Bilinen cihazlara izin ver\n5. SSID Gizleme: Ağ adını gizleyin'
        },
        {
          section: 'Gelişmiş Ağ Güvenliği',
          text: '1. VPN Kullanımı: Tüm trafiği şifreleyin\n2. IDS/IPS Sistemleri: Saldırı tespit ve önleme\n3. Ağ İzleme: Anormal trafiği tespit edin\n4. Port Yönetimi: Gereksiz portları kapatın\n5. Ağ Segmentasyonu: Kritik sistemleri izole edin'
        },
        {
          section: 'Kablosuz Ağ Güvenliği',
          text: '1. WPA3 Şifreleme: En güncel şifreleme standardı\n2. Misafir Ağı: Ziyaretçiler için ayrı ağ\n3. Sinyal Gücü: Gereksiz yayınımı sınırlayın\n4. Rogue AP Tespiti: Sahte erişim noktalarını tespit edin\n5. WPS Kapatma: WPS özelliğini devre dışı bırakın'
        }
      ]
    },
    'mobile-security': {
      title: 'Mobil Güvenlik Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Mobil cihazlar, modern yaşamın vazgeçilmez parçasıdır ve güvenlikleri kritik öneme sahiptir.'
        },
        {
          section: 'Temel Mobil Güvenlik',
          text: '1. Ekran Kilidi: Güçlü PIN veya biyometrik kimlik\n2. Uygulama İzinleri: Gereksiz izinleri kısıtlayın\n3. Otomatik Güncelleme: Sistem ve uygulamaları güncel tutun\n4. Güvenli İndirme: Sadece resmi mağazalardan indirin\n5. Veri Şifreleme: Cihaz şifrelemeyi aktif edin'
        },
        {
          section: 'Mobil Uygulama Güvenliği',
          text: '1. Uygulama İnceleme: Yorumları ve izinleri kontrol edin\n2. Arka Plan İzlemeleri: Gereksiz izlemeleri engelleyin\n3. Uygulama Güncellemeleri: Düzenli güncelleme yapın\n4. Uygulama İzolasyonu: Hassas verileri izole edin\n5. Uygulama Yedekleme: Verileri düzenli yedekleyin'
        },
        {
          section: 'Mobil Veri Güvenliği',
          text: '1. Veri Yedekleme: Bulut ve yerel yedekleme\n2. Veri Silme: Hassas verileri güvenli silin\n3. Veri Şifreleme: End-to-end şifreleme kullanın\n4. Veri Paylaşımı: Güvenli paylaşım kanalları kullanın\n5. Veri İzleme: Veri kullanımını takip edin'
        }
      ]
    },
    'email-security': {
      title: 'E-posta Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'E-posta, modern iletişimin temel taşıdır ve güvenliği kritik öneme sahiptir.'
        },
        {
          section: 'Temel E-posta Güvenliği',
          text: '1. Güçlü Şifre: Karmaşık ve benzersiz şifreler\n2. İki Faktörlü Doğrulama: 2FA kullanın\n3. Şüpheli E-postalar: Bilinmeyen göndericileri açmayın\n4. Bağlantı Kontrolü: URL\'leri doğrulayın\n5. Ek Kontrolü: Güvenilir ekleri indirin'
        },
        {
          section: 'Gelişmiş E-posta Güvenliği',
          text: '1. PGP/GPG: E-posta şifreleme kullanın\n2. SPF/DKIM/DMARC: E-posta doğrulama protokolleri\n3. E-posta İmzalama: Dijital imza kullanın\n4. E-posta Filtreleme: Spam ve virüs filtreleri\n5. E-posta Arşivleme: Önemli e-postaları arşivleyin'
        },
        {
          section: 'Kurumsal E-posta Güvenliği',
          text: '1. E-posta Politikaları: Güvenlik politikaları oluşturun\n2. E-posta İzleme: Anormal aktiviteleri tespit edin\n3. E-posta Eğitimi: Personel eğitimi verin\n4. E-posta Yedekleme: Düzenli yedekleme yapın\n5. E-posta Raporlama: Güvenlik olaylarını raporlayın'
        }
      ]
    },
    'database-security': {
      title: 'Veritabanı Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Veritabanı güvenliği, modern uygulamaların en kritik bileşenlerinden biridir. Bu dökümantasyon, veritabanı güvenliğinin temel prensiplerini ve en iyi uygulamalarını detaylı bir şekilde açıklamaktadır.'
        },
        {
          section: 'Temel Veritabanı Güvenliği',
          text: '1. Güçlü Kimlik Doğrulama: Karmaşık şifreler ve çok faktörlü doğrulama\n2. Erişim Kontrolü: Rol tabanlı erişim yönetimi\n3. Veri Şifreleme: Hassas verilerin şifrelenmesi\n4. Düzenli Yedekleme: Otomatik yedekleme stratejileri\n5. Log Yönetimi: Tüm işlemlerin kayıt altına alınması'
        },
        {
          section: 'Gelişmiş Veritabanı Güvenliği',
          text: '1. SQL Enjeksiyon Koruması: Parametreli sorgular kullanımı\n2. Veritabanı İzleme: Anormal aktivite tespiti\n3. Veri Maskeleme: Hassas verilerin maskelenmesi\n4. Veritabanı Güvenlik Duvarı: Ağ seviyesinde koruma\n5. Şifreleme Anahtarı Yönetimi: Anahtar rotasyonu ve güvenli depolama'
        },
        {
          section: 'Veritabanı Güvenlik Araçları',
          text: '1. Güvenlik Tarama Araçları: SQLMap, DbProtect\n2. İzleme Araçları: Database Activity Monitoring\n3. Şifreleme Araçları: Transparent Data Encryption\n4. Yedekleme Araçları: Veritabanı yedekleme çözümleri\n5. Güvenlik Duvarı: Veritabanı güvenlik duvarları'
        }
      ]
    },
    'cloud-security': {
      title: 'Bulut Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Bulut güvenliği, modern iş süreçlerinin vazgeçilmez bir parçasıdır. Bu dökümantasyon, bulut güvenliğinin temel prensiplerini ve en iyi uygulamalarını detaylı bir şekilde açıklamaktadır.'
        },
        {
          section: 'Temel Bulut Güvenliği',
          text: '1. Kimlik ve Erişim Yönetimi: IAM politikaları\n2. Veri Şifreleme: Bulut depolama şifreleme\n3. Ağ Güvenliği: VPC ve güvenlik grupları\n4. Uyumluluk: GDPR, HIPAA gibi standartlar\n5. Güvenlik İzleme: CloudTrail ve benzeri araçlar'
        },
        {
          section: 'Gelişmiş Bulut Güvenliği',
          text: '1. Zero Trust Mimarisi: Güven varsayılmaz prensibi\n2. CASB Çözümleri: Cloud Access Security Broker\n3. Bulut Güvenlik Postürü: CSPM araçları\n4. Serverless Güvenlik: Fonksiyon güvenliği\n5. Container Güvenliği: Kubernetes güvenliği'
        },
        {
          section: 'Bulut Güvenlik Araçları',
          text: '1. AWS Security Hub\n2. Azure Security Center\n3. Google Cloud Security Command Center\n4. Cloudflare\n5. Palo Alto Prisma Cloud'
        }
      ]
    },
    'code-security': {
      title: 'Kod Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Güvenli kod yazımı, modern yazılım geliştirmenin temel taşıdır. Bu dökümantasyon, güvenli kod yazımının temel prensiplerini ve en iyi uygulamalarını detaylı bir şekilde açıklamaktadır.'
        },
        {
          section: 'Temel Kod Güvenliği',
          text: '1. Güvenli Kod Yazımı: OWASP standartları\n2. Kod İnceleme: Peer review süreçleri\n3. Statik Kod Analizi: SAST araçları\n4. Bağımlılık Yönetimi: Güvenlik açığı taraması\n5. Güvenli API Tasarımı: API güvenlik prensipleri'
        },
        {
          section: 'Gelişmiş Kod Güvenliği',
          text: '1. DevSecOps: Güvenliği DevOps sürecine entegre etme\n2. Tehdit Modelleme: STRIDE metodolojisi\n3. Güvenlik Testleri: Pentest ve güvenlik testleri\n4. Güvenli Kod Kütüphaneleri: Güvenli kütüphane kullanımı\n5. Güvenlik Kodlama Standartları: CERT, CWE standartları'
        },
        {
          section: 'Kod Güvenlik Araçları',
          text: '1. SonarQube\n2. Fortify\n3. Checkmarx\n4. Veracode\n5. Snyk'
        }
      ]
    },
    'web-security': {
      title: 'Web Güvenliği Detaylı Dökümantasyonu',
      content: [
        {
          section: 'Giriş',
          text: 'Web güvenliği, modern web uygulamalarının hayati bir bileşenidir. Bu dökümantasyon, web güvenliğinin temel prensiplerini ve en iyi uygulamalarını detaylı bir şekilde açıklamaktadır.'
        },
        {
          section: 'Temel Web Güvenliği',
          text: '1. SSL/TLS: Güvenli iletişim protokolleri\n2. XSS Koruması: Cross-Site Scripting önleme\n3. CSRF Koruması: Cross-Site Request Forgery önleme\n4. SQL Enjeksiyon Koruması: Veritabanı güvenliği\n5. Güvenlik Başlıkları: CSP, HSTS gibi başlıklar'
        },
        {
          section: 'Gelişmiş Web Güvenliği',
          text: '1. WAF Kullanımı: Web Application Firewall\n2. DDoS Koruması: Dağıtık hizmet reddi koruması\n3. Bot Yönetimi: Bot trafiği kontrolü\n4. API Güvenliği: API güvenlik önlemleri\n5. Zero-Day Koruması: Bilinmeyen tehditlere karşı koruma'
        },
        {
          section: 'Web Güvenlik Araçları',
          text: '1. OWASP ZAP\n2. Burp Suite\n3. Nikto\n4. Nmap\n5. Metasploit'
        }
      ]
    }
  };

  const currentDoc = documentationContent[category] || {
    title: 'Dökümantasyon Bulunamadı',
    content: [{ section: 'Hata', text: 'İstenen dökümantasyon bulunamadı.' }]
  };

  return (
    <div style={styles.container}>
      <motion.button
        style={styles.backButton}
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowLeft style={styles.backIcon} />
        Geri Dön
      </motion.button>

      <motion.div
        style={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={styles.title}>{currentDoc.title}</h1>
        
        {currentDoc.content.map((section, index) => (
          <motion.div
            key={index}
            style={styles.section}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 style={styles.sectionTitle}>{section.section}</h2>
            <p style={styles.sectionText}>{section.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0d1117",
    color: "#c9d1d9",
    minHeight: "100vh",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '30px',
    fontSize: '16px',
  },
  backIcon: {
    fontSize: '18px',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    color: '#58a6ff',
    marginBottom: '40px',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '30px',
    borderRadius: '10px',
    marginBottom: '30px',
    border: '1px solid rgba(30, 144, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#1e90ff',
    marginBottom: '20px',
  },
  sectionText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#ffffff',
    opacity: 0.9,
    whiteSpace: 'pre-line',
  },
};

export default TipDetailPage; 