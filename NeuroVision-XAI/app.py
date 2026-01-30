import streamlit as st
import numpy as np
import cv2
from utils import preprocess_image, generate_mock_heatmap
from PIL import Image

st.set_page_config(page_title="NeuroVision XAI", page_icon="🧠", layout="wide")

st.title("🧠 NeuroVision XAI: Brain MRI Analyzer")
st.markdown("""
    Welcome to **NeuroVision XAI**. This tool uses Computer Vision and Explainable AI to assist in 
    analyzing Brain MRI scans. 
    ---
""")

col1, col2 = st.columns([1, 1])

with col1:
    st.header("1. Upload MRI Scan")
    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])
    
    if uploaded_file is not None:
        file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
        img = cv2.imdecode(file_bytes, 1)
        st.image(img, caption='Original Uploaded Image', use_column_width=True)

with col2:
    st.header("2. AI Analysis & XAI Results")
    if uploaded_file is not None:
        with st.spinner('Running AI Model...'):
            # Preprocessing
            processed_img = preprocess_image(img)
            
            # Mock XAI Analysis
            heatmap_img = generate_mock_heatmap(processed_img)
            
            st.subheader("Processed Scan (Enhanced)")
            st.image(processed_img, caption="Contrast Normalized", use_column_width=True)
            
            st.subheader("XAI Heatmap (Detection Focus)")
            st.image(heatmap_img, caption="Red areas indicate AI focus", use_column_width=True)
            
            st.success("Analysis Complete!")
    else:
        st.info("Please upload an MRI scan to begin the analysis.")

st.sidebar.title("About the Project")
st.sidebar.info("""
    **NeuroVision XAI** is an innovative intersection of Neurology and Technology. 
    It uses **Explainable AI (XAI)** to reveal the 'why' behind medical imaging predictions.
""")
