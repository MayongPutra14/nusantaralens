from fastapi import FastAPI, UploadFile, File, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import numpy as np
from PIL import Image

import io
import json
import pickle
import os

from tensorflow.keras.preprocessing.sequence import pad_sequences

from app.schemas import (
    TAGS_METADATA, 
    API_DESCRIPTION, 
    HomeResponse,
    HealthResponse,
    PredictSuccessResponse, 
    PredictFailedResponse,
    InternalServerErrorResponse
)
# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Nusantaralens AI Asisstant API",
    description=API_DESCRIPTION,
    version="1.0.0",
    openapi_tags=TAGS_METADATA,
    swagger_ui_parameters={"defaultModelsExpandDepth": 1}
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
# CONFIG & PATH
# =========================================================

IMG_SIZE = (224, 224)
MAX_LENGTH = 50

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# =========================================================
# LOAD ASSETS (Model, Labels, Descriptions, Tokenizer)
# =========================================================

model_path = os.path.join(BASE_DIR, "saved_model")
loaded_model = tf.saved_model.load(model_path)
infer = loaded_model.signatures["serving_default"]

labels_path = os.path.join(BASE_DIR, "data", "labels.json")
with open(labels_path, "r") as f:
    class_names = json.load(f)

desc_path = os.path.join(BASE_DIR, "data", "data_deskripsi_budaya.json")
with open(desc_path, "r", encoding="utf-8") as f:
    descriptions = json.load(f)

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
# ENDPOINTS (Rute API)
# =========================================================

@app.get("/", 
        tags=["System"],
        summary="Check Server Availability",
        response_model=HomeResponse,
        description="Root entry point to verify that the NusantaraLens API instance is initialized and reachable."
        )
def home():
    return {"message": "NusantaraLens API Running"}


@app.get("/health",
        tags=["System"],
        summary="Perform Health Check",
        response_model=HealthResponse,
        description="Infrastructure monitoring endpoint to evaluate the microservice operational health status."
        )
def health():
    return {"status": "ok"}


@app.post(
    "/predict", 
    tags=["Cultural Recognition"], 
    summary="Classify Cultural Asset Image",
    response_description="The model outputs the cultural name and a comprehensive description.",
    responses={
        200: {"model": PredictSuccessResponse, "description": "Image detected successfully"},
        400: {"model": PredictFailedResponse, "description": "Failed because the file is not an image or is corrupted"},
         500: {"model": InternalServerErrorResponse, "description": "Internal Server Error - Something went wrong on the server side"}
    }
)

def predict(
    file: UploadFile = File(..., description="Upload a cultural image file (Required format: JPG, JPEG, or PNG)s")
):

    try:
        # ---- Validastion File ----
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The uploaded file must be an image."
            )

        # ---- Read Image ----
        image_bytes = file.file.read()
        if not image_bytes:
            file.file.seek(0)
            image_bytes = file.file.read()
        try:
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image file or file is corrupted."
            )

        # ---- Preprocess Image ----
        image_array = preprocess_image(image)
        image_array = np.expand_dims(image_array, axis=0)

        # ---- Text Context ----
        default_text = "budaya indonesia"
        sequence = tokenizer.texts_to_sequences([default_text])
        padded = pad_sequences(
            sequence,
            maxlen=MAX_LENGTH,
            padding="post",
            dtype="float32"
        )

       # ---- Model Iference ----
        outputs = infer(
            image_input=tf.constant(image_array, dtype=tf.float32),
            text_input=tf.constant(padded, dtype=tf.float32)
        )
        predictions = outputs["output_0"].numpy()

        ## ---- Predict Result ----
        predicted_index = int(np.argmax(predictions))
        confidence = float(np.max(predictions))
        label = class_names[predicted_index]

        # ---- Ambil Detail Deskripsi ----
        clean_label = normalize_text(label)
        info = description_map.get(clean_label, {})

        # ---- Respons Sukses ----
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

    except HTTPException as http_exc:
        return PredictFailedResponse(
            status="failed",
            message=http_exc.detail,
            data=[]
        )

    except Exception as e:
        return {
            "status": "failed",
            "message": "An error occurred during the prediction process.",
            "error": str(e),
            "data": []
        }
