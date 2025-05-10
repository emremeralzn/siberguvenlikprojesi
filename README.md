# 🛡️ Siber Güvenlik Simülasyonu Projesi

🚀 **ASP.NET 8.0**, **React**, **SQLite**, **Entity Framework**, **RESTful API** ile geliştirilen bu proje; kullanıcıların siber saldırı türlerine karşı bilinçlenmesini amaçlayan, interaktif ve test tabanlı bir simülasyon ortamı sunar.

---

## 🎯 Proje Amacı

Bu projede kullanıcılar sisteme giriş yaptıktan sonra;

- Gerçek hayatta karşılaşabilecekleri **Phishing**, **Baiting**, **Vishing**, **Pretexting** gibi sosyal mühendislik saldırı türlerine karşı test edilir.
- Her test interaktif sayfalarda gerçekleştirilir.
- Kullanıcının verdiği cevaplara göre skorlar belirlenir.
- Tüm simülasyon logları veritabanına kayıt edilir.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji                 | Açıklama                           |
| ------------------------- | ---------------------------------- |
| 🌐 **ASP.NET 8.0**        | Backend API yapısı                 |
| 🔄 **Entity Framework**   | ORM ve veri yönetimi               |
| ⚛️ **React**              | Kullanıcı arayüzü                  |
| 💾 **SQLite**             | Hafif ve gömülü veritabanı çözümü  |
| 📦 **Context API**        | Global state management            |
| 📬 **Postman**            | API testleri ve senaryo denemeleri |
| 🧪 **Swagger**            | API dokümantasyonu                 |
| 🧱 **Onion Architecture** | Katmanlı temiz mimari yapısı       |
| 🔄 **AutoMapper**         | DTO ve Entity dönüşümleri          |

---

## 💡 Öne Çıkan Özellikler

- 🧠 **Simülasyon Sayfaları**: Kullanıcılar, farklı saldırı türlerine karşı tepkilerini test edebilir.
- 📊 **Loglama**: Her adım sistemsel olarak kaydedilir.
- 🎯 **Kişisel Farkındalık**: Kullanıcı testleri ile güvenlik farkındalığı kazanır.
- 📱 **Responsive Tasarım**: Mobil uyumlu, kullanıcı dostu ve sade arayüz.
- 🔐 **Giriş Sistemi**: Kullanıcı kimlik doğrulama ve oturum yönetimi.

---

Kurulum
git clone https://github.com/kullaniciAdi/siber-guvenlik-simulasyon.git
cd CyberApp.API
dotnet restore
dotnet run

# ayrı terminalde

cd client-app
npm install
npm start

Swagger arayüzü üzerinden tüm endpoint'leri test edebilirsiniz:

https://localhost:5001/swagger
