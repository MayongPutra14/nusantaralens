# Nusantaralens API

## Deskripsi Proyek

Nusantaralens API merupakan layanan backend utama yang mendukung platform Nusantaralens. API ini dirancang untuk mengelola dan menyediakan data komprehensif mengenai pahlawan nasional Indonesia, bahasa daerah, serta berbagai warisan budaya Nusantara.

Dibangun menggunakan arsitektur Layered Architecture yang scalable, API ini berperan sebagai penghubung utama antar komponen dalam ekosistem aplikasi, meliputi:

- Integrasi AI, sebagai penyedia data utama untuk layanan AI Chat agar mampu memberikan konteks budaya dan sejarah yang akurat.
- Front-end Gateway, dengan menyediakan data yang terstruktur dan responsif untuk antarmuka website Nusantaralens.
- Data Management, sebagai pusat pengelolaan data sejarah, bahasa, dan budaya Indonesia secara terintegrasi.

---

## Environment Setup

Project ini menggunakan konfigurasi environment yang dipisahkan untuk mode development dan production guna memudahkan pengelolaan konfigurasi aplikasi.

---

### 1. Setup Environment Development

Buat file `.env` pada root project, kemudian sesuaikan nilainya dengan konfigurasi lokal Anda.

```env id="m1n9qp"
NODE_ENV=development
PORT=5000
HOST=localhost

# PostgreSQL Configuration
PG_USER=your_postgres_username
PG_HOST=localhost
PG_PASSWORD=your_postgres_password
PG_DATABASE=your_local_database
PG_PORT=5432

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_SYSTEM_PROMPT=your_system_prompt

# External Service Configuration
AI_MODEL_URL=hugging_face_url
DS_URL=endpoint_to_insert_data

# Security
ADMIN_API_KEY=your_admin_api_key

# Frontend Configuration
FRONTEND_URL=http://localhost:5173
```

---

### 2. Setup Environment Production

Untuk deployment production, gunakan file `.env.production`.

```env id="7h6vse"
NODE_ENV=production

# PostgreSQL Connection || URL from neon.com
DATABASE_URL=postgres://user:password@host:port/database

# Redis Connection URL || URL from Upstash
REDIS_URL=redis://user:password@host:port

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini Configuration
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash

# External Service Configuration
AI_MODEL_URL=hugging_face_url
DS_URL=endpoint_to_insert_data

# Security
ADMIN_API_KEY=your_admin_api_key

# Frontend Configuration
FRONTEND_URL=https://your-frontend-domain.com
```

---

## Cara Menjalankan Aplikasi

Setelah Anda selesai melakukan konfigurasi Environment Variables (`.env` atau `.env.production`), ikuti langkah-langkah di bawah ini untuk menjalankan server.

### 1. Instalasi Dependensi

Pastikan Anda menginstal semua _library_ yang dibutuhkan oleh proyek ini terlebih dahulu:

```bash
npm install

```

---

### 2. Run Database Migration

Migration digunakan untuk membuat struktur tabel database.

### Development

```bash
npm run migrate:up
```

### Production

```bash
npm run migrate:up:prod
```

---

## ⚠️ Important — Database Seeder

Aplikasi ini menggunakan mekanisme **database seeding otomatis** untuk mengisi data awal ke database.

Sebelum menjalankan perintah seeder seperti:

```bash id="j2m8vp"
npm run seed:<name>:dev
npm run seed:<name>:prod
```

pastikan Anda sudah membaca dokumentasi tambahan mengenai:

- Struktur file JSON
- Penamaan file gambar
- Konfigurasi environment
- Endpoint untuk population seeder
- Hal-hal yang dapat menyebabkan proses seeding gagal

Dokumentasi lengkap dapat dilihat di: [Database Seeder Documentation](./docs/additional_seeder.md)

## 3. Start the Server

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

---

## Notes

- Pastikan PostgreSQL dan Redis telah aktif sebelum menjalankan aplikasi.
- Endpoint admin `/admin/sync/populations` memerlukan `ADMIN_API_KEY`.
- File `.env` dan `.env.production` tidak boleh diunggah ke repository publik.
- Jalankan migration sebelum menjalankan seeder.
- Server harus aktif sebelum menggunakan endpoint sinkronisasi atau input data.

---

## 🔌 API Documentation (Interactive UI)

Proyek ini telah dilengkapi dengan dokumentasi interaktif menggunakan **OpenAPI Specification 3.0** dan **Swagger UI**. Seluruh skema data, parameter, _request body_, dan contoh respon dari endpoint `Heroes`, `Cultures`, `Languages`, `Populations`, dan `AI Assistant` dapat diakses secara langsung melalui browser Anda.

### Cara Mengakses Dokumentasi:

- **Lingkungan Pengembangan (Localhost / Development):**
  1. Pastikan server lokal Anda telah menyala (`npm run start:dev`).
  2. Akses tautan berikut di browser Anda:
     👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

- **Lingkungan Produksi (Live Server / Production):**
  Dokumentasi ini juga dapat diakses langsung secara online tanpa perlu menjalankan server lokal. Akses tautan publik proyek Anda dengan akhiran `/api-docs`:
  👉 **`https://nusantaralens.vercel.app/api-docs`**

### Fitur Utama Dokumentasi:

- **Live Testing:** Anda dapat langsung menguji respon dari database (_Try it out_) namun jika anda menggunakan sever lokal.
- **Skema Terstruktur:** Panduan lengkap mengenai tipe data input (request body) yang divalidasi oleh sistem.

## Author

Name: Gilang Mayong Saputra

GitHub: [https://github.com/MayongPutra14](https://github.com/MayongPutra14)
