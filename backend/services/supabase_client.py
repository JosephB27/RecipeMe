from supabase import create_client, Client
import jwt
from backend.config import SUPABASE_URL, SUPABASE_KEY, SUPABASE_SERVICE_ROLE_KEY
from typing import Optional, Dict, Any

# Create the main Supabase client (for general operations)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Create service client (for admin operations)
supabase_admin: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) if SUPABASE_SERVICE_ROLE_KEY else None

def get_user_from_token(token: str) -> Optional[Dict[str, Any]]:
    """Extract user information from JWT token"""
    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]
        
        # Decode the JWT token (note: this doesn't verify signature for simplicity)
        payload = jwt.decode(token, options={"verify_signature": False})
        return {
            "id": payload.get("sub"),
            "email": payload.get("email")
        }
    except jwt.InvalidTokenError:
        return None

async def get_user_recipes(user_id: str):
    """Get all recipes for a user"""
    try:
        response = supabase.table("recipes") \
            .select("*") \
            .eq("user_id", user_id) \
            .order("created_at", desc=True) \
            .execute()
        return response.data
    except Exception as e:
        print(f"Error fetching user recipes: {e}")
        return []

async def create_recipe(recipe_data: Dict[str, Any]):
    """Create a new recipe"""
    try:
        response = supabase.table("recipes").insert(recipe_data).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        print(f"Error creating recipe: {e}")
        return None

async def update_recipe_status(recipe_id: str, status: str, error_msg: str = None):
    """Update recipe processing status"""
    try:
        update_data = {"status": status, "updated_at": "now()"}
        if error_msg:
            update_data["error_msg"] = error_msg
        
        response = supabase.table("recipes") \
            .update(update_data) \
            .eq("id", recipe_id) \
            .execute()
        return response.data[0] if response.data else None
    except Exception as e:
        print(f"Error updating recipe status: {e}")
        return None

async def create_processing_job(job_data: Dict[str, Any]):
    """Create a new processing job"""
    try:
        response = supabase.table("processing_jobs").insert(job_data).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        print(f"Error creating processing job: {e}")
        return None

async def get_processing_job(job_id: str):
    """Get processing job by ID"""
    try:
        response = supabase.table("processing_jobs") \
            .select("*") \
            .eq("id", job_id) \
            .single() \
            .execute()
        return response.data
    except Exception as e:
        print(f"Error fetching processing job: {e}")
        return None

async def update_processing_job(job_id: str, update_data: Dict[str, Any]):
    """Update processing job"""
    try:
        response = supabase.table("processing_jobs") \
            .update(update_data) \
            .eq("id", job_id) \
            .execute()
        return response.data[0] if response.data else None
    except Exception as e:
        print(f"Error updating processing job: {e}")
        return None 