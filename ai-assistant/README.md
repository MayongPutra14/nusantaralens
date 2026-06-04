---
title: Nusantaralens Ai
emoji: 📈
colorFrom: green
colorTo: red
sdk: docker
pinned: false
license: mit
short_description: This space is dedicated for nusantaralens
---

Check out the configuration reference at https://huggingface.co/docs/hub/spaces-config-reference

# NusantaraLens - AI Assistant Service

![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## Deskripsi Proyek

**NusantaraLens AI** adalah layanan REST API berbasis FastAPI yang berfungsi sebagai backend AI independen dalam ekosistem monorepo **NusantaraLens**. Layanan berbasis _Artificial Intelligence_ (AI) Multimodal ini dirancang khusus untuk mengidentifikasi, mengklasifikasikan, dan menyajikan informasi mendalam mengenai kekayaan budaya Indonesia melalui kombinasi arsitektur **MobileNetV2** (ekstraksi fitur citra/gambar) dan **Bidirectional LSTM (Bi-LSTM)** (pemrosesan fitur teks).

Layanan ini bekerja di balik layar untuk mendukung ekosistem utama NusantaraLens melalui alur kerja berikut:

1. **Input Pengguna:** Pengguna mengunggah gambar objek budaya beserta teks (_prompt_) melalui aplikasi _Front-end_.
2. **Identifikasi Objek (Lokal AI):** _Back-end_ utama meneruskan gambar tersebut ke layanan **NusantaraLens AI** untuk mengidentifikasi objek budaya yang terdapat dalam gambar.
3. **Pengayaan Informasi (Gemini API):** Hasil prediksi dari model AI lokal kemudian dikirimkan kembali ke _Back-end_ utama untuk diteruskan ke **Gemini API**. Gemini akan memproses informasi tersebut bersama dengan _prompt_ dari pengguna untuk menghasilkan narasi deskriptif yang kaya dan interaktif.
4. **Output Akhir:** _Back-end_ menyatukan seluruh data hasil identifikasi lokal dan narasi Gemini, lalu mengirimkannya kembali ke _Front-end_ untuk ditampilkan secara interaktif kepada pengguna.

## Fitur Utama

Layanan AI Assistant ini menyediakan fungsionalitas utama sebagai berikut:

- **Klasifikasi Budaya Indonesia Multimodal:** Mengidentifikasi ragam kebudayaan Indonesia melalui kombinasi analisis visual (gambar) dan teks.
- **Prediksi Berbasis Citra:** Menerima unggahan gambar dari pengguna untuk mengenali jenis atau objek budaya tertentu.
- **Confidence Score (Tingkat Akurasi):** Menampilkan skor kepercayaan atau tingkat akurasi prediksi dari model terhadap objek yang diidentifikasi.
- **Metadata Budaya Komprehensif:** Menyajikan informasi pendukung hasil klasifikasi secara terstruktur, yang meliputi:
  - Kategori budaya (misal: pakaian adat, rumah adat, senjata tradisional, dll).
  - Daerah asal budaya di Indonesia.
  - Deskripsi dasar kebudayaan berbasis dataset lokal.
- **REST API Berkinerja Tinggi:** Dibangun menggunakan FastAPI yang cepat, efisien, dan dilengkapi dengan dokumentasi API otomatis (Swagger UI).
- **Cross-Platform Integration Ready:** Siap diintegrasikan dengan berbagai platform, baik aplikasi Mobile (Flutter) maupun Web Application.

## Teknologi & Tools yang Digunakan

Layanan **NusantaraLens AI Assistant** dibangun menggunakan ekosistem teknologi yang andal, efisien, dan dikhususkan untuk performa tinggi dalam pemrosesan _Deep Learning_ serta penyajian API:

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="50" alt="Python" title="Python" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" height="50" alt="FastAPI" title="FastAPI" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" height="50" alt="TensorFlow" title="TensorFlow" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="50" alt="Docker" title="Docker" />
</p>

### Backend API & Server

- **FastAPI** – Framework Python modern dengan performa tinggi yang digunakan untuk membangun RESTful API secara cepat, asinkron, dan otomatis menyediakan dokumentasi Swagger UI.
- **Uvicorn** – Server web ASGI berkecepatan tinggi yang digunakan untuk menjalankan aplikasi FastAPI di lingkungan lokal maupun produksi.

### Machine Learning & Deep Learning Framework

- **TensorFlow & Keras** – Framework utama yang digunakan untuk memuat (_load_), mengeksekusi, dan mengelola model _Deep Learning_ komposit.
- **MobileNetV2** – Arsitektur _Convolutional Neural Network (CNN)_ ringan yang dioptimalkan untuk ekstraksi fitur citra/gambar secara cepat.
- **Bidirectional LSTM (Bi-LSTM)** – Arsitektur _Recurrent Neural Network (RNN)_ yang digunakan untuk memproses urutan fitur teks (konteks prompt/deskripsi) dari dua arah.

### Data, Image Processing & Containerization

- **NumPy** – Library komputasi numerik yang digunakan untuk melakukan manipulasi matriks dan pemrosesan array dari data gambar sebelum dimasukkan ke dalam model.
- **Pillow (PIL)** – Library pemrosesan citra digital untuk membaca, mengubah ukuran (_resize_), dan melakukan pra-pemrosesan gambar yang diunggah oleh pengguna.
- **Docker** – Teknologi _containerization_ yang digunakan untuk membungkus seluruh dependensi aplikasi dan model AI, memastikan layanan dapat berjalan dengan konsisten di berbagai lingkungan server.

## Petunjuk Setup Environment

Ikuti langkah-langkah di bawah ini secara berurutan untuk menyiapkan lingkungan kerja (_environment setup_) di komputer lokal Anda:

### Langkah 1: Kloning Repositori Proyek

Pertama, kloning repositori utama **NusantaraLens** dari GitHub ke komputer lokal Anda menggunakan perintah berikut:

```bash
git clone https://github.com/Abudann/nusantaralens.git
```

### Langkah 2: Masuk ke Direktori Layanan AI

Karena proyek ini berbasis monorepo, Anda harus masuk secara spesifik ke dalam sub-folder tempat layanan AI Assistant berada:

```bash
cd nusantaralens/ai-assistant
```

### 3. Membuat Virtual Environment

Disarankan untuk menggunakan **Virtual Environment** agar seluruh dependency proyek terisolasi dari instalasi Python lain yang ada di komputer Anda. Dengan cara ini, konflik versi library dapat dihindari dan lingkungan pengembangan menjadi lebih konsisten.

Jalankan perintah berikut pada root project:

```bash
python -m venv venv
```

Perintah tersebut akan membuat sebuah folder bernama `venv` yang berisi lingkungan Python terpisah khusus untuk proyek ini.

---

### 4. Mengaktifkan Virtual Environment

Setelah Virtual Environment berhasil dibuat, aktifkan terlebih dahulu sebelum menginstal dependency proyek.

#### Windows (Command Prompt)

```cmd
venv\Scripts\activate.bat
```

#### Windows (PowerShell)

```powershell
.\venv\Scripts\Activate.ps1
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### Gitbash

```bash
source venv/Scripts/activate
```

Jika proses aktivasi berhasil, Anda akan melihat nama environment `(venv)` muncul di awal baris terminal, seperti contoh berikut:

```bash
(venv) C:\Projects\AI-Module>
```

Hal ini menandakan bahwa seluruh package yang diinstal selanjutnya hanya akan digunakan oleh proyek ini.

---

### 5. Menginstal Dependencies

Setelah Virtual Environment aktif, perbarui terlebih dahulu `pip` ke versi terbaru untuk memastikan proses instalasi package berjalan dengan baik.

```bash
python -m pip install --upgrade pip
```

Selanjutnya, instal seluruh dependency yang diperlukan oleh proyek menggunakan file `requirements.txt`:

```bash
pip install -r requirements.txt
```

Proses instalasi mungkin membutuhkan beberapa menit tergantung pada kecepatan internet dan spesifikasi perangkat yang digunakan. Selama proses ini, `pip` akan mengunduh dan menginstal seluruh library yang dibutuhkan oleh aplikasi, seperti TensorFlow, FastAPI, NumPy, Pillow, dan dependency lainnya yang tercantum dalam file `requirements.txt`.

Setelah proses instalasi selesai tanpa error, lingkungan pengembangan telah siap digunakan.

## Menjalankan Aplikasi

Setelah seluruh dependency berhasil diinstal dan **Virtual Environment** dalam keadaan aktif, Anda dapat menjalankan layanan REST API NusantaraLens AI menggunakan salah satu metode berikut.

### Metode 1: Menjalankan dengan Uvicorn

Pastikan terminal berada pada direktori `ai-assistant` dan Virtual Environment `(venv)` telah aktif, kemudian jalankan perintah berikut:

```bash
uvicorn app.main:app --reload
```

#### Penjelasan

- `app.main:app` menginstruksikan Uvicorn untuk mencari file `main.py` di dalam folder `app` dan menjalankan objek aplikasi FastAPI bernama `app`.
- `--reload` mengaktifkan fitur _auto-reload_ sehingga server akan otomatis dimuat ulang setiap kali terdapat perubahan pada kode sumber. Fitur ini sangat berguna selama proses pengembangan.

Jika berhasil dijalankan, terminal akan menampilkan informasi serupa berikut:

```text
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Server API kini dapat diakses melalui:

```text
http://127.0.0.1:8000
```

---

### Metode 2: Menjalankan Melalui Python

Apabila proyek telah dikonfigurasi untuk mendukung eksekusi langsung melalui file utama, aplikasi juga dapat dijalankan menggunakan perintah berikut:

```bash
python app/main.py
```

Metode ini bersifat opsional dan bergantung pada implementasi yang terdapat pada file `main.py`.

## Dokumentasi API

Setelah server berhasil dijalankan, akses salah satu halaman dokumentasi berikut:

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

Swagger UI menyediakan antarmuka interaktif untuk mengeksplorasi dan menguji endpoint API secara langsung.

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

ReDoc menampilkan dokumentasi API dalam format yang lebih terstruktur dan berfokus pada spesifikasi endpoint serta model data yang digunakan.

# Authors

Proyek ini dikembangkan dan dipelihara oleh:

- **Khalisha Adla** – _AI/ML Engineer & Model Architecture_ – [@Khalisha10](https://github.com/Khalisha10)
- **Adhistya Sunasr** – _AI/ML Engineer & Model Architecture_ – [@adhistya135-prog](https://github.com/adhistya135-prog)

---

_Dibuat dengan ❤️ untuk pelestarian budaya Indonesia._
