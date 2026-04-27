# 🌾 RiceMill Management System

<p align="center">
  <img src="public/images/TechTeam.png" alt="Tech City Logo" width="150">
</p>

<p align="center">
  <strong>ระบบจัดการโรงสีข้าว - Tech City</strong><br>
  ระบบจัดการลูกค้า สั่งซื้อสินค้า บริการสีข้าว และคะแนนสะสม
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## 📖 เกี่ยวกับโปรเจค

RiceMill Management System เป็นระบบจัดการโรงสีข้าวที่พัฒนาขึ้นใหม่ด้วย **React (Vite) + Node.js (Express) + SQLite** (อัปเกรดจากเวอร์ชัน PHP เดิม) สำหรับ:

- 👥 **จัดการสมาชิก** - ลงทะเบียน ค้นหา และจัดเก็บข้อมูลลูกค้า
- 🛒 **สั่งซื้อสินค้า** - รำข้าว, แกลบ, ข้าวท่อน, ข้าวปลาย
- 🔧 **บริการสีข้าว** - สีข้าว, คัด/ฝัดเมล็ดข้าว, อบข้าว
- ⭐ **ระบบคะแนนสะสม** - สะสมแต้มจากการซื้อสินค้า/ใช้บริการ
- 🎁 **โปรโมชั่น** - แลกคะแนนเป็นบริการฟรี
- 🧾 **ใบเสร็จ** - ออกใบเสร็จและพิมพ์ได้
- 📊 **Dashboard** - สถิติยอดขายและข้อมูลสมาชิกแบบภาพรวม

---

## ✨ Features

| Feature                  | รายละเอียด                                        |
| ------------------------ | ------------------------------------------------- |
| ⚡ **SPA Architecture**    | Single Page Application โหลดเร็ว ไม่ต้องรีเฟรชหน้า |
| 📱 **Responsive Design** | รองรับการทำงานทุกขนาดหน้าจอ (มือถือ, แท็บเล็ต, PC)  |
| 🔍 **Real-time Search**  | ค้นหาสมาชิกทันทีที่พิมพ์ (Debounce search)        |
| 🖨️ **Print Ready**       | ระบบใบเสร็จที่ออกแบบมารองรับการพิมพ์โดยเฉพาะ       |
| 📦 **Portable Database** | ใช้ SQLite (ผ่าน better-sqlite3) ไม่ต้องตั้งค่าฐานข้อมูลให้ยุ่งยาก |
| 🛡️ **Protected Routes**  | มีระบบป้องกันการเข้าถึงหน้า Admin Dashboard        |

---

## 🚀 Quick Start

### ความต้องการ

- [Node.js](https://nodejs.org/) (เวอร์ชัน 18 หรือสูงกว่า)

### การติดตั้งและการใช้งาน

1. **Clone repository**

   ```bash
   git clone https://github.com/GenDevLife/RiceMill-Management-System.git
   cd RiceMill-Management-System
   ```

2. **ติดตั้ง Dependencies**

   ```bash
   npm install
   ```

3. **เริ่ม Server (ทั้ง Frontend และ Backend)**

   ```bash
   npm run dev
   ```

   คำสั่งนี้จะเริ่มต้นการทำงานของ:
   - **Backend API:** `http://localhost:3001`
   - **Frontend React:** `http://localhost:5173`

4. **เปิด Browser**
   ไปที่ `http://localhost:5173`

---

## 📁 โครงสร้างโปรเจค

```
RiceMill-Management-System/
├── src/                      # React Frontend Source Code
│   ├── components/           # Reusable UI Components
│   ├── pages/                # Application Pages (Home, Login, Orders, Receipts)
│   ├── App.jsx               # React Router Configuration
│   ├── config.js             # Configuration, Pricing, and Utility Functions
│   ├── index.css             # Global Styles
│   └── main.jsx              # React Entry Point
├── server/                   # Node.js Express Backend
│   ├── index.js              # Express API Server endpoints
│   └── database.js           # SQLite Database wrapper (better-sqlite3)
├── database/                 # Database storage
│   └── ricemill.db           # SQLite database file
├── public/                   # Static assets
│   └── images/               # Logos and images
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite bundler configuration (includes API proxy)
```

---

## 🗄️ Database Schema

ระบบใช้ **SQLite** database พร้อม 4 ตารางหลัก:

1. `members` - จัดเก็บข้อมูลและคะแนนสะสมของสมาชิก
2. `order_services` - จัดเก็บประวัติการใช้บริการ (สีข้าว, คัดข้าว, อบข้าว)
3. `order_products` - จัดเก็บประวัติการซื้อสินค้า (รำ, แกลบ, ข้าวท่อน, ข้าวปลาย)
4. `promotions` - จัดเก็บประวัติการแลกโปรโมชั่นด้วยคะแนนสะสม

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

- ได้รับ **1 คะแนน** ต่อทุกๆ 100 บาท (ยอดสั่งซื้อ/ใช้บริการ)
- แลก **500 คะแนน** = สีข้าวฟรี 50 กก.
- แลก **200 คะแนน** = คัด/ฝัดฟรี 50 กก.
- แลก **500 คะแนน** = อบข้าวฟรี 50 กก.

---

## 🔐 Admin Login

สำหรับการเข้าสู่ระบบ Admin Dashboard เพื่อดูสถิติรายวันและรายเดือน:

| Field    | Value                                  |
| -------- | -------------------------------------- |
| URL      | `/login`                               |
| Username | `owner`                                |
| Password | `12345678`                             |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router v7
- **Backend:** Node.js, Express.js
- **Database:** SQLite (better-sqlite3)
- **Styling:** Vanilla CSS
- **Font:** Kanit (Google Fonts)

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
