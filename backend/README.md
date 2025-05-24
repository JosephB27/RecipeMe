# RecipeMe Backend

Backend API for RecipeMe video-to-recipe conversion application.

## Features

- FastAPI web server
- Supabase database integration
- Video processing pipeline
- Recipe generation using AI

## Development

```bash
poetry install
poetry run uvicorn main:app --reload
```

## API Endpoints

- `GET /recipes/` - List user recipes
- `POST /recipes/` - Create new recipe from video URL
- `GET /jobs/{job_id}` - Get processing job status 