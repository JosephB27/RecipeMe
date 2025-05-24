from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.endpoints import recipes, jobs

app = FastAPI(
    title="RecipeMe Backend API",
    description="Backend API for RecipeMe video-to-recipe conversion",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recipes.router, prefix="/recipes", tags=["recipes"])
app.include_router(jobs.router, prefix="/jobs", tags=["jobs"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "RecipeMe Backend API is running!"}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "recipeme-backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 