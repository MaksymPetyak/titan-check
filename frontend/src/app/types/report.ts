export interface LinkedInProfile {
    name: string;
    headline: string | null;
    current_company: string | null;
    location: string | null;
    connections: number | null;
    is_verified: boolean;
}

export interface EmailCheckResult {
    exists: boolean;
    is_disposable: boolean;
    is_private: boolean;
}

export interface SanctionMatch {
    Record_ID: string;
    Name?: string;
    Company?: string;
    Description: string;
    Country?: string;
}

export interface SanctionCheckResult {
    name_matches: SanctionMatch[];
    company_matches: SanctionMatch[];
}

export interface GoogleSearchResult {
    title: string;
    link: string;
    snippet: string;
}

export interface GoogleSearchResponse {
    results: GoogleSearchResult[];
    query: string;
    summary: string | null;
}

export interface ExtractedInfo {
    name: string | null;
    linkedin: string | null;
    email: string | null;
    company: string | null;
}

export interface ReportOverview {
    query: string;
    extracted_info: ExtractedInfo;
    linkedin_profile: LinkedInProfile | null;
    email_check: EmailCheckResult | null;
    sanction_check: SanctionCheckResult | null;
    google_search: GoogleSearchResponse | null;
}