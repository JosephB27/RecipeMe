import re
import logging
import asyncio
from .supabase_client import create_processing_job, update_processing_job

class ProcessingPipeline:
    """
    Orchestrates the video-to-recipe processing pipeline.
    Stages: intake, download, transcribe, extract, validate, store.
    """
    def __init__(self, job_id):
        self.job_id = job_id
        self.logger = logging.getLogger(f"ProcessingPipeline:{job_id}")

    @staticmethod
    def validate_url_and_platform(video_url):
        """
        Validates the video URL and determines the platform.
        Returns (platform, creator) if valid, else (None, None).
        """
        # TikTok
        tiktok_pattern = r"https?://(www\.)?tiktok\.com/@([\w.-]+)/video/\d+"
        # Instagram Reels
        instagram_pattern = r"https?://(www\.)?instagram\.com/reel/[\w-]+"
        # YouTube Shorts
        youtube_pattern = r"https?://(www\.)?youtube\.com/shorts/[\w-]+"

        if re.match(tiktok_pattern, video_url):
            creator = re.search(r"tiktok\.com/@([\w.-]+)/video", video_url).group(1)
            return "tiktok", creator
        elif re.match(instagram_pattern, video_url):
            # Instagram creator not in URL, set as None
            return "instagram", None
        elif re.match(youtube_pattern, video_url):
            # YouTube creator not in URL, set as None
            return "youtube", None
        else:
            return None, None

    def intake(self, video_url, platform=None):
        """
        Validate and queue the video link for processing.
        If valid, enqueue a processing job with status 'pending'.
        If invalid, log and update job status to 'error'.
        """
        self.logger.info(f"Intake stage started for {video_url}")
        detected_platform, creator = self.validate_url_and_platform(video_url)
        if not detected_platform:
            self.logger.error(f"Invalid or unsupported video URL: {video_url}")
            # Update job status to error in DB (if job exists)
            asyncio.run(update_processing_job(self.job_id, {"current_stage": "intake", "error_msg": "Invalid or unsupported video URL"}))
            return False
        # Enqueue processing job in DB
        job_data = {
            "id": self.job_id,
            "current_stage": "intake",
            "error_msg": None
        }
        result = asyncio.run(create_processing_job(job_data))
        if not result:
            self.logger.error(f"Failed to enqueue processing job for {video_url}")
            asyncio.run(update_processing_job(self.job_id, {"current_stage": "intake", "error_msg": "Failed to enqueue processing job"}))
            return False
        self.logger.info(f"Successfully enqueued job for {video_url} on {detected_platform}")
        return True

    def download(self):
        """Download the video and store raw assets."""
        self.logger.info("Download stage started")
        # TODO: Implement video download logic
        pass

    def transcribe(self):
        """Transcribe audio and segment video into scenes/steps."""
        self.logger.info("Transcription stage started")
        # TODO: Implement transcription logic
        pass

    def extract(self):
        """Extract recipe information using AI (ingredients, steps, etc.)."""
        self.logger.info("AI extraction stage started")
        # TODO: Implement AI extraction logic
        pass

    def validate(self):
        """Validate and structure extracted data."""
        self.logger.info("Validation stage started")
        # TODO: Implement validation logic
        pass

    def store(self):
        """Store the structured recipe in the database and link assets."""
        self.logger.info("Storage stage started")
        # TODO: Implement storage logic
        pass

    def run(self, video_url, platform):
        """Run the full pipeline, handling errors and updating job status."""
        try:
            self.intake(video_url, platform)
            self.download()
            self.transcribe()
            self.extract()
            self.validate()
            self.store()
            self.logger.info("Pipeline completed successfully.")
        except Exception as e:
            self.logger.error(f"Pipeline failed: {e}")
            # TODO: Update job status to error, store error message 