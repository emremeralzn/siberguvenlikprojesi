# 🛡️ Siber Güvenlik Simülasyonu Uygulaması

🚀 ASP.NET Core 8.0, React, SQLite ve Entity Framework ile geliştirilen bu uygulama, kullanıcıların sosyal mühendislik saldırılarına karşı farkındalıklarını test etmelerini ve güvenlik bilinç düzeylerini artırmalarını sağlayan interaktif bir simülasyon sistemidir.

---

## 🎯 Proje Amacı

Bu projede kullanıcılar:

- Gerçek dünyadaki saldırılara benzetilmiş **Phishing**, **Baiting**, **Vishing**, **Pretexting** gibi senaryolarda test edilir.
- Her saldırı tipi, özel olarak tasarlanmış interaktif bir sayfa üzerinden sunulur.
- Kullanıcının verdiği cevaplara göre sistem tarafından skor hesaplanır.
- Tüm test adımları detaylı şekilde loglanır ve veri tabanına kaydedilir.
- Test sonunda kullanıcıya hem puanı hem de bilgi verici geri bildirim sunulur.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji               | Açıklama                                         |
|------------------------|--------------------------------------------------|
| 🌐 ASP.NET Core 8.0    | Backend RESTful API                              |
| 🔄 Entity Framework    | ORM ve SQLite veri yönetimi                      |
| ⚛️ React               | Modern kullanıcı arayüzü                         |
| 💾 SQLite              | Gömülü, hafif veritabanı                         |
| 📦 Context API         | React global state yönetimi                      |
| 🧪 Swagger             | API dokümantasyonu ve test arayüzü               |
| 📬 Postman             | API endpoint testleri ve senaryo kontrolleri     |
| 🧱 Onion Architecture  | Katmanlı, sürdürülebilir, temiz mimari yapısı    |
| 🔄 AutoMapper          | Entity ↔ DTO veri dönüşümleri                    |

---

## 🧩 Proje Yapısı

```bash
siber-guvenlik-projesi/
├── CyberApp.API/               # ASP.NET Web API projesi
│   ├── Controllers/
│   ├── Program.cs
│   └── appsettings.json
├── Application/                # Servisler, DTO’lar, Interfaceler
├── Domain/                     # Entity sınıfları
├── Persistence/                # EF Core, DbContext, Migrations
├── Infrastructure/             # Harici servisler (örneğin mail)
├── client-app/                 # React tabanlı frontend uygulaması
│   ├── pages/
│   ├── components/
│   └── context/
