from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class LinkedInProfile(BaseModel):
    name: str
    headline: Optional[str] = None
    current_company: Optional[str] = None
    location: Optional[str] = None
    connections: Optional[int] = None
    is_verified: bool = False

class EmailCheckResult(BaseModel):
    exists: bool
    is_disposable: bool
    is_private: bool

class PhoneCheckResult(BaseModel):
    phone_number: str

class SanctionMatch(BaseModel):
    Record_ID: str
    Name: Optional[str] = None
    Company: Optional[str] = None
    Description: str
    Country: Optional[str] = None

class SanctionCheckResult(BaseModel):
    name_matches: List[SanctionMatch]
    company_matches: List[SanctionMatch]

class GoogleSearchResult(BaseModel):
    title: str
    link: str
    snippet: str

class GoogleSearchResponse(BaseModel):
    results: List[GoogleSearchResult]
    query: str
    summary: Optional[str] = None

class ExtractedInfo(BaseModel):
    name: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None
    company: Optional[str] = None
    phone: Optional[str] = None

class CheckResult(BaseModel):
    query: str
    extracted_info: ExtractedInfo
    linkedin_profile: Optional[LinkedInProfile] = None
    email_check: Optional[EmailCheckResult] = None
    sanction_check: Optional[SanctionCheckResult] = None
    google_search: Optional[GoogleSearchResponse] = None
    phone_check: Optional[PhoneCheckResult] = None