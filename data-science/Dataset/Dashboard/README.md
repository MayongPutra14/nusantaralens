# Panduan Streamlit

## Dataset

1. Data Penduduk Seluruh Pulau di Indonesia tahun 2025: Memuat informasi total populasi dan komposisi gender per provinsi
2. Data luas Wilayah di Indonesia tahun 2025: emuat data luas daratan berdasarkan pulau besar di Indonesia
   3 Data Pertumbuhan Ekonomi di Indonesia tahun 2025: Memuat persentase laju pertumbuhan ekonomi per pulau.

## Fitur Dashboard

Dashboard ini dibangun dengan pustaka `Streamlit` untuk antarmuka pengguna dan `Plotly` untuk visualisasi grafik. Alur kerja dashboard meliputi:

- **Pra-pemrosesan Data (Data Preprocessing):** Aplikasi secara otomatis membaca ketiga file CSV dan membersihkan format tipe data, khususnya mengubah format desimal Indonesia (koma) menjadi standar sistem (titik) pada data pertumbuhan ekonomi.
- **Kustomisasi Tema:** Menggunakan injeksi CSS kustom untuk memberikan latar belakang krem dan warna teks yang senada dengan visual website NusantaraLens.

## Run streamlit app

```
streamlit run dashboard.py
```

## Tautan Streamlit Cloud

https://dashboard-cp.streamlit.app/
