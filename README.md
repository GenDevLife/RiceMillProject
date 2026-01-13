# 🌾 RiceMill Management System

<p align="center">
  <img src="assets/images/TechTeam.png" alt="Tech City Logo" width="150">
</p>

<p align="center">
  <strong>ระบบจัดการโรงสีข้าว - Tech City</strong><br>
  ระบบจัดการลูกค้า สั่งซื้อสินค้า บริการสีข้าว และคะแนนสะสม
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.0+-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## 📖 เกี่ยวกับโปรเจค

RiceMill Management System เป็นระบบจัดการโรงสีข้าวที่พัฒนาด้วย PHP และ SQLite สำหรับ:

- 👥 **จัดการสมาชิก** - ลงทะเบียน ค้นหา และจัดเก็บข้อมูลลูกค้า
- 🛒 **สั่งซื้อสินค้า** - รำข้าว, แกลบ, ข้าวท่อน, ข้าวปลาย
- 🔧 **บริการสีข้าว** - สีข้าว, คัด/ฝัดเมล็ดข้าว, อบข้าว
- ⭐ **ระบบคะแนนสะสม** - สะสมแต้มจากการซื้อสินค้า/ใช้บริการ
- 🎁 **โปรโมชั่น** - แลกคะแนนเป็นบริการฟรี
- 🧾 **ใบเสร็จ** - ออกใบเสร็จและพิมพ์ได้
- 📊 **Dashboard** - สถิติยอดขายและข้อมูลสมาชิก

---

## ✨ Features

| Feature                  | รายละเอียด                                        |
| ------------------------ | ------------------------------------------------- |
| 🔐 **Secure Database**   | ใช้ PDO Prepared Statements ป้องกัน SQL Injection |
| 📱 **Responsive Design** | รองรับทุกขนาดหน้าจอ                               |
| 🔍 **AJAX Search**       | ค้นหาสมาชิกแบบ Real-time                          |
| 🖨️ **Print Ready**       | ใบเสร็จพร้อมพิมพ์                                 |
| 📦 **Portable Database** | ใช้ SQLite ไม่ต้องติดตั้ง MySQL                   |
| 🎨 **Modern UI**         | ออกแบบสวยงามด้วย CSS Variables                    |

---

## 🚀 Quick Start

### ความต้องการ

- PHP 8.0 หรือสูงกว่า
- SQLite3 Extension (มาพร้อมกับ PHP)

### การติดตั้ง

1. **Clone repository**

   ```bash
   git clone https://github.com/GenDevLife/RiceMill-Management-System.git
   cd RiceMill-Management-System
   ```

2. **สร้าง Database**

   ```bash
   php database/setup.php
   ```

3. **เริ่ม Server**

   ```bash
   php -S localhost:8080
   ```

4. **เปิด Browser**
   ```
   http://localhost:8080
   ```

---

## 🐳 Docker Deployment

### วิธีรันด้วย Docker

1. **Build และ Start Container**

   ```bash
   docker-compose up -d
   ```

2. **เปิด Browser**

   ```
   http://localhost:8080
   ```

3. **ดู Logs**

   ```bash
   docker-compose logs -f
   ```

4. **หยุด Container**
   ```bash
   docker-compose down
   ```

### Docker Commands ที่มีประโยชน์

| Command                           | Description                |
| --------------------------------- | -------------------------- |
| `docker-compose up -d`            | Start container (detached) |
| `docker-compose down`             | Stop container             |
| `docker-compose logs -f`          | View live logs             |
| `docker-compose restart`          | Restart container          |
| `docker-compose build --no-cache` | Rebuild image              |

### Environment Variables

| Variable             | Default        | Description     |
| -------------------- | -------------- | --------------- |
| `PHP_DISPLAY_ERRORS` | `0`            | Show PHP errors |
| `TZ`                 | `Asia/Bangkok` | Server timezone |

### Database Persistence

ข้อมูล SQLite จะถูกเก็บใน Docker Volume ชื่อ `ricemill_database` เพื่อไม่ให้ข้อมูลหายเมื่อหยุด container

---

## 📁 โครงสร้างโปรเจค

