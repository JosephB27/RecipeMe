import os
from dotenv import load_dotenv

load_dotenv()

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ucwmvqqfrxjphgpfeqei.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjd212cXFmcnhqcGhncGZlcWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwOTk4NDIsImV4cCI6MjA2MjY3NTg0Mn0.8Z8KK7nxMHUzdzWgaEcHAQ1rXSUAoIomhu90zh9gGDM")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

# DeepSeek API Configuration
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_API_BASE = os.getenv("DEEPSEEK_API_BASE", "https://api.deepseek.com/v1")

# Application Configuration
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
TEMP_DIR = os.getenv("TEMP_DIR", "./temp")
MAX_VIDEO_SIZE_MB = int(os.getenv("MAX_VIDEO_SIZE_MB", "100"))

# Ensure temp directory exists
os.makedirs(TEMP_DIR, exist_ok=True) 