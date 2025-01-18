from typing import Optional, List, Dict, Any
from pydantic import BaseModel

class LinkedInProfile(BaseModel):
    name: str | None = None
    headline: str | None = None
    current_company: str | None = None
    location: str | None = None
    connections: int | None = None
    is_verified: bool = False

class EmailCheckResult(BaseModel):
    exists: bool
    is_private: bool
    is_disposable: bool

class SanctionMatch(BaseModel):
    Record_ID: str
    Name: str | None = None
    Company: str | None = None
    Country: str | None = None
    Description: str

class SanctionCheckResult(BaseModel):
    name_matches: List[SanctionMatch]
    company_matches: List[SanctionMatch]

class ExtractedInfo(BaseModel):
    name: str | None = None
    linkedin: str | None = None
    email: str | None = None
    company: str | None = None

class CheckResult(BaseModel):
    query: str
    extracted_info: ExtractedInfo
    linkedin_profile: LinkedInProfile | None = None
    email_check: EmailCheckResult | None = None
    sanction_check: SanctionCheckResult | None = None 