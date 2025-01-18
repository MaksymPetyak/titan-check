import requests
from bs4 import BeautifulSoup
from typing import Optional
import re
from models import LinkedInProfile

class LinkedInService:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def _clean_text(self, text: str) -> str:
        """Clean text from extra whitespace and newlines"""
        if not text:
            return ""
        return re.sub(r'\s+', ' ', text).strip()

    def _extract_profile_info(self, html: str) -> LinkedInProfile:
        """Extract information from profile HTML"""
        soup = BeautifulSoup(html, 'html.parser')
        profile_data = {}

        try:
            # Get name from meta tags
            name_tag = soup.find('meta', property='og:title')
            if name_tag:
                profile_data["name"] = self._clean_text(name_tag.get('content', '').split('|')[0])

            # Get description from meta tags
            desc_tag = soup.find('meta', property='og:description')
            if desc_tag:
                profile_data["headline"] = self._clean_text(desc_tag.get('content', ''))

            # Get location and company from structured data
            script_tag = soup.find('script', type='application/ld+json')
            if script_tag and script_tag.string:
                import json
                try:
                    data = json.loads(script_tag.string)
                    if isinstance(data, list):
                        data = data[0]
                    profile_data["location"] = data.get("address", {}).get("addressLocality", "")
                    profile_data["current_company"] = data.get("worksFor", {}).get("name", "")
                except json.JSONDecodeError:
                    pass

            # Get number of connections
            connections_tag = soup.find('span', class_='t-bold')
            if connections_tag and 'connections' in connections_tag.parent.text.lower():
                profile_data["connections"] = self._clean_text(connections_tag.text)

            # Check if profile is verified
            verify_badge = soup.find('div', {'aria-label': lambda x: x and 'verified' in x.lower()})
            profile_data["is_verified"] = bool(verify_badge)

            # Alternative verification check
            verify_text = soup.find('a', string=lambda x: x and 'Add verification badge' in x)
            if verify_text:
                profile_data["is_verified"] = False

            return LinkedInProfile(**profile_data)

        except Exception as e:
            print(f"Error extracting profile info: {str(e)}")
            return None

    def get_profile_data(self, profile_url: str) -> Optional[LinkedInProfile]:
        """
        Get profile data from LinkedIn using requests
        
        Args:
            profile_url: LinkedIn profile URL
            
        Returns:
            LinkedInProfile if successful, None otherwise
        """
        try:
            # Get the profile page
            response = self.session.get(profile_url, timeout=10)
            response.raise_for_status()

            # Extract profile information
            return self._extract_profile_info(response.text)
            
        except requests.RequestException as e:
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