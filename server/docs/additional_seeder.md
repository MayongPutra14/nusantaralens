# Database Seeding Guide

Sebelum menjalankan script seeder pada masing-masing folder di dalam direktori `src/data/`, pastikan Anda sudah:

- Menyiapkan file data `.json` sesuai struktur pada file `example.json`
- Menyiapkan file gambar di dalam folder `uploads/` (khusus untuk data `heroes` dan `cultures`)

---

# Penting Mengenai Nama File Gambar

Script seeder akan secara otomatis membuat **slug** dari nama data dan mencocokkannya dengan nama file gambar yang ada di folder `uploads/`.

Karena itu, pastikan nama file gambar mengikuti aturan berikut:

- Gunakan tanda dash (`-`) sebagai pengganti spasi
- Gunakan huruf kecil semua (`lowercase`).
- Pastikan nama file sesuai dengan slug yang dihasilkan dari data

## Contoh

### Benar

```txt id="9b4s1n"
ki-hajar-dewantara.png
rumahAdatJawa.png
```

### Salah

```txt id="l61n3d"
Ki Hajar Dewantara.png
Rumah Adat Jawa.PNG
```

---

## Warning

Jika nama gambar tidak sesuai:

- Proses seeding akan gagal
- Data yang sudah diproses akan di-_rollback_
- Gambar yang terlanjur ter-upload ke Cloudinary tidak akan otomatis terhapus
- Anda perlu membersihkan data dan mengulang proses seeding dari awal

---

# Struktur Data

Gunakan file berikut sebagai referensi format data:

| Data             | Referensi                                                 |
| ---------------- | --------------------------------------------------------- |
| Heroes           | [example.json](../src/data/heroes/example.json)           |
| Cultures         | [example.json](../src/data/cultures/example.json)         |
| Languages        | [example.json](../src/data/languages/example.json)        |
| Populations      | [example.json](../src/data/populations/example.json)      |
| economic_growths | [example.json](../src/data/economic_growths/example.json) |
| land_areas       | [example.json](../src/data/land_areas/example.json)       |

---

## Catatan Penting

### Konfigurasi Path File Seeder

Beberapa seeder memerlukan file `.json` sebagai sumber data. Sebelum menjalankan proses seeding, pastikan path file yang digunakan pada masing-masing seeder telah disesuaikan dengan lokasi data yang Anda miliki.

Umumnya setiap seeder memiliki sebuah `konstanta` yang digunakan untuk menentukan lokasi file sumber data, misalnya:

* `DATA_PENDUDUK_DIR`
* `ECONOMIC_GROWTH_FILE`
* `LAND_AREA_FILE`

Seiring perkembangan proyek, kemungkinan akan terdapat variabel path tambahan pada seeder lainnya. Oleh karena itu, selalu periksa konfigurasi file seeder yang akan dijalankan dan pastikan path tersebut mengarah ke file `.json` yang benar.

### Contoh Konfigurasi

```javascript id="xw9m1r"
const path = require('path');

const DATA_PENDUDUK_DIR = path.join(
  __dirname,
  '../data/population-data.json'
);

const ECONOMIC_GROWTH_FILE = path.join(
  __dirname,
  '../data/economic-growth-data.json'
);

const LAND_AREA_FILE = path.join(
  __dirname,
  '../data/land-area-data.json'
);
```

>  ⚠️ Jika path tidak sesuai atau file target tidak ditemukan, proses seeding akan gagal dijalankan.


# Menjalankan Seeder

Setiap resource memiliki script seeder tersendiri yang dapat dijalankan pada mode **development** maupun **production**.

Format penamaan script:

```bash id="j8m3pw"
npm run seed:<resource>:dev
npm run seed:<resource>:prod
```

Contoh:

```bash id="k2v7qn"
npm run seed:heroes:dev
npm run seed:populations:prod
```

> 💡 Daftar lengkap script seeder yang tersedia dapat dilihat pada bagian `scripts` di file `package.json`. Jika terdapat resource atau seeder baru di masa mendatang, dokumentasi ini mungkin belum diperbarui, sehingga `package.json` selalu menjadi referensi utama.

---

# Notes

## Konfigurasi Environment

Beberapa seeder, seperti **Populations**, **Economic Growths**, dan **Land Areas**, melakukan sinkronisasi data melalui endpoint API. Sebelum menjalankan seeder tersebut, pastikan konfigurasi environment telah disiapkan dengan benar.

### Mode Development

Pastikan:

* Server lokal sedang berjalan.
* Variabel `DS_URL` pada file `.env` mengarah ke base URL server lokal.
* Variabel `ADMIN_API_KEY` telah terisi sesuai kebutuhan aplikasi.

Contoh:

```env
DS_URL=http://localhost:5000/admin/sync
ADMIN_API_KEY=your-secret-key
```

---

### Mode Production

Jika menjalankan seeder pada environment production, pastikan variabel pada file `.env.production` mengarah ke server yang sudah di-deploy.

Contoh:

```env
DS_URL=https://your-production-api.com/admin/sync
ADMIN_API_KEY=your-secret-key
```

---

> 💡 Setiap seeder akan secara otomatis menggunakan endpoint yang sesuai dengan resource yang diproses. Anda hanya perlu memastikan nilai `DS_URL` dan `ADMIN_API_KEY` telah dikonfigurasi dengan benar.
