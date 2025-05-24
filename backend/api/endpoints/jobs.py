from fastapi import APIRouter, Depends, HTTPException
from models.recipe import ProcessingJob
from api.dependencies import get_current_user_id
from services.supabase_client import get_processing_job

router = APIRouter()

@router.get("/{job_id}", response_model=dict)
async def get_job_status(job_id: str, user_id: str = Depends(get_current_user_id)):
    """
    Get the status of a processing job
    """
    try:
        job = await get_processing_job(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        
        # TODO: Add security check to ensure job belongs to user
        
        return {
            "job_id": job["id"],
            "recipe_id": job["recipe_id"],
            "status": job.get("current_stage", "pending"),
            "started_at": job.get("started_at"),
            "finished_at": job.get("finished_at"),
            "error_msg": job.get("error_msg")
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching job status: {str(e)}") 