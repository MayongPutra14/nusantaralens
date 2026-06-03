import streamlit as st
import pandas as pd
import plotly.express as px
import os

st.set_page_config(page_title = 'Dashboard NusantaraLens', page_icon= 'ID', layout ='wide')

st.markdown("""
    <style>
    .stApp {
        background-color: #F8F4EA; 
    }
    
    h1, h2, h3 {
        color: #5C3D2E !important;
    }
    
    [data-testid="stMetricValue"] {
        color: #8B5A2B;
    }
    </style>
    """, unsafe_allow_html=True)

@st.cache_data
def load_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    path_penduduk = os.path.join(base_dir, 'data_penduduk_indonesia.csv')
    path_luas = os.path.join(base_dir, 'luas_wilayah_per_pulau.csv')
    path_ekonomi = os.path.join(base_dir, 'pertumbuhan_ekonomi_per_pulau.csv')
    df_penduduk = pd.read_csv(path_penduduk)
    df_luas_wilayah = pd.read_csv(path_luas)
    df_pertumbuhan = pd.read_csv(path_ekonomi)
    df_pertumbuhan['Laju_Pertumbuhan_Ekonomi'] = df_pertumbuhan['Laju_Pertumbuhan_Ekonomi'].astype(str).str.replace(',', '.').astype(float)

    return df_penduduk, df_luas_wilayah, df_pertumbuhan
df_penduduk, df_luas_wilayah, df_pertumbuhan = load_data()

st.title('📊 Dashboard NusantaraLens: Kependudukan & Ekonomi Indonesia 2025')
st.markdown("""
Dashboard ini dirancang untuk memantau dinamika kependudukan, distribusi luas wilayah, serta tren pertumbuhan ekonomi antar pulau di Indonesia secara holistik pada tahun 2025.
""")

# KODE YANG BENAR
tab1, tab2 = st.tabs(['📈 Analisis Tren & Visualisasi', '💡 Insight & Kesimpulan'])

with tab1:
    st.markdown(' ### Ringkasan Statistik Secara Nasional')
    
    total_populasi = df_penduduk['total_keseluruhan'].sum()
    rata_ekonomi = df_pertumbuhan['Laju_Pertumbuhan_Ekonomi'].mean()
    total_luas = df_luas_wilayah['Luas Wilayah (Km2)'].sum()
    
    col_m1, col_m2, col_m3 = st.columns(3)
    col_m1.metric('Total Populasi (Jiwa)', f"{total_populasi:,.0f}".replace(',', '.') )
    col_m2.metric('Rata-Rata Pertumbuhan Ekonomi', f"{rata_ekonomi:.2f}%")
    col_m3.metric('Total Luas Wilayah (Km2)', f"{total_luas:,.0f}".replace(',', '.') )
    st.markdown("----")

    st.markdown(" ### Dinamika Populasi & Gender")
    col1, col2 = st.columns(2)

    with col1:
        df_penduduk_sorted = df_penduduk.sort_values(by='total_keseluruhan', ascending=False).head(10)
        fig_penduduk = px.bar(
            df_penduduk_sorted, 
            x='provinsi', 
            y='total_keseluruhan', 
            title="10 Provinsi dengan Populasi Terbesar",
            labels={'total_keseluruhan': 'Total Populasi', 'provinsi': 'Provinsi'},
            color='total_keseluruhan',
            color_continuous_scale='Oranges' 
        )
        fig_penduduk.update_layout(xaxis_tickangle=-45, showlegend=False, paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_penduduk, use_container_width=True)
    
    with col2:
        total_laki = df_penduduk['laki_laki'].sum()
        total_perempuan = df_penduduk['perempuan'].sum()
        fig_gender = px.pie(
            names = ['Laki-laki', 'Perempuan'],
            values = [total_laki, total_perempuan],
            title = 'Komposisi Gender Nasional',
            hole = 0.4,
            color_discrete_sequence=['#D27D2D', '#E2A76F']
        )
        fig_gender.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_gender, use_container_width=True)

    st.markdown('### Pemetaan Wilayah & Pertumbuhan Ekonomi')
    col3, col4 = st.columns(2)
    with col3:
        fig_luas = px.bar(
            df_luas_wilayah.sort_values(by='Luas Wilayah (Km2)', ascending=False),
            x='Pulau',
            y='Luas Wilayah (Km2)',
            title='Luas Wilayah per Pulau (Km2)',
            color = 'Luas Wilayah (Km2)',
            color_continuous_scale = 'Earth'
        )

        fig_luas.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig_luas, use_container_width=True)

    with col4:
        fig_ekonomi = px.bar(
        df_pertumbuhan.sort_values(by='Laju_Pertumbuhan_Ekonomi', ascending=False),
         x='Pulau',
         y='Laju_Pertumbuhan_Ekonomi',
        title="Laju Pertumbuhan Ekonomi (%)",
        text='Laju_Pertumbuhan_Ekonomi',
        color='Laju_Pertumbuhan_Ekonomi',
        color_continuous_scale='Sunset'
        )
    fig_ekonomi.update_traces(textposition='outside')
    fig_ekonomi.update_layout(paper_bgcolor='rgba(0,0,0,0)', plot_bgcolor='rgba(0,0,0,0)')
    st.plotly_chart(fig_ekonomi, use_container_width=True)

with tab2:
    st.markdown('### Insight & Kesimpulan')
    st.info("""
            **1. Dinamika Penduduk & Ketimpangan Daerah**
            terdapat ketimpangan yang sangat signifikan. Pulau Jawa mendominasi jumlah populasi dengan selisih yang sangat jauh dibandingkan provinsi di luar Jawa. Namun, dari segi gender, rasio laki-laki dan perempuan di tingkat nasional terpantau sangat seimbang.
                
            **2. Komposisi Luas Wilayah**
            Kalimantan, Sumatera, dan Papua memiliki persentase wilayah daratan terbesar. Paradoks terjadi pada Pulau Jawa yang hanya memiliki sebagian kecil dari luas daratan Indonesia (sekitar 7%), namun menanggung lebih dari 50% beban populasi nasional.

            **3. Laju Pertumbuhan Ekonomi 2025**
            Sulawesi memimpin sebagai pusat pertumbuhan ekonomi tertinggi (6,23%), menandakan keberhasilan hilirisasi atau pergeseran pusat ekonomi baru. Sebaliknya, wilayah Maluku & Papua mengalami laju pertumbuhan terendah (1,44%).
    """)
        

        