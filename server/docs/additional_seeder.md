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

| Data        | Referensi                                            |
| ----------- | ---------------------------------------------------- |
| Heroes      | [example.json](../src/data/heroes/example.json)      |
| Cultures    | [example.json](../src/data/cultures/example.json)    |
| Languages   | [example.json](../src/data/languages/example.json)   |
| Populations | [example.json](../src/data/populations/example.json) |

---

# Catatan Penting

## Population Seeder

Untuk proses seeding data population, Anda perlu mengubah path pada variabel `DATA_PENDUDUK_DIR` yang terdapat di file seeder agar mengarah ke file `.json` yang sudah Anda buat.

Contoh:

```js id="w17x9q"
const DATA_PENDUDUK_DIR = 'path/menuju/file.json';
```

---

# Menjalankan Seeder

Setelah semua file data selesai disiapkan, Anda dapat menjalankan perintah seeder sesuai environment yang digunakan.

# Mode Development

```bash
# Mengisi data heroes
npm run seed:heroes:dev

# Mengisi data languages
npm run seed:languages:dev

# Mengisi data cultures
npm run seed:cultures:dev

# Mengisi data populations
npm run seed:populations:dev
```

# Mode Production

```bash
# Mengisi data heroes
npm run seed:heroes:prod

# Mengisi data languages
npm run seed:languages:prod

# Mengisi data cultures
npm run seed:cultures:prod

# Mengisi data populations
npm run seed:populations:prod
```

---

# Notes

## Seeder Population pada Mode Development

Untuk menjalankan:

```bash
npm run seed:populations:dev
```

pastikan:

- Server lokal sedang berjalan
- Variabel `DS_URL` pada file `.env` sudah terisi dengan endpoint server lokal Anda

Contoh:

```env
DS_URL=http://localhost:5000/admin/sync/populations
```

---

## Seeder Population pada Mode Production

Jika dijalankan pada mode production, pastikan variabel `DS_URL` pada file `.env.production` mengarah ke endpoint production yang sudah di-deploy.

Contoh:

```env id=
DS_URL=https://your-production-api.com/admin/sync/populations
```
