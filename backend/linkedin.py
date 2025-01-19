from typing import Optional
import os
import requests
from settings import settings
from models import LinkedInProfile

class LinkedInService:
    def __init__(self):
        self.api_key = settings.RAPID_API_KEY
        self.api_host = "fresh-linkedin-profile-data.p.rapidapi.com"
        self.api_url = "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile"
        
        self.headers = {
            "x-rapidapi-key": self.api_key,
            "x-rapidapi-host": self.api_host
        }

    def get_profile_data(self, profile_url: str) -> Optional[LinkedInProfile]:
        """
        Get profile data from LinkedIn using RapidAPI
        
        Args:
            profile_url: LinkedIn profile URL
            
        Returns:
            LinkedInProfile if successful, None otherwise
        """
        try:
            # Set up query parameters
            querystring = {
                "linkedin_url": profile_url,
                "include_skills": "false",
                "include_certifications": "false",
                "include_publications": "false",
                "include_honors": "false",
                "include_volunteers": "false",
                "include_projects": "false",
                "include_patents": "false",
                "include_courses": "false",
                "include_organizations": "false",
                "include_profile_status": "false",
                "include_company_public_url": "false"
            }
            
            # Make API request
            response = requests.get(self.api_url, headers=self.headers, params=querystring)
            response.raise_for_status()
            
            # Get profile data
            profile_data = response.json()['data']
            
            
            # Map the API response to our LinkedInProfile model
            return LinkedInProfile(
                name=f"{profile_data.get('first_name', '')} {profile_data.get('last_name', '')}",
                headline=profile_data.get('headline'),
                current_company=profile_data.get('company'),
                location=profile_data.get('location'),
                connections=profile_data.get('connection_count'),
                is_verified=False  # API doesn't provide verification status
            )
            
        except Exception as e:
            print(f"Failed to fetch profile: {str(e)}")
            return None


if __name__ == "__main__":
    # Test the service
    service = LinkedInService()
    result = service.get_profile_data("https://www.linkedin.com/in/maksym-petyak/")
    if result:
        print("LinkedIn Profile Data:")
        print(result.model_dump_json(indent=2))
    else:
        print("Failed to fetch profile data")