from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from typing import List
import uuid
from datetime import datetime

from models.recipe import Recipe, CreateRecipeRequest, RecipeStatus
from api.dependencies import get_current_user_id
from services.supabase_client import (
    get_user_recipes, 
    create_recipe, 
    create_processing_job
)

router = APIRouter()

@router.get("/", response_model=List[Recipe])
async def list_recipes(user_id: str = Depends(get_current_user_id)):
    """
    Get all recipes for the authenticated user
    """
    recipes = await get_user_recipes(user_id)
    return recipes

@router.post("/", response_model=dict)
async def create_new_recipe(
    recipe_request: CreateRecipeRequest,
    background_tasks: BackgroundTasks,
    user_id: str = Depends(get_current_user_id)
):
    """
    Create a new recipe from a video URL and start processing
    """
    try:
        # Create recipe record
        recipe_data = {
            "user_id": user_id,
            "video_url": str(recipe_request.video_url),
            "platform": recipe_request.platform.value,
            "creator": recipe_request.creator,
            "status": RecipeStatus.PENDING.value
        }
        
        recipe = await create_recipe(recipe_data)
        if not recipe:
            raise HTTPException(status_code=500, detail="Failed to create recipe")
        
        # Create processing job
        job_data = {
            "recipe_id": recipe["id"],
            "started_at": datetime.utcnow().isoformat()
        }
        
        job = await create_processing_job(job_data)
        if not job:
            raise HTTPException(status_code=500, detail="Failed to create processing job")
        
        # Start background processing (placeholder for now)
        # background_tasks.add_task(process_recipe, recipe["id"], job["id"])
        
        return {
            "message": "Recipe created successfully",
            "recipe_id": recipe["id"],
            "job_id": job["id"],
            "status": "processing_started"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating recipe: {str(e)}")

@router.get("/{recipe_id}", response_model=Recipe)
async def get_recipe(recipe_id: str, user_id: str = Depends(get_current_user_id)):
    """
    Get a specific recipe by ID (only if it belongs to the user)
    """
    # This would need to be implemented in supabase_client.py
    raise HTTPException(status_code=501, detail="Not implemented yet") 