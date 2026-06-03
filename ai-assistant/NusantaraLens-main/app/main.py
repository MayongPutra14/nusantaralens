from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import numpy as np
from PIL import Image

import io
import json
import pickle
import os

from tensorflow.keras.preprocessing.sequence import pad_sequences

# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="NusantaraLens API",
    description="API clasification Indonesian cultures",
    version="1.0.0"
)

# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# CONFIG
# =========================================================

IMG_SIZE = (224, 224)
MAX_LENGTH = 50

# =========================================================
# PATH CONFIGURATION
# =========================================================
# Mencari letak folder 'nusantaralens' (root) secara otomatis
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# =========================================================
# LOAD MODEL
# =========================================================
model_path = os.path.join(BASE_DIR, "saved_model")
loaded_model = tf.saved_model.load(model_path)

infer = loaded_model.signatures["serving_default"]

# =========================================================
# LOAD LABELS
# =========================================================
labels_path = os.path.join(BASE_DIR, "data", "labels.json")
with open(labels_path, "r") as f:
    class_names = json.load(f)

# =========================================================
# LOAD DESCRIPTIONS
# =========================================================
desc_path = os.path.join(BASE_DIR, "data", "data_deskripsi_budaya.json")
with open(desc_path, "r", encoding="utf-8") as f:
    descriptions = json.load(f)

# =========================================================
# LOAD TOKENIZER
# =========================================================
tokenizer_path = os.path.join(BASE_DIR, "artifacts", "tokenizer.pkl")
with open(tokenizer_path, "rb") as f:
    tokenizer = pickle.load(f)
# =========================================================
# NORMALIZE FUNCTION
# =========================================================

def normalize_text(text: str):

    return (
        text.lower()
        .replace("_", " ")
        .strip()
    )

# =========================================================
# DESCRIPTION MAPPING
# =========================================================

description_map = {
    normalize_text(item["Nama"]): item
    for item in descriptions
}

# =========================================================
# IMAGE PREPROCESSING
# =========================================================

def preprocess_image(image):
    image = image.resize(IMG_SIZE)
    image = np.array(image)
    image = image.astype("float32") / 255.0
    return image

# =========================================================
# HOME ENDPOINT
# =========================================================

@app.get("/")
def home():
    return {
        "message": "NusantaraLens API Running"
    }

# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "ok"
    }

# =========================================================
# PREDICT ENDPOINT
# =========================================================

@app.post("/predict")
def predict(
    file: UploadFile = File(...)
):

    try:

        # =================================================
        # VALIDASI FILE
        # =================================================

        if not file.content_type.startswith("image/"):

            return {
                "success": False,
                "message": "The uploaded file must be an image.",
                "data": []
            }

        # =================================================
        # READ IMAGE
        # =================================================

        image_bytes = file.file.read()
        if not image_bytes:
            file.file.seek(0)
            image_bytes = file.file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

        # =================================================
        # PREPROCESS IMAGE
        # =================================================

        image_array = preprocess_image(image)
        image_array = np.expand_dims(image_array, axis=0)

        # =================================================
        # TEXT INPUT
        # =================================================

        default_text = "budaya indonesia"
        sequence = tokenizer.texts_to_sequences([default_text])
        padded = pad_sequences(
            sequence,
            maxlen=MAX_LENGTH,
            padding="post",
            dtype="float32"
        )

        # =================================================
        # FORCE CLEAR TF SESSION
        # =================================================
        tf.keras.backend.clear_session()

        # =================================================
        # MODEL INFERENCE
        # =================================================

        outputs = infer(
            image_input=tf.constant(image_array,dtype=tf.float32),
            text_input=tf.constant(padded,dtype=tf.float32)
        )
        predictions = outputs["output_0"].numpy()

        # =================================================
        # PREDICTION RESULT
        # =================================================

        predicted_index = int(np.argmax(predictions))
        confidence = float(np.max(predictions))
        label = class_names[predicted_index]

        # =================================================
        # GET DESCRIPTION
        # =================================================
        clean_label = normalize_text(label)
        info = description_map.get(clean_label, {})

        # =================================================
        # RESPONSE
        # =================================================

        return {
            "status": "success",
            "message": "Chat response generated successfully",
            "data": [
                {
                    "prediction": label,
                    "confidence": round(confidence * 100, 2),
                    "daerah": info.get("Daerah", "-"),
                    "kategori": info.get("Kategori", "-"),
                    "deskripsi": info.get("Deskripsi", "-")
                }
            ]
        }

    except Exception as e:

        return {
            "status": "failed",
            "message": "An error occurred during the prediction process.",
            "error": str(e),
            "data": []
        }
