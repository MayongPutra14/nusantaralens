import streamlit as st
import pandas as pd
import folium
from streamlit_folium import st_folium
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
st.set_page_config(page_title="NusantaraLens Dashboard", layout="wide")

@st.cache_data
def load_data():
   path_penduduk = os.path.join(BASE_DIR, "..", "Data Penduduk", "Data_Penduduk.csv")
   path_koordinat = os.path.join(BASE_DIR, "..", "Koordinat", "Koordinat_NusantaraLens.csv")

   if not os.path.exists(path_penduduk):
        st.error(f"File tidak ditemukan! Cek: {path_penduduk}")
        return pd.DataFrame(), pd.DataFrame()
   
   df_penduduk = pd.read_csv(path_penduduk)
   df_koordinat = pd.read_csv(path_koordinat)
   for col in ['Laki-laki', 'Perempuan', 'Total']:
        if col in df_penduduk.columns:
            df_penduduk[col] = df_penduduk[col].astype(str).str.replace('.', '', regex=False).str.replace(' ', '', regex=False)
            df_penduduk[col] = pd.to_numeric(df_penduduk[col], errors='coerce').fillna(0).astype(int)
   return df_penduduk, df_koordinat
df_penduduk, df_koordinat = load_data()

st.sidebar.title('🔍 NusantaraLens')
st.sidebar.markdown("---")
st.sidebar.markdown('### Cakupan Wilayah')
st.sidebar.markdown('1. **Aceh**\n2. **Yogyakarta**\n3. **Nusa Tenggara Timur**')
pilihan_daerah = st.sidebar.selectbox("Pilih Wilayah Analisis:", df_koordinat['Daerah'].unique())

dict_files = {
    "Aceh": {"subdir": "Aceh", "file": "Aceh.csv", "lang": "Aceh"},
    "Yogyakarta": {"subdir": "Jawa", "file": "Jawa.csv", "lang": "Jawa"},
    "Nusa Tenggara Timur": {"subdir": "Abui", "file": "Abui.csv", "lang": "Abui"}
}

def load_kamus(daerah):
    config = dict_files.get(daerah)
    if config:
        path_kamus = os.path.join(BASE_DIR, '..', 'Kamus', config['subdir'], config['file'])
        if os.path.exists(path_kamus):
           df = pd.read_csv(path_kamus)
           df = df.rename(columns={config['lang']: 'Kata Lokal', 'Indonesia': 'Terjemahan' }) 
           return df
        else:
            st.error(f'File tidak ditemukan di: {path_kamus} ')
    return pd.DataFrame()

st.title(f"📍 Dashboard Analisis: {pilihan_daerah}")
st.markdown("---")

col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("🌐 Peta Lokasi Digital")
    coord = df_koordinat[df_koordinat['Daerah'] == pilihan_daerah].iloc[0]
    lat, lon = coord['Latitude'], coord['Longitude']

    m = folium.Map(location=[lat, lon], zoom_start=8)
    folium.Marker([lat, lon], popup=pilihan_daerah).add_to(m)
    st_folium(m, width=700, height=450)

with col2:
    st.subheader("📊 Statistik Penduduk")
    pop = df_penduduk[df_penduduk['Daerah'] == pilihan_daerah].iloc[0]
    total_bersih = int(str(pop['Total']).replace('.', '').replace(' ', ''))
    st.metric("Total Penduduk", f"{total_bersih:,}".replace(",", "."))
    
    chart_data = pd.DataFrame({
        'Kategori': ['Laki-laki', 'Perempuan'],
        'Jumlah': [pop['Laki-laki'], pop['Perempuan']]
    })
    st.bar_chart(chart_data.set_index('Kategori'))

st.markdown("---")

st.subheader("📖 Eksplorasi Bahasa Lokal")
df_kamus_tampil = load_kamus(pilihan_daerah)

if not df_kamus_tampil.empty:
    st.dataframe(df_kamus_tampil, use_container_width=True, hide_index=True)
else:
    st.warning("Data kamus tidak ditemukan.")

    

