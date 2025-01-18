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
    }
};
