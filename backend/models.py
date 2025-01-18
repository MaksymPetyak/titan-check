from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class LinkedInProfile(BaseModel):
    name: Optional[str] = None
    headline: Optional[str] = None
    current_company: Optional[str] = None
    location: Optional[str] = None
    connections: Optional[str] = None
    is_verified: bool = False

class EmailCheckResult(BaseModel):
    exists: bool = False
    is_private: bool = False
    is_disposable: bool = False

class SanctionMatch(BaseModel):
    Record_ID: str
    Name: Optional[str] = None
    Company: Optional[str] = None
    Country: Optional[str] = None
    Description: Optional[str] = "No description available"

class SanctionCheckResult(BaseModel):
    name_matches: List[SanctionMatch] = []
    company_matches: List[SanctionMatch] = []

class CheckResult(BaseModel):
    email_check: Optional[EmailCheckResult] = None
    sanction_check: Optional[SanctionCheckResult] = None
    linkedin_profile: Optional[LinkedInProfile] = None 