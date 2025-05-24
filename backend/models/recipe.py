from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class RecipeStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    READY = "ready"
    ERROR = "error"

class Platform(str, Enum):
    TIKTOK = "tiktok"
    INSTAGRAM = "instagram"
    YOUTUBE = "youtube"

class ProcessingStage(str, Enum):
    DOWNLOAD = "download"
    ASR = "asr"
    OCR = "ocr"
    LLM = "llm"
    COMPLETE = "complete"

class RecipeIngredient(BaseModel):
    quantity: Optional[str] = None
    unit: Optional[str] = None
    item: str

class CreateRecipeRequest(BaseModel):
    video_url: HttpUrl
    platform: Platform
    creator: str

class Recipe(BaseModel):
    id: Optional[str] = None
    user_id: str
    video_url: str
    platform: Platform
    creator: str
    title: Optional[str] = None
    cuisine: Optional[str] = None
    prep_time: Optional[str] = None
    ingredients: Optional[List[RecipeIngredient]] = None
    steps: Optional[List[str]] = None
    tips: Optional[str] = None
    status: RecipeStatus = RecipeStatus.PENDING
    error_msg: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ProcessingJob(BaseModel):
    id: Optional[str] = None
    recipe_id: str
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    current_stage: Optional[ProcessingStage] = None
    error_msg: Optional[str] = None

class RawTextSource(BaseModel):
    id: Optional[int] = None
    recipe_id: str
    src_type: str  # 'asr', 'caption', 'ocr'
    content: str 