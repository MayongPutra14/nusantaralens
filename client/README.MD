# Nusantaralens
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
# Deskripsi Proyek

NusantaraLens merupakan platform digital interaktif yang dikembangkan untuk membantu masyarakat, khususnya generasi muda, dalam mengenal, mempelajari, dan memahami keberagaman budaya Indonesia secara lebih mudah, menarik, dan terstruktur. Platform ini hadir sebagai sarana edukasi yang mengintegrasikan berbagai informasi budaya Nusantara ke dalam satu aplikasi yang dapat diakses secara praktis melalui web.

Melalui NusantaraLens, pengguna dapat memperoleh informasi budaya dari berbagai daerah di Indonesia serta memanfaatkan fitur berbasis kecerdasan buatan untuk mendukung pengalaman eksplorasi budaya yang lebih interaktif. Dengan memanfaatkan teknologi web modern, aplikasi ini diharapkan dapat meningkatkan literasi budaya sekaligus mendukung upaya pelestarian warisan budaya Indonesia di era digital.

# Teknologi & Tools yang Digunakan

Aplikasi Front End **NusantaraLens** dibangun menggunakan ekosistem teknologi modern berikut:

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="50" alt="React.js" title="React.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" height="50" alt="Vite" title="Vite" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" height="50" alt="Tailwind CSS" title="Tailwind CSS" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="50" alt="JavaScript" title="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" height="50" alt="React Router" title="React Router DOM" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" height="50" alt="Vercel" title="Vercel" />
</p>

### Core Stack
* **React.js** – Library utama untuk UI berbasis komponen yang interaktif.
* **Vite** – *Build tool* performa tinggi untuk mendukung proses pengembangan dan build cepat.
* **Tailwind CSS** – Framework CSS untuk mempercepat pembuatan antarmuka yang responsif dan modern.
* **JavaScript (ES6+)** – Bahasa pemrograman utama untuk manajemen logika inti aplikasi.

### Libraries & Utilities
* **React Router DOM** – Manajemen navigasi halaman untuk *Single Page Application* (SPA).
* **Axios** – Solusi *HTTP Client* untuk komunikasi data dengan layanan Back End & REST API AI.
* **AOS (Animate On Scroll)** – Pustaka animasi ringan untuk efek interaktif saat halaman di-*scroll*.

### Deployment & Hosting
* **Vercel** – Platform *cloud* yang digunakan untuk distribusi dan *hosting* aplikasi ke lingkungan produksi.

# Fitur Utama

Aplikasi **NusantaraLens** hadir dengan fitur-fitur unggulan untuk memberikan pengalaman eksplorasi budaya yang mendalam:

- **Eksplorasi Budaya Terpusat** Akses data pahlawan nasional, kamus bahasa daerah, serta tradisi nusantara dalam satu platform yang komprehensif.
- **Peta Interaktif Nusantara** Eksplorasi data wilayah secara visual, mulai dari informasi populasi, luas daerah, hingga indikator pertumbuhan ekonomi per pulau.
- **Asisten Budaya Berbasis AI** Fitur _chatbot_ cerdas untuk tanya-jawab interaktif mengenai sejarah dan kekayaan budaya Indonesia.
- **Analisis Gambar Cerdas** Identifikasi objek atau gambar budaya melalui integrasi layanan _Artificial Intelligence_ dan disajikan langsung pada antarmuka.
- **Visualisasi Data Interaktif** Penyajian data kompleks dalam bentuk komponen visual yang mudah dipahami, interaktif, dan menarik.
- **Antarmuka Responsif (Mobile Friendly)** Desain modern yang optimal di berbagai perangkat, mulai dari desktop, tablet, hingga _smartphone_.

# Getting Started

Ikuti langkah-langkah berikut untuk menjalankan proyek **NusantaraLens Frontend** di lingkungan lokal Anda.

## Prasyarat (Prerequisites)

Pastikan perangkat Anda telah terinstal:

- Node.js (disarankan versi LTS terbaru)
- npm (otomatis terinstal bersama Node.js)

Verifikasi instalasi dengan menjalankan perintah berikut:

```bash
node -v
npm -v
```

## Clone Repository

Clone repository ke perangkat Anda:

```bash
git clone https://github.com/Abudann/nusantaralens.git
```

Masuk ke direktori proyek:

```bash
cd nusantaralens
```

Jika repository sudah tersedia di perangkat Anda, tarik pembaruan terbaru dari branch utama:

```bash
git pull origin main
```

## Install Dependencies

Instal seluruh dependensi yang dibutuhkan oleh proyek:

```bash
npm install
```

## Menjalankan Aplikasi

Jalankan development server:

```bash
npm run dev
```

## Akses Aplikasi

Setelah server berhasil dijalankan, terminal akan menampilkan alamat lokal aplikasi.

Secara umum, aplikasi dapat diakses melalui:

```text
http://localhost:5173
```

Buka alamat tersebut menggunakan browser untuk mulai menggunakan aplikasi.

# Catatan Penting Pengembangan (Development Notes)

Untuk menjaga sinkronisasi dan kelancaran integrasi antara Front-End dan Back-End, mohon perhatikan ketentuan berikut selama proses pengembangan:

### 1. Konsistensi Format Respons API (JSON)
* **Ketentuan:** Dilarang mengubah struktur atau format respons JSON dari Back-End secara sepihak (misalnya mengubah *property* `result.data` menjadi `result.items`).
* **Dampak:** Perubahan struktur data secara tiba-tiba akan menyebabkan kegagalan *parsing* data di sisi Front-End, yang berakibat pada eror aplikasi (*blank page*). Jika ada rencana perubahan struktur, wajib didiskusikan terlebih dahulu dengan tim Front-End.

### 2. Pengaturan CORS (Cross-Origin Resource Sharing)
* **Ketentuan:** Jangan menonaktifkan atau menghapus konfigurasi CORS yang sudah berjalan di Back-End.
* **Dampak:** Menonaktifkan CORS akan membuat browser memblokir semua permintaan HTTP (*request*) dari domain Front-End ke API Back-End akibat kebijakan keamanan browser (*Same-Origin Policy*).


# Authors

Proyek ini dikembangkan dan dipelihara oleh:

*   **Abudan** – *Lead Frontend & Integration* – [@Abudan](https://github.com/Abudann)
*   **Gilang Mayong Saputra** – *UI/UX Designer & Frontend* – [@MayongPutra14](https://github.com/MayongPutra14)

---
*Dibuat dengan ❤️ untuk pelestarian budaya Indonesia.*