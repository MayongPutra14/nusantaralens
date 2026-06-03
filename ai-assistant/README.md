# NusantaraLens AI

## Deskripsi

NusantaraLens API adalah layanan backend berbasis FastAPI yang digunakan untuk mengklasifikasikan budaya Indonesia menggunakan model Artificial Intelligence (AI) multimodal. API menerima input berupa gambar dan menghasilkan prediksi budaya beserta informasi pendukung seperti kategori, daerah asal, dan deskripsi budaya.

Model yang digunakan merupakan kombinasi MobileNetV2 untuk ekstraksi fitur citra dan Bidirectional LSTM untuk pemrosesan fitur teks.

---

## 🚀 Fitur

- Klasifikasi budaya Indonesia berbasis AI
- Prediksi dari gambar yang diunggah pengguna
- Menampilkan confidence score
- Menampilkan kategori budaya
- Menampilkan daerah asal budaya
- Menampilkan deskripsi budaya
- REST API menggunakan FastAPI
- Siap diintegrasikan dengan Flutter atau Web Application

---

## 🛠️ Teknologi

### Backend
- FastAPI
- Uvicorn

### Machine Learning
- TensorFlow
- Keras
- MobileNetV2
- Bidirectional LSTM

### Data Processing
- NumPy
- Pillow

---

## 📁 Struktur Proyek

```text
.
├── main.py
├── requirements.txt
├── labels.json
├── tokenizer.pkl
├── Data deskripsi budaya.json
├── saved_model/
│   ├── assets/
│   ├── variables/
│   └── saved_model.pb
└── README.md
```

---

## ⚙️ Instalasi

### Clone Repository

```bash
git clone https://github.com/username/nusantaralens-api.git
cd nusantaralens-api
```

### Install Dependency

```bash
pip install -r requirements.txt
```

---

## ▶️ Menjalankan API

```bash
uvicorn main:app --reload
```

API akan berjalan pada:

```text
http://127.0.0.1:8000
```

---

## 📚 Dokumentasi API

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### ReDoc

```text
http://127.0.0.1:8000/redoc
```

---

## 🔍 Endpoint

### Home

**GET /**

Response:

```json
{
  "message": "NusantaraLens API Running"
}
```

---

### Health Check

**GET /health**

Response:

```json
{
  "status": "ok"
}
```

---

### Predict

**POST /predict**

Request:

```form-data
file : image.jpg
```

Response:

```json
{
  "success": true,
  "prediction": "Rendang",
  "confidence": 98.75,
  "daerah": "Sumatera Barat",
  "kategori": "Kuliner",
  "deskripsi": "Rendang merupakan makanan khas Minangkabau yang berasal dari Sumatera Barat."
}
```

---

## 🤖 Model AI

### Input

- JPG
- JPEG
- PNG
- Ukuran gambar 224x224

### Output

- Nama budaya
- Confidence score
- Kategori budaya
- Daerah asal
- Deskripsi budaya

---

## 📊 Dataset

Model dilatih menggunakan beberapa kategori budaya Indonesia:

### Kuliner
- Rendang
- Gudeg
- Pempek
- Papeda

### Tarian
- Tari Saman
- Tari Piring
- Tari Kecak

### Lagu Daerah
- Bungong Jeumpa
- Ampar-Ampar Pisang
- Yamko Rambe Yamko

### Pahlawan Nasional
- Cut Nyak Dhien
- Pattimura
- Ki Hajar Dewantara

---

## 🚢 Deployment Railway

### Build Command

```bash
pip install -r requirements.txt
```

### Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 📱 Integrasi Flutter

Contoh pengiriman gambar:

```dart
var request = http.MultipartRequest(
  'POST',
  Uri.parse('https://your-api-url/predict'),
);

request.files.add(
  await http.MultipartFile.fromPath(
    'file',
    imagePath,
  ),
);

var response = await request.send();
```

---

## 👨‍💻 Tim Pengembang

NusantaraLens Development Team

Universitas Bina Sarana Informatika

2026

---

## 📄 Lisensi

Proyek ini dikembangkan untuk tujuan edukasi, penelitian, dan pelestarian budaya Indonesia.