```
RiceMill-Management-System/
├── index.php                 # หน้าหลัก
├── admin/                    # Admin Dashboard
│   └── index.php
├── assets/                   # Static files
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   ├── login.css         # Login page
│   │   └── receipt.css       # Receipt styling
│   └── images/
│       └── TechTeam.png      # Logo
├── database/
│   ├── ricemill.db           # SQLite Database
│   └── setup.php             # Database setup script
├── includes/
│   ├── config.php            # Configuration & helpers
│   ├── Database.php          # Database helper class
│   ├── header.php            # Reusable header
│   └── footer.php            # Reusable footer
├── pages/
│   ├── api/                  # API endpoints
│   │   └── search-members.php
│   ├── auth/                 # Authentication
│   │   ├── login.php
│   │   └── register.php
│   ├── members/              # Member selection
│   │   ├── select-for-service.php
│   │   ├── select-for-product.php
│   │   └── select-for-promotion.php
│   ├── orders/               # Order processing
│   │   ├── service.php
│   │   ├── product.php
│   │   ├── product-only.php
│   │   └── promotion.php
│   ├── receipts/             # Receipt generation
│   │   ├── all.php
│   │   ├── product.php
│   │   ├── service.php
│   │   └── promotion.php
│   ├── summary/              # Order summaries
│   │   ├── all.php
│   │   ├── product.php
│   │   └── service.php
│   └── points.php            # Points leaderboard
└── README.md
```

---

## 🗄️ Database Schema

ระบบใช้ **SQLite** database พร้อม 4 ตารางหลัก:

### `members` - สมาชิก

| Column      | Type         | Description  |
| ----------- | ------------ | ------------ |
| id          | INTEGER      | Primary Key  |
| name        | VARCHAR(100) | ชื่อ-นามสกุล |
| phone       | VARCHAR(20)  | เบอร์โทร     |
| points      | INTEGER      | คะแนนสะสม    |
| address     | VARCHAR(200) | ที่อยู่      |
| subdistrict | VARCHAR(100) | ตำบล         |
| district    | VARCHAR(100) | อำเภอ        |
| province    | VARCHAR(100) | จังหวัด      |
| created_at  | DATE         | วันที่สมัคร  |

### `order_services` - รายการบริการ

### `order_products` - รายการสินค้า

### `promotions` - การแลกโปรโมชั่น

---

## 💰 ราคาและคะแนน

### ราคาบริการ

| บริการ           | ราคา      |
| ---------------- | --------- |
| สีข้าว           | 8 บาท/กก. |
| คัด/ฝัดเมล็ดข้าว | 3 บาท/กก. |
| อบข้าว           | 8 บาท/กก. |

### ราคาสินค้า

| สินค้า   | ราคา       |
| -------- | ---------- |
| รำข้าว   | 8 บาท/กก.  |
| แกลบ     | 8 บาท/กก.  |
| ข้าวท่อน | 7 บาท/กก.  |
| ข้าวปลาย | 14 บาท/กก. |

### ระบบคะแนน

- ได้รับ **1 คะแนน** ต่อทุกๆ 100 บาท
- แลก **500 คะแนน** = สีข้าวฟรี 50 กก.
- แลก **200 คะแนน** = คัด/ฝัดฟรี 50 กก.
- แลก **500 คะแนน** = อบข้าวฟรี 50 กก.

---

## 🔐 Admin Login

เข้าสู่ระบบ Admin Dashboard:

| Field    | Value                                  |
| -------- | -------------------------------------- |
| URL      | `/admin/` หรือ `/pages/auth/login.php` |
| Username | `owner`                                |
| Password | `12345678`                             |

---

## 📸 Screenshots

> _Coming soon_

---

## 🛠️ Tech Stack

- **Backend:** PHP 8.x
- **Database:** SQLite 3
- **Frontend:** HTML5, CSS3, JavaScript
- **Library:** jQuery 3.5.1
- **Font:** Kanit (Google Fonts)

---

## 🤝 Contributing

ยินดีรับ contributions! กรุณา:

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

---

## 📝 License

MIT License - สามารถนำไปใช้งานและพัฒนาต่อได้อย่างอิสระ

---

## 👨‍💻 Author

**Tech City Team**

- GitHub: [@GenDevLife](https://github.com/GenDevLife)

---

<p align="center">
  Made with ❤️ in Phichit, Thailand
</p>
