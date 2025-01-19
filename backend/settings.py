import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    MISTRAL_API_KEY: str = os.getenv("MISTRAL_API_KEY")
    RAPID_API_KEY: str = os.getenv("RAPID_API_KEY")
    SERPERDEV_API_KEY: str = os.getenv("SERPERDEV_API_KEY")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")

# Create a global settings instance
settings = Settings()
