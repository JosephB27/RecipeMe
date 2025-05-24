import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../")))
import pytest
import uuid
from backend.services.processing_pipeline import ProcessingPipeline

@pytest.fixture
def monkeypatch_db(monkeypatch):
    # Mock create_processing_job to always succeed
    async def mock_create_processing_job(job_data):
        return job_data
    # Mock update_processing_job to always succeed
    async def mock_update_processing_job(job_id, update_data):
        return update_data
    # Patch in both supabase_client and processing_pipeline modules
    monkeypatch.setattr(
        "backend.services.supabase_client.create_processing_job",
        mock_create_processing_job
    )
    monkeypatch.setattr(
        "backend.services.supabase_client.update_processing_job",
        mock_update_processing_job
    )
    monkeypatch.setattr(
        "backend.services.processing_pipeline.create_processing_job",
        mock_create_processing_job
    )
    monkeypatch.setattr(
        "backend.services.processing_pipeline.update_processing_job",
        mock_update_processing_job
    )

@pytest.mark.usefixtures("monkeypatch_db")
def test_intake_valid_tiktok_url():
    job_id = str(uuid.uuid4())
    pipeline = ProcessingPipeline(job_id=job_id)
    valid_url = "https://www.tiktok.com/@thegoodbite/video/7504552263621414166"
    result = pipeline.intake(valid_url)
    assert result is True

@pytest.mark.usefixtures("monkeypatch_db")
def test_intake_invalid_url():
    job_id = str(uuid.uuid4())
    pipeline = ProcessingPipeline(job_id=job_id)
    invalid_url = "https://www.unsupported.com/video/12345"
    result = pipeline.intake(invalid_url)
    assert result is False 