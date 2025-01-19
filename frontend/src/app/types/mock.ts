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

export const mockReport = {
    query: "Name: John Doe\nEmail: john.doe@example.com",
    extracted_info: {
        name: "John Doe",
        email: "john.doe@example.com",
        linkedin: "https://linkedin.com/in/johndoe",
        company: "Tech Corp"
    },
    linkedin_profile: {
        name: "John Doe",
        headline: "Software Engineer at Tech Corp",
        current_company: "Tech Corp",
        location: "San Francisco Bay Area",
        connections: 500,
        is_verified: true
    },
    email_check: {
        exists: true,
        is_disposable: false,
        is_private: false
    },
    sanction_check: {
        name_matches: [],
        company_matches: []
    },
    google_search: {
        query: "John Doe Tech Corp",
        results: [
            {
                title: "John Doe - Software Engineer - Tech Corp | LinkedIn",
                link: "https://www.linkedin.com/in/johndoe",
                snippet: "John Doe is a Software Engineer at Tech Corp with over 10 years of experience in full-stack development..."
            },
            {
                title: "Tech Corp Engineering Blog - Building Scalable Systems by John Doe",
                link: "https://blog.techcorp.com/authors/john-doe",
                snippet: "Articles and technical insights from John Doe, Principal Engineer at Tech Corp..."
            }
        ],
        summary: "John Doe is an experienced software engineer currently working at Tech Corp. He has over 10 years of experience in full-stack development and is known for his contributions to scalable system architecture. He regularly shares technical insights through the company's engineering blog."
    }
};

export const mockReportLowRisk = {
    query: "Name: Alice Smith\nEmail: alice.smith@company.com",
    extracted_info: {
        name: "Alice Smith",
        email: "alice.smith@company.com",
        linkedin: "https://linkedin.com/in/alicesmith",
        company: "Safe Corp"
    },
    linkedin_profile: {
        name: "Alice Smith",
        headline: "Product Manager at Safe Corp",
        current_company: "Safe Corp",
        location: "London, UK",
        connections: 1000,
        is_verified: true
    },
    email_check: {
        exists: true,
        is_disposable: false,
        is_private: false
    },
    sanction_check: {
        name_matches: [],
        company_matches: []
    },
    google_search: {
        query: "Alice Smith Safe Corp",
        results: [
            {
                title: "Alice Smith - Product Manager - Safe Corp | LinkedIn",
                link: "https://www.linkedin.com/in/alicesmith",
                snippet: "Alice Smith is a Product Manager at Safe Corp, leading innovative product initiatives..."
            }
        ],
        summary: "Alice Smith is a Product Manager at Safe Corp with a strong track record in product development and team leadership. She has contributed to several successful product launches and is well-regarded in the industry for her innovative approach to product management."
    }
};

export const mockReportHighRisk = {
    query: "Name: Risk Person\nEmail: risk@temp.com",
    extracted_info: {
        name: "Risk Person",
        email: "risk@temp.com",
        linkedin: null,
        company: "Risk Corp"
    },
    linkedin_profile: null,
    email_check: {
        exists: true,
        is_disposable: true,
        is_private: true
    },
    sanction_check: {
        name_matches: [
            {
                Record_ID: "1",
                Name: "Risk Person",
                Description: "Listed for fraudulent activities",
                Country: "Unknown"
            }
        ],
        company_matches: [
            {
                Record_ID: "2",
                Company: "Risk Corp",
                Description: "Company under investigation",
                Country: "Multiple"
            }
        ]
    },
    google_search: {
        query: "Risk Person Risk Corp",
        results: [
            {
                title: "Risk Corp Investigation - Financial Times",
                link: "https://ft.com/risk-corp-investigation",
                snippet: "Risk Corp and its executives, including Risk Person, are under investigation for alleged financial misconduct..."
            }
        ],
        summary: "Multiple sources indicate Risk Person has been involved in concerning activities. They are currently under investigation along with Risk Corp for alleged financial misconduct. Several news reports highlight questionable business practices and ongoing legal scrutiny."
    }
};
