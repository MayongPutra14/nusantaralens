from pydantic import BaseModel, Field
from typing import List

# =========================================================
# METADATA SWAGGER UI
# =========================================================

TAGS_METADATA = [
    {"name": "System", "description": "Endpoint for checking server status and health."},
    {"name": "Cultural Recognition", "description": "Main endpoint for Indonesian cultural image detection."}
]

API_DESCRIPTION = """
Welcome to the **NusantaraLens AI Assistant Service API**!

This API is used to detect and classify various Indonesian cultural heritage elements using Deep Learning technology (TensorFlow).

### Key Features:
* **Image Classification:** Identifies the cultural heritage name from an uploaded photo.
* **Comprehensive Information:** Provides data on regional origin, category, and a detailed cultural description.
"""


# =========================================================
# SKEMA RESPONS (CONTOH DI SWAGGER UI)
# =========================================================
class HomeResponse(BaseModel):
    message: str = Field(..., example="NusantaraLens API is running", description="API entry point status message")

class HealthResponse(BaseModel):
    status: str = Field(..., example="ok", description="Current operational state of the server instance")

class PredictionData(BaseModel):
    prediction: str = Field(..., example="Candi Borobudur", description="Nama budaya hasil deteksi")
    confidence: float = Field(..., example=98.45, description="Tingkat keyakinan model dalam persen (%)")
    daerah: str = Field(..., example="Jawa Tengah", description="Asal daerah kebudayaan")
    kategori: str = Field(..., example="Tempat Bersejarah", description="Kategori budaya")
    deskripsi: str = Field(..., example="Candi Buddha terbesar di dunia...", description="Penjelasan singkat kebudayaan")

class PredictSuccessResponse(BaseModel):
    status: str = Field("success", example="success")
    message: str = Field("Chat response generated successfully", example="Chat response generated successfully")
    data: List[PredictionData]

class PredictFailedResponse(BaseModel):
    status: str = Field("failed", example="failed")
    message: str = Field("The uploaded file must be an image.", example="Pesan error")
    data: List = Field([], example=[])

class InternalServerErrorResponse(BaseModel):
    status: str = Field("error", example="error")
    message: str = Field("An unexpected error occurred on the server.", example="An unexpected error occurred on the server.")
    data: List = Field([], example=[])
